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

import static java.lang.System.lineSeparator;
import static java.text.MessageFormat.format;
import static java.util.Objects.isNull;
import static javafx.geometry.Pos.CENTER;
import static javafx.scene.layout.GridPane.getColumnIndex;
import static javafx.scene.layout.GridPane.getRowIndex;
import static org.springframework.util.StringUtils.hasLength;

import jakarta.annotation.Nullable;
import java.util.function.Supplier;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.text.TextAlignment;

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
        var currentText = getTextFromGrid(conversationPlayer.getConversationGrid());
        if (hasLength(currentText)) {
            currentText += lineSeparator();
        } else {
            currentText = "";
        }

        if (isNull(argumentSupplier)) {
            currentText += conversationPlayer.resolveTranslation(translationKey);
        } else {
            currentText += format(conversationPlayer.resolveTranslation(translationKey), argumentSupplier.get());
        }

        var textLabel = new Label(currentText);
        textLabel.setAlignment(CENTER);
        textLabel.setTextAlignment(TextAlignment.CENTER);
        textLabel.setWrapText(true);

        conversationPlayer.getConversationGrid().add(textLabel, 0, 0);
    }

    private @Nullable String getTextFromGrid(GridPane gridPane) {
        for (Node child : gridPane.getChildren()) {
            if (getColumnIndex(child) == 0 && getRowIndex(child) == 0 && child instanceof Label label) {
                return label.getText();
            }
        }

        return null;
    }
}
