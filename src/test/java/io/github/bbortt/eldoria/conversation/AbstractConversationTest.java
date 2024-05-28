package io.github.bbortt.eldoria.conversation;

import jakarta.annotation.Nonnull;

public abstract class AbstractConversationTest {

    protected boolean verifyConversationEnds(@Nonnull Conversation conversation) {
        for (ConversationPart part : conversation.get()) {
            if (part instanceof Decision decision) {
                for (Option option : decision.options()) {
                    var nextConversation = option.getNextConversation();
                    return verifyConversationEnds(nextConversation);
                }
            } else if (part instanceof TextInput textInput) {
                return verifyConversationEnds(textInput.getNextConversation());
            } else if (part instanceof ConversationEnd) {
                return true;
            }
            // Part being applied
        }

        return false;
    }
}
