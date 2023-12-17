package io.github.bbortt.eldoria.state;

import com.jme3.app.Application;
import com.jme3.app.state.AbstractAppState;
import com.jme3.app.state.AppStateManager;
import com.jme3.math.Vector3f;
import com.jme3.renderer.Camera;
import com.jme3.scene.CameraNode;
import com.jme3.scene.Node;
import com.jme3.scene.control.CameraControl;
import io.github.bbortt.eldoria.camera.ThirdPersonCamera;

public class ThirdPersonCameraState extends AbstractAppState {

    private ThirdPersonCamera thirdPersonCamera;

    public ThirdPersonCamera getThirdPersonCamera() {
        return thirdPersonCamera;
    }

    @Override
    public void initialize(AppStateManager stateManager, Application app) {
        super.initialize(stateManager, app);

        BoxAppState boxAppState = stateManager.getState(BoxAppState.class);

        thirdPersonCamera = new ThirdPersonCamera(app.getCamera());
        thirdPersonCamera.registerWithInput(app.getInputManager());

        attachCamera(boxAppState.getBox(), app.getCamera());
    }

    private void attachCamera(Node boxNode, Camera camera) {
        CameraNode cameraNode = new CameraNode("Camera Node", camera);

        // This mode means that camera copies the movements of the target:
        cameraNode.setControlDir(CameraControl.ControlDirection.SpatialToCamera);
        // Attach the cameraNode to the target:
        boxNode.attachChild(cameraNode);
        // Move cameraNode, e.g. behind and above the target:
        cameraNode.setLocalTranslation(new Vector3f(0, 5, 5));
        // Rotate the cameraNode to look at the target:
        cameraNode.lookAt(boxNode.getLocalTranslation(), Vector3f.UNIT_Y);
    }
}
