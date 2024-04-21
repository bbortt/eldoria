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
