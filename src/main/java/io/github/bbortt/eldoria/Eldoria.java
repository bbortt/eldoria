package io.github.bbortt.eldoria;

import com.jme3.app.SimpleApplication;
import com.jme3.scene.Geometry;
import jakarta.annotation.Nonnull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;

import java.util.Objects;

/**
 * This is the Main Class of your Game. It should boot up your game and do initial initialisation
 * Move your Logic into AppStates or Controls or other java classes
 */
public class Eldoria extends SimpleApplication implements CommandLineRunner {

    public static final String MOVE_LEFT = "Move Left";
    public static final String MOVE_RIGHT = "Move Right";
    public static final String MOVE_FORWARD = "Move Forward";
    public static final String MOVE_BACKWARD = "Move Backward";

    private @Nonnull BoxControl boxControl;

    public static void main(String[] args) {
        SpringApplication.run(Eldoria.class, args);
    }

    @Override
    public void run(String... args) {
        start();
    }

    @Override
    public void simpleInitApp() {
        // Initialize your game components here
        GroundCreator groundCreator = new GroundCreator(rootNode, assetManager);
        groundCreator.create();

        BoxCreator boxCreator = new BoxCreator(rootNode, assetManager);
        Geometry box = boxCreator.create();

        CameraManager cameraManager = new CameraManager(cam, box, inputManager);
        cameraManager.createBoxChasingCam();

        boxControl = new BoxControl(inputManager, box);
        boxControl.setupControls();
    }

    @Override
    public void simpleUpdate(float tpf) {
        if (!Objects.isNull(boxControl)) {
            boxControl.simpleUpdate(tpf);
        }
    }
}
