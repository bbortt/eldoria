package io.github.bbortt.eldoria.conversation;

public abstract class AbstractConversationTest {

    protected boolean verifyConversationEnds(Conversation conversation) {
        for (ConversationPart part : conversation.get()) {
            if (part instanceof Decision decision) {
                for (Option option : decision.options()) {
                    if (option instanceof ContinueButtonOption continueOption) {
                        var nextConversation = continueOption.getNextConversation();
                        return verifyConversationEnds(nextConversation);
                    }
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
