package io.github.bbortt.eldoria;

import com.jme3.app.FlyCamAppState;
import com.jme3.app.SimpleApplication;
import com.jme3.system.AppSettings;
import io.github.bbortt.eldoria.state.IngameWorldState;

/**
 * This is the Main Class of your Game. It should boot up your game and do initial initialisation
 * Move your Logic into AppStates or Controls or other java classes
 */
public class Eldoria extends SimpleApplication {

    public static void main(String[] args) {
        Eldoria eldoria = new Eldoria();
        eldoria.setSettings(loadSettings());
        eldoria.start();
    }

    private static AppSettings loadSettings() {
        AppSettings appSettings = new AppSettings(true);

        appSettings.setFullscreen(true);
        appSettings.setResolution(1920, 1080);

        return appSettings;
    }

    @Override
    public void simpleInitApp() {
        // Remove default FlyByCam
        stateManager.detach(stateManager.getState(FlyCamAppState.class));

        stateManager.attach(new IngameWorldState());
    }
}
