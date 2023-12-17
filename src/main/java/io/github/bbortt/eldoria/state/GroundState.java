package io.github.bbortt.eldoria.state;

import com.jme3.app.Application;
import com.jme3.app.SimpleApplication;
import com.jme3.app.state.AbstractAppState;
import com.jme3.app.state.AppStateManager;
import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.Vector2f;
import com.jme3.scene.Geometry;
import com.jme3.scene.shape.Quad;
import com.jme3.texture.Texture;
import io.github.bbortt.eldoria.geometry.AbstractGeometryCreator;

import static com.jme3.math.FastMath.HALF_PI;

public class GroundState extends AbstractAppState {

    private Geometry ground;

    @Override
    public void initialize(AppStateManager stateManager, Application app) {
        super.initialize(stateManager, app);

        ground = new GroundCreator(app.getAssetManager())
                .create();

        if (app instanceof SimpleApplication simpleApplication) {
            simpleApplication.getRootNode()
                    .attachChild(ground);
        }
    }

    private static class GroundCreator extends AbstractGeometryCreator {

        public GroundCreator(AssetManager assetManager) {
            super(assetManager);
        }

        @Override
        public Geometry create() {
            // Create a Quad to represent the ground
            float groundSize = 50; // size of the ground
            Quad quad = new Quad(groundSize, groundSize);
            Geometry ground = new Geometry("Ground", quad);

            // Rotate and translate to lay it flat
            ground.rotate(-HALF_PI, 0, 0);
            ground.setLocalTranslation(-groundSize / 2, 0, groundSize / 2);

            Material mat = new Material(getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");

            Texture grass = getAssetManager().loadTexture("Textures/Grass.jpg"); // Replace with your texture path
            grass.setWrap(Texture.WrapMode.Repeat); // Repeat texture
            mat.setTexture("ColorMap", grass);

            ground.setMaterial(mat);
            quad.scaleTextureCoordinates(new Vector2f(10, 10)); // Repeat texture

            return ground;
        }
    }
}
