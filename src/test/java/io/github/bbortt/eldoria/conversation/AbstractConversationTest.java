package io.github.bbortt.eldoria.conversation;

public abstract class AbstractConversationTest {

    protected boolean conversationEnds(Conversation conversation) {
        for (ConversationPart part : conversation.get()) {
            if (part instanceof Decision decision) {
                for (Option option : decision.options()) {
                    if (option instanceof ContinueButtonOption continueOption) {
                        Conversation nextConversation = continueOption.getNextConversation();
                        return conversationEnds(nextConversation);
                    }
                }
            } else if (part instanceof TextInput textInput) {
                return conversationEnds(textInput.getNextConversation());
            } else if (part instanceof ConversationEnd) {
                return true;
            }

            System.out.println(part);
        }

        return false;
    }
}
