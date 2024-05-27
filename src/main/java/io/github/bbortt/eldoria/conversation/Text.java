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

import jakarta.annotation.Nullable;

import java.util.function.Supplier;

import static java.lang.System.lineSeparator;
import static java.text.MessageFormat.format;
import static java.util.Objects.isNull;
import static org.springframework.util.StringUtils.hasLength;

public final class Text implements ConversationPart {

    private final String translationKey;

    private @Nullable Supplier<Object[]> argumentSupplier;

    // private @Nullable Supplier<InputStream> backgroundImage;

    private Text(String translationKey) {
        this.translationKey = translationKey;
    }

    public Text(String translationKey, Supplier<Object[]> argumentSupplier) {
        this.translationKey = translationKey;
        this.argumentSupplier = argumentSupplier;
    }

    public static ConversationPart showText(String translationKey) {
        return new Text(translationKey);
    }

    public static ConversationPart showTextWithVariables(String translationKey, Supplier<Object[]> argumentSupplier) {
        return new Text(translationKey, argumentSupplier);
    }

    @Override
    public void applyTo(ConversationManager.ConversationPlayer conversationPlayer) {
        var conversationText = conversationPlayer.getConversationText();

        var currentText = conversationText.getText();
        if (hasLength(conversationText.getText())) {
            currentText += lineSeparator();
        } else {
            currentText = "";
        }

        if (isNull(argumentSupplier)) {
            conversationText.setText(currentText + conversationPlayer.resolveTranslation(translationKey));
        } else {
            conversationText.setText(currentText + format(conversationPlayer.resolveTranslation(translationKey), argumentSupplier.get()));
        }
    }
}
