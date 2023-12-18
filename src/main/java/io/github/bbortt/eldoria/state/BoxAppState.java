package io.github.bbortt.eldoria.state;

import com.jme3.app.Application;
import com.jme3.app.SimpleApplication;
import com.jme3.app.state.AbstractAppState;
import com.jme3.app.state.AppStateManager;
import com.jme3.asset.AssetManager;
import com.jme3.input.InputManager;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.shape.Box;
import io.github.bbortt.eldoria.control.BoxMovementControl;
import io.github.bbortt.eldoria.control.BoxOrientationControl;
import io.github.bbortt.eldoria.geometry.AbstractGeometryCreator;

public class BoxAppState extends AbstractAppState {

    private Node box;

    public Node getBox() {
        return box;
    }

    @Override
    public void initialize(AppStateManager stateManager, Application app) {
        super.initialize(stateManager, app);

        Geometry boxGeometry = new BoxCreator(app.getAssetManager())
                .create();

        box = new Node("Box");
        box.attachChild(boxGeometry);

        InputManager inputManager = app.getInputManager();

        BoxMovementControl boxMovementControl = new BoxMovementControl(inputManager);
        box.addControl(boxMovementControl);

        BoxOrientationControl boxOrientationControl = new BoxOrientationControl(inputManager);
        box.addControl(boxOrientationControl);

        if (app instanceof SimpleApplication simpleApplication) {
            simpleApplication.getRootNode()
                    .attachChild(box);
        }
    }

    private static class BoxCreator extends AbstractGeometryCreator {

        public BoxCreator(AssetManager assetManager) {
            super(assetManager);
        }

        @Override
        public Geometry create() {
            Box box = new Box(1, 1, 1);
            Geometry geometry = new Geometry("Box", box);

            Material material = new Material(getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
            material.setColor("Color", ColorRGBA.Blue);
            geometry.setMaterial(material);

            return geometry;
        }
    }
}
