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

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.AbstractGameStateChangeEvent;
import java.io.IOException;
import javafx.animation.FadeTransition;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.util.Duration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.EventListener;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SceneChangeService {

    private final ApplicationContext applicationContext;
    private final ResourceBundleMessageSource messageSource;
    private final UserPreferencesService userPreferencesService;

    private Stage stage;

    public SceneChangeService(
        ApplicationContext applicationContext,
        ResourceBundleMessageSource messageSource,
        UserPreferencesService userPreferencesService
    ) {
        this.applicationContext = applicationContext;
        this.messageSource = messageSource;
        this.userPreferencesService = userPreferencesService;
    }

    @EventListener(StageReadyEvent.class)
    public void onStageReady(StageReadyEvent event) {
        log.info("Stage is ready, loading main scene");

        stage = event.getStage();

        loadScene("Main");

        stage.setTitle("Eldoria");
        stage.show();
    }

    @EventListener(AbstractGameStateChangeEvent.class)
    public void onGameStateChange(AbstractGameStateChangeEvent gameStateChange) {
        if (isNull(stage)) {
            throw new IllegalArgumentException("Stage not initialized; State change came too early!");
        }

        var nextScene = gameStateChange.getInitialScene();
        if (nonNull(nextScene)) {
            log.info("Change to next scene: {}", nextScene);
            loadScene(nextScene);
        }
    }

    private void loadScene(String sceneName) {
        var resourceBundle = new SpringResourceBundle(messageSource, userPreferencesService.loadUserPreferences().getLocale());

        var fxmlLoader = new FXMLLoader(getClass().getClassLoader().getResource("view/" + sceneName + "View.fxml"), resourceBundle);
        fxmlLoader.setControllerFactory(applicationContext::getBean);

        Scene nextScene;
        try {
            nextScene = new Scene(fxmlLoader.load());
        } catch (IOException e) {
            throw new IllegalArgumentException(e);
        }

        if (nonNull(stage.getScene())) {
            fadeScenes(nextScene);
        } else {
            stage.setScene(nextScene);
        }
    }

    private void fadeScenes(Scene nextScene) {
        var fadeOut = new FadeTransition(Duration.millis(500), stage.getScene().getRoot());
        fadeOut.setFromValue(1.0);
        fadeOut.setToValue(0.0);

        var fadeIn = new FadeTransition(Duration.millis(500), nextScene.getRoot());
        fadeIn.setFromValue(0.0);
        fadeIn.setToValue(1.0);

        fadeOut.setOnFinished(e -> stage.setScene(nextScene));

        fadeOut.play();
    }
}
