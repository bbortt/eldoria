package io.github.bbortt.eldoria.conversation;

import lombok.Getter;

import java.util.List;

@Getter
public final class Decision implements ConversationPart {

    private final List<Option> options;

    public Decision(List<Option> options) {
        this.options = options;
    }
}
