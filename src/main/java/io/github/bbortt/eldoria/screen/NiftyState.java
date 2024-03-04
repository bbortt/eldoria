/**
 * Copyright 2024 Timon Borter
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.bbortt.eldoria.screen;

import com.jme3.app.Application;
import com.jme3.app.SimpleApplication;
import com.jme3.app.state.BaseAppState;
import com.jme3.niftygui.NiftyJmeDisplay;
import de.lessvoid.nifty.Nifty;

import javax.annotation.Nullable;

import static com.jme3.niftygui.NiftyJmeDisplay.newNiftyJmeDisplay;

public final class NiftyState extends BaseAppState {

    private Nifty nifty;

    public @Nullable Nifty getNifty() {
        return nifty;
    }

    @Override
    public void initialize(Application application) {
        NiftyJmeDisplay niftyDisplay = newNiftyJmeDisplay(
                getApplication().getAssetManager(),
                getApplication().getInputManager(),
                getApplication().getAudioRenderer(),
                getApplication().getGuiViewPort());

        nifty = niftyDisplay.getNifty();
        getApplication().getGuiViewPort().addProcessor(niftyDisplay);
        ((SimpleApplication) getApplication()).getFlyByCamera().setDragToRotate(true);

        nifty.loadStyleFile("nifty-default-styles.xml");
        nifty.loadControlFile("nifty-default-controls.xml");
    }

    @Override
    protected void onEnable() {

    }

    @Override
    protected void onDisable() {

    }

    @Override
    protected void cleanup(Application application) {

    }
}
