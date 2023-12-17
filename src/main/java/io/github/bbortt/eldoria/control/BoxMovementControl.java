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

import java.util.Objects;


public class BoxMovementControl extends AbstractControl {

    public static final String MOVE_LEFT = "Move Left";
    public static final String MOVE_RIGHT = "Move Right";
    public static final String MOVE_FORWARD = "Move Forward";
    public static final String MOVE_BACKWARD = "Move Backward";

    private boolean moveLeft = false;
    private boolean moveRight = false;
    private boolean moveForward = false;
    private boolean moveBackward = false;

    @Override
    protected void controlUpdate(float tpf) {
        Spatial spatial = getSpatial();
        if (!Objects.isNull(spatial)) {
            moveBox(tpf, spatial);
        }
    }

    private void moveBox(float tpf, Spatial box) {
        Vector3f v = box.getLocalTranslation();

        if (moveLeft) {
            v.x -= 10 * tpf;
        }
        if (moveRight) {
            v.x += 10 * tpf;
        }
        if (moveForward) {
            v.z -= 10 * tpf;
        }
        if (moveBackward) {
            v.z += 10 * tpf;
        }

        box.setLocalTranslation(v);
    }

    @Override
    protected void controlRender(RenderManager rm, ViewPort vp) {

    }

    public ActionListener createActionListener(InputManager inputManager) {
        inputManager.addMapping(MOVE_LEFT, new KeyTrigger(KeyInput.KEY_A));
        inputManager.addMapping(MOVE_RIGHT, new KeyTrigger(KeyInput.KEY_D));
        inputManager.addMapping(MOVE_FORWARD, new KeyTrigger(KeyInput.KEY_W));
        inputManager.addMapping(MOVE_BACKWARD, new KeyTrigger(KeyInput.KEY_S));

        return (name, isPressed, tpf) -> {
            switch (name) {
                case MOVE_LEFT -> moveLeft = isPressed;
                case MOVE_RIGHT -> moveRight = isPressed;
                case MOVE_FORWARD -> moveForward = isPressed;
                case MOVE_BACKWARD -> moveBackward = isPressed;
            }
        };
    }
}
