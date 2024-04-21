package io.github.bbortt.eldoria.conversation;

import java.util.List;

public abstract class AbstractConversationTest {

    protected boolean conversationEnds(List<ConversationPart> parts) {
        for (ConversationPart part : parts) {
            if (part instanceof Decision decision) {
                for (Option option : decision.getOptions()) {
                    if (option instanceof ContinueButtonOption continueOption) {
                        Conversation nextConversation = continueOption.getNextConversation();
                        return conversationEnds(nextConversation.get());
                    }
                }
            } else if (part instanceof ConversationEnd) {
                return true;
            }
        }
        return false;
    }
}
