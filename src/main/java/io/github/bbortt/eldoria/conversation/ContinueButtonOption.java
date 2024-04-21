package io.github.bbortt.eldoria.conversation;

public final class ContinueButtonOption extends Option {

    public ContinueButtonOption(Conversation nextConversation) {
        super("global.button.continue", nextConversation);
    }
}
