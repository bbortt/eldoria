package io.github.bbortt.eldoria.geometry;

import com.jme3.asset.AssetManager;
import com.jme3.scene.Geometry;

public abstract class AbstractGeometryCreator {

    private final AssetManager assetManager;

    public AbstractGeometryCreator(AssetManager assetManager) {
        this.assetManager = assetManager;
    }

    protected AssetManager getAssetManager() {
        return assetManager;
    }

    public abstract Geometry create();
}
