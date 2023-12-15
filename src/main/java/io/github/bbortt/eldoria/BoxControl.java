package io.github.bbortt.eldoria;

import com.jme3.input.InputManager;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;

import static io.github.bbortt.eldoria.Eldoria.MOVE_BACKWARD;
import static io.github.bbortt.eldoria.Eldoria.MOVE_FORWARD;
import static io.github.bbortt.eldoria.Eldoria.MOVE_LEFT;
import static io.github.bbortt.eldoria.Eldoria.MOVE_RIGHT;

public class BoxControl {
    private final InputManager inputManager;
    private final Geometry box;
    private boolean moveLeft = false;
    private boolean moveRight = false;
    private boolean moveForward = false;
    private boolean moveBackward = false;
    private final ActionListener actionListener = (name, isPressed, tpf) -> {
        switch (name) {
            case MOVE_LEFT -> moveLeft = isPressed;
            case MOVE_RIGHT -> moveRight = isPressed;
            case MOVE_FORWARD -> moveForward = isPressed;
            case MOVE_BACKWARD -> moveBackward = isPressed;
        }
    };

    public BoxControl(InputManager inputManager, Geometry box) {
        this.inputManager = inputManager;
        this.box = box;
    }

    public void setupControls() {
        inputManager.addMapping(MOVE_LEFT, new KeyTrigger(KeyInput.KEY_A));
        inputManager.addMapping(MOVE_RIGHT, new KeyTrigger(KeyInput.KEY_D));
        inputManager.addMapping(MOVE_FORWARD, new KeyTrigger(KeyInput.KEY_W));
        inputManager.addMapping(MOVE_BACKWARD, new KeyTrigger(KeyInput.KEY_S));

        inputManager.addListener(actionListener, MOVE_LEFT, MOVE_RIGHT, MOVE_FORWARD, MOVE_BACKWARD);
    }

    public void simpleUpdate(float tpf) {
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
}
