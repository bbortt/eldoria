package io.github.bbortt.eldoria.camera;

import com.jme3.input.InputManager;
import com.jme3.input.Joystick;
import com.jme3.input.JoystickAxis;
import com.jme3.input.KeyInput;
import com.jme3.input.MouseInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.AnalogListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.input.controls.MouseAxisTrigger;
import com.jme3.input.controls.MouseButtonTrigger;
import com.jme3.math.Matrix3f;
import com.jme3.math.Quaternion;
import com.jme3.math.Vector3f;
import com.jme3.renderer.Camera;

import static com.jme3.input.CameraInput.FLYCAM_INVERTY;
import static com.jme3.input.CameraInput.FLYCAM_LEFT;
import static com.jme3.input.CameraInput.FLYCAM_RIGHT;
import static com.jme3.input.CameraInput.FLYCAM_ROTATEDRAG;
import static com.jme3.input.CameraInput.FLYCAM_STRAFELEFT;
import static com.jme3.input.CameraInput.FLYCAM_STRAFERIGHT;
import static com.jme3.input.CameraInput.FLYCAM_ZOOMIN;
import static com.jme3.input.CameraInput.FLYCAM_ZOOMOUT;

/**
 * A camera based on the original {@link com.jme3.input.FlyByCamera}, but with limited capabilities - because it is
 * "only" a third person camera!
 */
public class ThirdPersonCamera implements AnalogListener, ActionListener {

    final private static String[] mappings = new String[]{
            FLYCAM_LEFT,
            FLYCAM_RIGHT,

            FLYCAM_STRAFELEFT,
            FLYCAM_STRAFERIGHT,

            FLYCAM_ZOOMIN,
            FLYCAM_ZOOMOUT,
            FLYCAM_ROTATEDRAG,

            FLYCAM_INVERTY
    };

    /**
     * camera controlled by this controller (not null)
     */
    protected Camera camera;

    /**
     * normalized "up" direction (a unit vector)
     */
    protected Vector3f initialUpVec;

    /**
     * rotation-rate multiplier (1=default)
     */
    protected float rotationSpeed = 1f;

    /**
     * zoom-rate multiplier (1=default)
     */
    protected float zoomSpeed = 1f;

    /**
     * drag-to-rotate mode flag
     */
    protected boolean dragToRotate = false;

    protected boolean canRotate = false;

    protected boolean invertY = false;

    protected InputManager inputManager;

    /**
     * Creates a new FlyByCamera to control the specified camera.
     *
     * @param camera camera to be controlled (not null)
     */
    public ThirdPersonCamera(Camera camera) {
        this.camera = camera;
        initialUpVec = camera.getUp().clone();
    }

    /**
     * Sets the up vector that should be used for the camera.
     *
     * @param upVec the desired direction (not null, unaffected)
     */
    public void setUpVector(Vector3f upVec) {
        initialUpVec.set(upVec);
    }

    /**
     * Read the rotation-rate multiplier. The bigger the multiplier, the more
     * rotation for a given movement of the mouse.
     *
     * @return current rate multiplier (1=default)
     */
    public float getRotationSpeed() {
        return rotationSpeed;
    }

    /**
     * Set the rotation-rate multiplier. The bigger the multiplier, the more
     * rotation for a given movement of the mouse.
     *
     * @param rotationSpeed new rate multiplier (1=default)
     */
    public void setRotationSpeed(float rotationSpeed) {
        this.rotationSpeed = rotationSpeed;
    }

    /**
     * Read the zoom-rate multiplier. The bigger the multiplier, the more zoom
     * for a given movement of the mouse wheel.
     *
     * @return current rate multiplier (1=default)
     */
    public float getZoomSpeed() {
        return zoomSpeed;
    }

    /**
     * Set the zoom-rate multiplier. The bigger the multiplier, the more zoom
     * for a given movement of the mouse wheel.
     *
     * @param zoomSpeed new rate multiplier (1=default)
     */
    public void setZoomSpeed(float zoomSpeed) {
        this.zoomSpeed = zoomSpeed;
    }

    /**
     * Test whether drag-to-rotate mode is enabled.
     *
     * @return If drag to rotate feature is enabled.
     * @see #setDragToRotate(boolean)
     */
    public boolean isDragToRotate() {
        return dragToRotate;
    }

    /**
     * Enable or disable drag-to-rotate mode.
     * <p>
     * When drag-to-rotate mode is enabled, the user must hold the mouse button
     * and drag over the screen to rotate the camera, and the cursor is visible
     * until dragged. When drag-to-rotate mode is disabled, the cursor is
     * invisible at all times and holding the mouse button is not needed to
     * rotate the camera. This mode is disabled by default.
     *
     * @param dragToRotate true to enable, false to disable
     */
    public void setDragToRotate(boolean dragToRotate) {
        this.dragToRotate = dragToRotate;
        if (inputManager != null) {
            inputManager.setCursorVisible(dragToRotate);
        }
    }

    /**
     * Register this controller to receive input events from the specified input
     * manager.
     *
     * @param inputManager (not null, alias created)
     */
    public void registerWithInput(InputManager inputManager) {
        this.inputManager = inputManager;

        // both mouse and button - rotation of cam
        inputManager.addMapping(FLYCAM_LEFT, new MouseAxisTrigger(MouseInput.AXIS_X, true), new KeyTrigger(KeyInput.KEY_LEFT));

        inputManager.addMapping(FLYCAM_RIGHT, new MouseAxisTrigger(MouseInput.AXIS_X, false), new KeyTrigger(KeyInput.KEY_RIGHT));

        // mouse only - zoom in/out with wheel, and rotate drag
        inputManager.addMapping(FLYCAM_ZOOMIN, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, false));
        inputManager.addMapping(FLYCAM_ZOOMOUT, new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true));
        inputManager.addMapping(FLYCAM_ROTATEDRAG, new MouseButtonTrigger(MouseInput.BUTTON_LEFT));

        // keyboard only WASD for movement and WZ for rise/lower height
        inputManager.addMapping(FLYCAM_STRAFELEFT, new KeyTrigger(KeyInput.KEY_A));
        inputManager.addMapping(FLYCAM_STRAFERIGHT, new KeyTrigger(KeyInput.KEY_D));

        inputManager.addListener(this, mappings);
        inputManager.setCursorVisible(dragToRotate);

        Joystick[] joysticks = inputManager.getJoysticks();
        if (joysticks != null) {
            for (Joystick j : joysticks) {
                mapJoystick(j);
            }
        }
    }

    protected void mapJoystick(Joystick joystick) {
        // Map it differently if there are Z axis
        if (joystick.getAxis(JoystickAxis.Z_ROTATION) != null && joystick.getAxis(JoystickAxis.Z_AXIS) != null) {

            // Make the left stick move
            joystick.getXAxis().assignAxis(FLYCAM_STRAFERIGHT, FLYCAM_STRAFELEFT);

            // And the right stick control the camera
            joystick.getAxis(JoystickAxis.Z_AXIS).assignAxis(FLYCAM_RIGHT, FLYCAM_LEFT);

            if (joystick.getButton("Button 8") != null) {
                // Let the standard select button be the y invert toggle
                joystick.getButton("Button 8").assignButton(FLYCAM_INVERTY);
            }

        } else {
            joystick.getPovXAxis().assignAxis(FLYCAM_STRAFERIGHT, FLYCAM_STRAFELEFT);
            joystick.getXAxis().assignAxis(FLYCAM_RIGHT, FLYCAM_LEFT);
        }
    }

    /**
     * Rotate the camera by the specified amount around the specified axis.
     *
     * @param value rotation amount
     * @param axis  direction of rotation (a unit vector)
     */
    protected void rotateCamera(float value, Vector3f axis) {
        if (dragToRotate) {
            if (canRotate) {
                // value = -value;
            } else {
                return;
            }
        }

        Matrix3f mat = new Matrix3f();
        mat.fromAngleNormalAxis(rotationSpeed * value, axis);

        Vector3f up = camera.getUp();
        Vector3f left = camera.getLeft();
        Vector3f dir = camera.getDirection();

        mat.mult(up, up);
        mat.mult(left, left);
        mat.mult(dir, dir);

        Quaternion q = new Quaternion();
        q.fromAxes(left, up, dir);
        q.normalizeLocal();

        camera.setAxes(q);
    }

    /**
     * Zoom the camera by the specified amount.
     *
     * @param value zoom amount
     */
    protected void zoomCamera(float value) {
        float newFov = camera.getFov() + value * 0.1F * zoomSpeed;
        if (newFov > 0) {
            camera.setFov(newFov);
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
            case FLYCAM_LEFT -> rotateCamera(value, initialUpVec);
            case FLYCAM_RIGHT -> rotateCamera(-value, initialUpVec);
            case FLYCAM_ZOOMIN -> zoomCamera(-value);
            case FLYCAM_ZOOMOUT -> zoomCamera(value);
        }
    }

    /**
     * Callback to notify this controller of an action input event.
     *
     * @param name  name of the input event
     * @param value true if the action is "pressed", false otherwise
     * @param tpf   time per frame (in seconds)
     */
    @Override
    public void onAction(String name, boolean value, float tpf) {
        if (name.equals(FLYCAM_ROTATEDRAG) && dragToRotate) {
            canRotate = value;
            inputManager.setCursorVisible(!value);
        } else if (name.equals(FLYCAM_INVERTY)) {
            // Invert the "up" direction.
            if (!value) {
                invertY = !invertY;
            }
        }
    }
}
