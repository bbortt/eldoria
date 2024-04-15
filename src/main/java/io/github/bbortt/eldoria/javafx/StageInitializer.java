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

import io.github.bbortt.eldoria.service.UserPreferencesService;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static java.util.ResourceBundle.getBundle;

@Component
public class StageInitializer implements ApplicationListener<StageReadyEvent> {

    private final ApplicationContext applicationContext;
    private final UserPreferencesService userPreferencesService;

    private Parent rootNode;

    public StageInitializer(ApplicationContext applicationContext, UserPreferencesService userPreferencesService) {
        this.applicationContext = applicationContext;
        this.userPreferencesService = userPreferencesService;
    }

    @Override
    public void onApplicationEvent(StageReadyEvent event) {
        var stage = event.getStage();

        var resourceBundle = getBundle("main_view", userPreferencesService.loadUserPreferences().getLocale());

        var fxmlLoader = new FXMLLoader(
                getClass().getClassLoader().getResource("view/MainView.fxml"),
                resourceBundle);
        fxmlLoader.setControllerFactory(applicationContext::getBean);

        try {
            rootNode = fxmlLoader.load();
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }

        stage.setScene(new Scene(rootNode));
        stage.setTitle("Eldoria");
        stage.show();
    }
}
