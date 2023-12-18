package io.github.bbortt.eldoria.control;

import com.jme3.input.InputManager;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.math.Vector3f;
import com.jme3.renderer.RenderManager;
import com.jme3.renderer.ViewPort;
import com.jme3.scene.Spatial;
import com.jme3.scene.control.AbstractControl;

import static java.util.Objects.isNull;


public class BoxMovementControl extends AbstractControl implements ActionListener {

    private static final String MOVE_FORWARD = "Box: Move Forward";
    private static final String MOVE_BACKWARD = "Box: Move Backward";

    private final int movementSpeed = 10;

    private boolean moveForward = false;
    private boolean moveBackward = false;

    public BoxMovementControl(InputManager inputManager) {
        createActionListener(inputManager);
    }

    private void createActionListener(InputManager inputManager) {
        inputManager.addMapping(MOVE_FORWARD, new KeyTrigger(KeyInput.KEY_W));
        inputManager.addMapping(MOVE_BACKWARD, new KeyTrigger(KeyInput.KEY_S));

        inputManager.addListener(this, MOVE_FORWARD, MOVE_BACKWARD);
    }

    @Override
    protected void controlUpdate(float tpf) {
        Spatial spatial = getSpatial();
        if (!isNull(spatial)) {
            moveBox(tpf, spatial);
        }
    }

    private void moveBox(float tpf, Spatial box) {
        Vector3f v = new Vector3f();

        if (moveForward) {
            v.z -= movementSpeed * tpf;
        } else if (moveBackward) {
            v.z += movementSpeed * tpf;
        }

        // Transform the movement vector by the box's current rotation
        v = box.getLocalRotation().mult(v);

        // Add this vector to the box's current position
        box.setLocalTranslation(box.getLocalTranslation().add(v));
    }

    @Override
    protected void controlRender(RenderManager rm, ViewPort vp) {
    }

    @Override
    public void onAction(String name, boolean isPressed, float tpf) {
        switch (name) {
            case MOVE_FORWARD -> moveForward = isPressed;
            case MOVE_BACKWARD -> moveBackward = isPressed;
        }
    }
}
