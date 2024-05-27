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

import io.github.bbortt.eldoria.conversation.ConversationManager;
import io.github.bbortt.eldoria.conversation.tutorial.TutorialConversation;
import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class TutorialViewController {

    private final MessageSource messageSource;
    private final GameService gameService;
    private final UserPreferencesService userPreferencesService;

    private final TutorialConversation conversation = new TutorialConversation();

    @FXML
    public Label tutorialText;

    @FXML
    public VBox actionContainer;

    public TutorialViewController(MessageSource messageSource, GameService gameService, UserPreferencesService userPreferencesService) {
        this.messageSource = messageSource;
        this.gameService = gameService;
        this.userPreferencesService = userPreferencesService;
    }

    public void initialize() {
        new ConversationManager(tutorialText, actionContainer, new SpringResourceBundle(messageSource, userPreferencesService.loadUserPreferences().getLocale()))
                .playConversation(conversation)
                .thenAccept(this::finishTutorialAndStartGame);
    }

    private void finishTutorialAndStartGame(Void ignore) {
        userPreferencesService.setTutorialFinished();
        gameService.startNewGame(conversation.getPlayerName());
    }
}
