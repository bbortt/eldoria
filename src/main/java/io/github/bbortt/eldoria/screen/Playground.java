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
import com.jme3.app.state.BaseAppState;
import de.lessvoid.nifty.Nifty;
import de.lessvoid.nifty.screen.Screen;
import de.lessvoid.nifty.screen.ScreenController;

import javax.annotation.Nonnull;

import static io.github.bbortt.eldoria.screen.NiftyUtils.getNifty;

/**
 * @see <a href="https://wiki.jmonkeyengine.org/docs/3.4/core/gui/nifty_gui_java_layout.html">Laying Out the GUI in Java</a>
 */
public final class Playground extends BaseAppState implements ScreenController {

    @Override
    protected void initialize(Application app) {
        getNifty(app).fromXml("screens/screen.xml", "start");
    }

    @Override
    protected void onEnable() {
    }

    @Override
    protected void onDisable() {
    }

    @Override
    protected void cleanup(Application app) {
    }

    @Override
    public void bind(@Nonnull Nifty nifty, @Nonnull Screen screen) {

    }

    @Override
    public void onStartScreen() {

    }

    @Override
    public void onEndScreen() {

    }

    /**
     * custom methods
     */
    public void startGame(String nextScreen) {
        getNifty(getApplication()).gotoScreen(nextScreen);
    }

    public void quitGame() {
        getApplication().stop();
    }
}
