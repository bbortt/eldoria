package io.github.bbortt.eldoria;

import com.jme3.app.SimpleApplication;
import io.github.bbortt.eldoria.state.IngameWorldState;

/**
 * This is the Main Class of your Game. It should boot up your game and do initial initialisation
 * Move your Logic into AppStates or Controls or other java classes
 */
public class Eldoria extends SimpleApplication {

    public static void main(String[] args) {
        Eldoria eldoria = new Eldoria();
        eldoria.start();
    }

    @Override
    public void simpleInitApp() {
        stateManager.attach(new IngameWorldState());
    }
}
