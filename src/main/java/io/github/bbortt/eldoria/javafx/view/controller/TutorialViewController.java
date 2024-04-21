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
