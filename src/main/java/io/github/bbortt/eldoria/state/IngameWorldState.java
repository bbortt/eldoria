package io.github.bbortt.eldoria.state;

import com.jme3.app.Application;
import com.jme3.app.state.AbstractAppState;
import com.jme3.app.state.AppStateManager;

public class IngameWorldState extends AbstractAppState {

    @Override
    public void initialize(AppStateManager stateManager, Application app) {
        stateManager.attach(new GroundState());
        stateManager.attach(new BoxAppState());

        super.initialize(stateManager, app);
    }
}
