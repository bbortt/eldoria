package io.github.bbortt.eldoria.conversation;

import lombok.Getter;

@Getter
public sealed class Option permits ContinueButtonOption {

    private final String translationKey;

    private final Conversation nextConversation;

    public Option(String translationKey, Conversation nextConversation) {
        this.translationKey = translationKey;
        this.nextConversation = nextConversation;
    }
}
