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

import static java.util.Objects.requireNonNull;
import static javafx.geometry.Pos.CENTER;
import static javafx.scene.layout.BackgroundRepeat.NO_REPEAT;
import static javafx.scene.layout.BackgroundSize.AUTO;

import io.github.palexdev.materialfx.controls.MFXButton;
import jakarta.annotation.Nonnull;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundPosition;
import javafx.scene.layout.BackgroundSize;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;

public final class LayoutUtils {

    private LayoutUtils() {
        throw new InstantiationError("Cannot instantiate utility class!");
    }

    public static @Nonnull HBox buttonGroup(MFXButton... buttons) {
        var buttonGroup = new HBox(buttons);
        buttonGroup.setAlignment(CENTER);
        buttonGroup.setSpacing(5.0);
        return buttonGroup;
    }

    public static void applyBackground(@Nonnull String imageName, @Nonnull Pane container) {
        var backgroundImage = new Image(requireNonNull(LayoutUtils.class.getClassLoader().getResourceAsStream(imageName)));
        var background = new BackgroundImage(
            backgroundImage,
            NO_REPEAT,
            NO_REPEAT,
            BackgroundPosition.CENTER,
            new BackgroundSize(AUTO, AUTO, false, false, false, true)
        );

        container.setBackground(new Background(background));
    }
}
