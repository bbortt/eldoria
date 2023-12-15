package io.github.bbortt.eldoria;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.shape.Box;

public class BoxCreator extends AbstractGeometryCreator {

    public BoxCreator(Node rootNode, AssetManager assetManager) {
        super(rootNode, assetManager);
    }

    @Override
    public Geometry create() {
        Box b = new Box(1, 1, 1);
        Geometry geom = new Geometry("Box", b);

        Material mat = new Material(getAssetManager(), "Common/MatDefs/Misc/Unshaded.j3md");
        mat.setColor("Color", ColorRGBA.Blue);
        geom.setMaterial(mat);

        getRootNode().attachChild(geom);

        return geom;
    }
}
