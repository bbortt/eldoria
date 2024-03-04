package io.github.bbortt.eldoria.screen;

import com.jme3.app.Application;
import de.lessvoid.nifty.Nifty;

public final class NiftyUtils {

    private NiftyUtils() {
        // Utility class
    }

    public static Nifty getNifty(Application application) {
        return application.getStateManager().getState(NiftyState.class).getNifty();
    }
}
