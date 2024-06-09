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

package io.github.bbortt.eldoria.javafx.view.controller;

import static io.github.bbortt.eldoria.javafx.LayoutUtils.applyBackground;

import io.github.bbortt.eldoria.game.event.StartNewGameEvent;
import io.github.bbortt.eldoria.game.event.StartTutorialEvent;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.fxml.FXML;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MainViewController {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final GameService gameService;
    private final UserPreferencesService userPreferencesService;

    @FXML
    private BorderPane viewBox;

    @FXML
    private MFXButton exitButton;

    public MainViewController(
        ApplicationEventPublisher applicationEventPublisher,
        GameService gameService,
        UserPreferencesService userPreferencesService
    ) {
        this.applicationEventPublisher = applicationEventPublisher;
        this.gameService = gameService;
        this.userPreferencesService = userPreferencesService;
    }

    public boolean isLoadGamesAvailable() {
        return gameService.hasSavedAnyGames();
    }

    public void initialize() {
        applyBackground("images/background.png", viewBox, false);
    }

    @FXML
    void handleStartGame() {
        log.info("Game starting, deciding upon starting the tutorial or not");

        var userPreferences = userPreferencesService.loadUserPreferences();
        if (userPreferences.hasPlayedTutorial()) {
            log.debug("Tutorial has already been done: Going to the start screen");
            applicationEventPublisher.publishEvent(new StartNewGameEvent());
        } else {
            log.debug("Tutorial has not been done yet: Starting it now");
            applicationEventPublisher.publishEvent(new StartTutorialEvent());
        }
    }

    @FXML
    private void handleLoadGame() {
        log.info("Switching to saved games list");
        // Add your load game logic here
    }

    @FXML
    public void handleExitGame() {
        log.info("Game exit requested");

        var stage = (Stage) exitButton.getScene().getWindow();
        stage.close();
    }
}
