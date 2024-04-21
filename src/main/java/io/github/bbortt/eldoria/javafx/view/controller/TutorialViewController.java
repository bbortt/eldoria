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

import io.github.bbortt.eldoria.conversation.tutorial.TutorialConversation;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class TutorialViewController {

    private final UserPreferencesService userPreferencesService;

    @FXML
    public Label tutorialText;

    @FXML
    public VBox buttonContainer;

    public TutorialViewController(UserPreferencesService userPreferencesService) {
        this.userPreferencesService = userPreferencesService;
    }

    public void initialize() {
        var conversation = new TutorialConversation();
    }
}
