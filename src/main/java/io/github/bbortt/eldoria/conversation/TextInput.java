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

package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.javafx.LayoutUtils.buttonGroup;
import static io.github.bbortt.eldoria.javafx.StyleClasses.BUTTON_OUTLINE;
import static io.github.palexdev.materialfx.enums.FloatMode.DISABLED;
import static javafx.scene.input.KeyCode.ENTER;
import static lombok.AccessLevel.PACKAGE;
import static org.springframework.util.StringUtils.hasLength;

import io.github.palexdev.materialfx.controls.MFXButton;
import io.github.palexdev.materialfx.controls.MFXTextField;
import java.util.function.Consumer;
import lombok.Getter;

public final class TextInput implements ConversationPart {

    private final String labelTranslationKey;
    private final Consumer<String> resultEmitter;

    @Getter(PACKAGE)
    private final Conversation nextConversation;

    private TextInput(String labelTranslationKey, Consumer<String> resultEmitter, Conversation nextConversation) {
        this.labelTranslationKey = labelTranslationKey;
        this.resultEmitter = resultEmitter;
        this.nextConversation = nextConversation;
    }

    public static ConversationPart awaitTextInput(
        String labelTranslationKey,
        Consumer<String> resultEmitter,
        Conversation nextConversation
    ) {
        return new TextInput(labelTranslationKey, resultEmitter, nextConversation);
    }

    @Override
    public void applyTo(ConversationManager.ConversationPlayer conversationPlayer) {
        var conversationGrid = conversationPlayer.getConversationGrid();
        if (conversationGrid.getChildren().isEmpty() || conversationGrid.getRowCount() >= 2) {
            throw new IllegalArgumentException("Grid is not properly configured for text input!");
        }

        var textInput = new MFXTextField("", conversationPlayer.resolveTranslation(labelTranslationKey));
        textInput.setFloatMode(DISABLED);
        textInput.setPrefWidth(1216.0);
        textInput
            .onKeyPressedProperty()
            .set(keyEvent -> {
                if (ENTER.equals(keyEvent.getCode())) {
                    continueConversationWithInput(conversationPlayer, textInput);
                }
            });

        var confirmButton = new MFXButton(conversationPlayer.resolveTranslation("global.button.confirm"));
        confirmButton.getStyleClass().addAll(BUTTON_OUTLINE.getStyleClasses());
        confirmButton.setOnAction(event -> continueConversationWithInput(conversationPlayer, textInput));

        conversationGrid.addRow(1, textInput, buttonGroup(confirmButton));
    }

    private void continueConversationWithInput(ConversationManager.ConversationPlayer conversationPlayer, MFXTextField textInput) {
        var inputText = textInput.getText();
        if (!hasLength(inputText)) {
            return;
        }

        resultEmitter.accept(inputText);
        conversationPlayer.continueWith(nextConversation);
    }
}
