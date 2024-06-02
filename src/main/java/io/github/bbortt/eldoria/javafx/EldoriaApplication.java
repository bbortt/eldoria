/**
 * Copyright 2024 Timon Borter
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.bbortt.eldoria.javafx;

import static javafx.application.Platform.exit;
import static javafx.stage.StageStyle.TRANSPARENT;

import fr.brouillard.oss.cssfx.CSSFX;
import io.github.bbortt.eldoria.Eldoria;
import io.github.palexdev.materialfx.theming.JavaFXThemes;
import io.github.palexdev.materialfx.theming.MaterialFXStylesheets;
import io.github.palexdev.materialfx.theming.UserAgentBuilder;
import javafx.application.Application;
import javafx.stage.Stage;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

public class EldoriaApplication extends Application {

    private ConfigurableApplicationContext applicationContext;

    @Override
    public void init() {
        applicationContext = new SpringApplicationBuilder(Eldoria.class).run();
    }

    @Override
    public void start(Stage stage) {
        stage.initStyle(TRANSPARENT);
        stage.setHeight(832);
        stage.setWidth(1216);
        stage.setTitle("Eldoria");

        CSSFX.start();

        UserAgentBuilder.builder()
            .themes(JavaFXThemes.MODENA)
            .themes(MaterialFXStylesheets.forAssemble(false))
            .setDeploy(true) // Whether to deploy each theme's assets on a temporary dir on the disk
            .setResolveAssets(true) // Whether to try resolving @import statements and resources urls
            .build()
            .setGlobal();

        applicationContext.publishEvent(new StageReadyEvent(stage));
    }

    @Override
    public void stop() {
        applicationContext.close();
        exit();
    }
}
