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

import io.github.palexdev.materialfx.controls.MFXButton;
import jakarta.annotation.Nonnull;

import java.util.List;

public record Decision(@Nonnull List<Option> options) implements ConversationPart {

    @Override
    public void applyTo(ConversationManager.ConversationPlayer conversationPlayer) {
        for (var option : options) {
            var button = new MFXButton(conversationPlayer.resolveTranslation(option.getTranslationKey()));
            button.setOnAction(event -> {
                if (option instanceof ContinueButtonOption continueOption) {
                    conversationPlayer.continueWith(continueOption.getNextConversation());
                }
            });

            conversationPlayer.getButtonContainer().getChildren().add(button);
        }
    }
}
