package io.github.bbortt.eldoria.camera;

import com.jme3.input.InputManager;
import com.jme3.input.Joystick;
import com.jme3.input.JoystickAxis;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.AnalogListener;
import com.jme3.input.controls.MouseAxisTrigger;
import com.jme3.input.controls.MouseButtonTrigger;
import com.jme3.math.Quaternion;
import com.jme3.math.Vector3f;
import com.jme3.renderer.Camera;
import com.jme3.scene.Node;

import static com.jme3.input.CameraInput.FLYCAM_INVERTY;
import static com.jme3.input.CameraInput.FLYCAM_LEFT;
import static com.jme3.input.CameraInput.FLYCAM_RIGHT;
import static com.jme3.input.CameraInput.FLYCAM_ROTATEDRAG;
import static com.jme3.input.CameraInput.FLYCAM_ZOOMIN;
import static com.jme3.input.CameraInput.FLYCAM_ZOOMOUT;
import static com.jme3.input.MouseInput.AXIS_WHEEL;
import static com.jme3.input.MouseInput.AXIS_X;
import static com.jme3.math.Vector3f.UNIT_Y;
import static java.util.Objects.isNull;

/**
 * A camera based on the original {@link com.jme3.input.FlyByCamera}, but with limited capabilities - because it is
 * "only" a third person camera!
 */
public class ThirdPersonCamera implements AnalogListener, ActionListener {

    public static final Vector3f DEFAULT_CAMERA_OFFSET = new Vector3f(0, 5, 5);

    private static final String[] MAPPINGS = new String[]{
            FLYCAM_ROTATEDRAG,
            FLYCAM_LEFT,
            FLYCAM_RIGHT,

            FLYCAM_ZOOMIN,
            FLYCAM_ZOOMOUT,

            FLYCAM_INVERTY
    };

    /**
     * camera controlled by this controller (not null)
     */
    private final Camera camera;

    /**
     * rotation-rate multiplier (1=default)
     */
    private float rotationSpeed = 1f;

    /**
     * zoom-rate multiplier (1=default)
     */
    private float zoomSpeed = 1f;

    /**
     * Indicates whether this camera can currently be rotated or not.
     */
    private boolean canRotate = false;

    private boolean invertY = false;

    private Node cameraNode;
    private Node target;

    /**
     * Creates a new FlyByCamera to control the specified camera.
     *
     * @param camera camera to be controlled (not null)
     */
    public ThirdPersonCamera(Camera camera) {
        this.camera = camera;
    }

    public void setCameraNode(Node cameraNode) {
        this.cameraNode = cameraNode;
    }

    public void setTarget(Node target) {
        this.target = target;
    }

    /**
     * Register this controller to receive input events from the specified input
     * manager.
     *
     * @param inputManager (not null, alias created)
     */
    public void registerWithInput(InputManager inputManager) {
        // both mouse and button - rotation of cam
        inputManager.addMapping(FLYCAM_ROTATEDRAG, new MouseButtonTrigger(AXIS_WHEEL));
        inputManager.addMapping(FLYCAM_LEFT, new MouseAxisTrigger(AXIS_X, true));
        inputManager.addMapping(FLYCAM_RIGHT, new MouseAxisTrigger(AXIS_X, false));
        
        // mouse only - zoom in/out with wheel, and rotate drag
        inputManager.addMapping(FLYCAM_ZOOMIN, new MouseAxisTrigger(AXIS_WHEEL, false));
        inputManager.addMapping(FLYCAM_ZOOMOUT, new MouseAxisTrigger(AXIS_WHEEL, true));

        inputManager.addListener(this, MAPPINGS);

        Joystick[] joysticks = inputManager.getJoysticks();
        if (joysticks != null) {
            for (Joystick j : joysticks) {
                mapJoystick(j);
            }
        }
    }

    private void mapJoystick(Joystick joystick) {
        // Map it differently if there are Z axis
        if (joystick.getAxis(JoystickAxis.Z_ROTATION) != null && joystick.getAxis(JoystickAxis.Z_AXIS) != null) {
            // And the right stick control the camera
            joystick.getAxis(JoystickAxis.Z_AXIS).assignAxis(FLYCAM_RIGHT, FLYCAM_LEFT);

            if (joystick.getButton("Button 8") != null) {
                // Let the standard select button be the y invert toggle
                joystick.getButton("Button 8").assignButton(FLYCAM_INVERTY);
            }

        } else {
            joystick.getXAxis().assignAxis(FLYCAM_RIGHT, FLYCAM_LEFT);
        }
    }

    /**
     * Callback to notify this controller of an analog input event.
     *
     * @param name  name of the input event
     * @param value value of the axis (from 0 to 1)
     * @param tpf   time per frame (in seconds)
     */
    @Override
    public void onAnalog(String name, float value, float tpf) {
        switch (name) {
            case FLYCAM_LEFT -> rotateCamera(value * rotationSpeed*tpf);
            case FLYCAM_RIGHT ->   rotateCamera(-value * rotationSpeed*tpf);
            case FLYCAM_ZOOMIN -> zoomCamera(-value * zoomSpeed *tpf);
            case FLYCAM_ZOOMOUT -> zoomCamera(value* zoomSpeed *tpf);
        }
    }

    /**
     * Callback to notify this controller of an action input event.
     *
     * @param name      name of the input event
     * @param isPressed true if the action is "pressed", false otherwise
     * @param tpf       time per frame (in seconds)
     */
    @Override
    public void onAction(String name, boolean isPressed, float tpf) {
        if (FLYCAM_ROTATEDRAG.equals(name)) {
            canRotate = isPressed;

            if (!isPressed ) {
                resetCameraRotation();
            }
        } else if (name.equals(FLYCAM_INVERTY)) {
            // Invert the "up" direction.
            if (!isPressed) {
                invertY = !invertY;
            }
        }
        else {
            canRotate = false;
        }
    }

    private void rotateCamera(float rotation) {
        if (!canRotate || isNull(cameraNode)|| isNull(target)) {
            return;
        }

        // Get current distance and direction from target to camera
        Vector3f currentOffset = camera.getLocation().subtract(target.getLocalTranslation());

        // Create a rotation Quaternion
        Quaternion rotate = new Quaternion().fromAngleNormalAxis(rotation, UNIT_Y);

        // Apply this rotation to the current offset
        Vector3f newOffset = rotate.mult(currentOffset);

        cameraNode.setLocalTranslation(target.getLocalTranslation().add(newOffset));
        cameraNode.lookAt(target.getLocalTranslation(), UNIT_Y);
    }

    private void resetCameraRotation() {
        if (isNull(cameraNode)) {
            return;
        }

        cameraNode.setLocalTranslation(DEFAULT_CAMERA_OFFSET);
        cameraNode.lookAt(target.getLocalTranslation(), UNIT_Y);
    }

    /**
     * Zoom the camera by the specified amount.
     *
     * @param value zoom amount
     */
    private void zoomCamera(float value) {
        float newFov = camera.getFov() + value ;
        if (newFov > 0) {
            camera.setFov(newFov);
        }
    }
}
