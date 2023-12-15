package io.github.bbortt.eldoria;

import com.jme3.asset.AssetManager;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;

public abstract class AbstractGeometryCreator {
    private final Node rootNode;
    private final AssetManager assetManager;

    public AbstractGeometryCreator(Node rootNode, AssetManager assetManager) {
        this.rootNode = rootNode;
        this.assetManager = assetManager;
    }

    protected Node getRootNode() {
        return rootNode;
    }

    protected AssetManager getAssetManager() {
        return assetManager;
    }

    public abstract Geometry create();
}
