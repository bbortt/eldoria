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

package io.github.bbortt.eldoria;

import com.jme3.app.SimpleApplication;
import com.jme3.system.AppSettings;
import io.github.bbortt.eldoria.screen.NiftyState;
import io.github.bbortt.eldoria.screen.Playground;

public class Eldoria extends SimpleApplication {

    public static void main(String[] args) {
        Eldoria eldoria = new Eldoria();
        eldoria.setSettings(loadSettings());
        eldoria.start();
    }

    private static AppSettings loadSettings() {
        AppSettings appSettings = new AppSettings(true);

        // appSettings.setFullscreen(true);
        appSettings.setResolution(1216, 832);

        return appSettings;
    }

    @Override
    public void simpleInitApp() {
        stateManager.attach(new NiftyState());
        stateManager.attach(new Playground());
    }
}
