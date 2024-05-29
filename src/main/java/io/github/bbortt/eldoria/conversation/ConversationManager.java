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

import static javafx.application.Platform.runLater;

import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import java.util.concurrent.CompletableFuture;
import javafx.scene.layout.GridPane;

public class ConversationManager {

    private final GridPane conversationGrid;
    private final SpringResourceBundle springResourceBundle;

    public ConversationManager(GridPane conversationGrid, SpringResourceBundle springResourceBundle) {
        this.conversationGrid = conversationGrid;
        this.springResourceBundle = springResourceBundle;
    }

    public CompletableFuture<Void> playConversation(Conversation conversation) {
        var conversationPlayer = new ConversationPlayer();
        conversationPlayer.continueWith(conversation);
        return conversationPlayer.conversationCompleted;
    }

    public class ConversationPlayer {

        private final CompletableFuture<Void> conversationCompleted;

        private ConversationPlayer() {
            conversationCompleted = new CompletableFuture<>();
        }

        GridPane getConversationGrid() {
            return conversationGrid;
        }

        void continueWith(Conversation conversation) {
            getConversationGrid().getChildren().clear();

            runLater(() -> applyEachConversationPart(conversation));
        }

        private void applyEachConversationPart(Conversation conversation) {
            for (var part : conversation.get()) {
                if (part instanceof ConversationEnd) {
                    conversationCompleted.complete(null);
                    break;
                }

                part.applyTo(this);
            }
        }

        public String resolveTranslation(String translationKey) {
            return springResourceBundle.getString(translationKey);
        }
    }
}
