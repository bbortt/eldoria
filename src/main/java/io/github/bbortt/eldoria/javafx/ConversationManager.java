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

import io.github.bbortt.eldoria.conversation.ContinueButtonOption;
import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.ConversationEnd;
import io.github.bbortt.eldoria.conversation.ConversationPart;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Option;
import io.github.bbortt.eldoria.conversation.Text;
import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import static java.lang.System.lineSeparator;
import static org.springframework.util.StringUtils.hasLength;

public class ConversationManager {

    private final Label conversationText;
    private final VBox buttonContainer;

    private final SpringResourceBundle springResourceBundle;

    public ConversationManager(Label conversationText, VBox buttonContainer, SpringResourceBundle springResourceBundle) {
        this.conversationText = conversationText;
        this.buttonContainer = buttonContainer;
        this.springResourceBundle = springResourceBundle;
    }

    public Future<Void> playConversation(Conversation conversation) {
        var future = new CompletableFuture<Void>();
        updateConversationPartUI(conversation.get(), future);
        return future;
    }

    private void updateConversationPartUI(List<ConversationPart> parts, CompletableFuture<Void> future) {
        conversationText.setText("");
        buttonContainer.getChildren().clear();

        for (ConversationPart part : parts) {
            if (part instanceof Text text) {
                var currentText = conversationText.getText();
                if (hasLength(conversationText.getText())) {
                    currentText += lineSeparator();
                }

                conversationText.setText(currentText + resolveTranslation(text.getTranslationKey()));
            } else if (part instanceof Decision decision) {
                for (Option option : decision.getOptions()) {
                    MFXButton button = new MFXButton(resolveTranslation(option.getTranslationKey()));
                    button.setOnAction(event -> {
                        if (option instanceof ContinueButtonOption continueOption) {
                            updateConversationPartUI(continueOption.getNextConversation().get(), future);
                        }
                    });

                    buttonContainer.getChildren().add(button);
                }
            } else if (part instanceof ConversationEnd) {
                future.complete(null);
                break;
            }
        }
    }

    private String resolveTranslation(String translationKey) {
        return springResourceBundle.getString(translationKey);
    }
}
