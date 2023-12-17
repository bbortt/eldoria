package io.github.bbortt.eldoria.control;

import com.jme3.input.InputManager;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.renderer.RenderManager;
import com.jme3.renderer.ViewPort;
import com.jme3.scene.Spatial;
import com.jme3.scene.control.AbstractControl;

import java.util.Objects;

public class BoxOrientationControl extends AbstractControl implements ActionListener {

    private static final String ROTATE_LEFT = "Rotate Left";
    private static final String ROTATE_RIGHT = "Rotate Right";

    private static final int ROTATION_SPEED = 1;

    private float rotation = 0;

    public BoxOrientationControl(InputManager inputManager) {
        createActionListener(inputManager);
    }

    private void createActionListener(InputManager inputManager) {
        inputManager.addMapping(ROTATE_LEFT, new KeyTrigger(KeyInput.KEY_A));
        inputManager.addMapping(ROTATE_RIGHT, new KeyTrigger(KeyInput.KEY_D));

        inputManager.addListener(this, ROTATE_LEFT, ROTATE_RIGHT);
    }

    @Override
    protected void controlUpdate(float tpf) {
        Spatial spatial = getSpatial();
        if (!Objects.isNull(spatial)) {
            rotateBox(tpf, spatial);
        }
    }

    private void rotateBox(float tpf, Spatial box) {
        box.rotate(0, rotation * tpf, 0);
    }

    @Override
    protected void controlRender(RenderManager rm, ViewPort vp) {
    }

    @Override
    public void onAction(String name, boolean isPressed, float tpf) {
        if (ROTATE_LEFT.equals(name)) {
            rotation = isPressed ? -ROTATION_SPEED : 0;
        } else if (ROTATE_RIGHT.equals(name)) {
            rotation = isPressed ? ROTATION_SPEED : 0;
        }
    }
}
