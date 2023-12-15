package io.github.bbortt.eldoria;

import com.jme3.input.ChaseCamera;
import com.jme3.input.InputManager;
import com.jme3.renderer.Camera;
import com.jme3.scene.Geometry;

public class CameraManager {
    private final ChaseCamera chaseCam;

    public CameraManager(Camera cam, Geometry target, InputManager inputManager) {
        this.chaseCam = new ChaseCamera(cam, target, inputManager);
    }

    public void createBoxChasingCam() {
        chaseCam.setTrailingEnabled(true); // Enable the trailing feature
        chaseCam.setTrailingRotationInertia(0.05f); // Adjust inertia as needed
        chaseCam.setTrailingSensitivity(1f); // Adjust sensitivity as needed
        chaseCam.setSmoothMotion(true);
        chaseCam.setChasingSensitivity(5); // Adjust chasing sensitivity
        chaseCam.setTrailingSensitivity(50); // Adjust trailing sensitivity
    }
}
