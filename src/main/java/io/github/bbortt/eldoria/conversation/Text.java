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
import lombok.Getter;

import java.io.InputStream;
import java.util.Optional;
import java.util.function.Supplier;

import static java.util.Objects.nonNull;

public final class Text implements ConversationPart {

    @Getter
    private final String translationKey;

    private @Nullable Supplier<InputStream> backgroundImage;

    public Text(String translationKey) {
        this.translationKey = translationKey;
    }

    public Text(String translationKey, Supplier<InputStream> backgroundImage) {
        this.translationKey = translationKey;
        this.backgroundImage = backgroundImage;
    }

    public Optional<InputStream> getBackgroundImage() {
        if (nonNull(backgroundImage)) {
            return Optional.of(backgroundImage.get());
        }

        return Optional.empty();
    }
}
