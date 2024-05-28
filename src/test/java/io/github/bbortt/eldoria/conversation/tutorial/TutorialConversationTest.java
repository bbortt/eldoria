package io.github.bbortt.eldoria.conversation.tutorial;

import static org.junit.jupiter.api.Assertions.assertTrue;

import io.github.bbortt.eldoria.conversation.AbstractConversationTest;
import org.junit.jupiter.api.Test;

class TutorialConversationTest extends AbstractConversationTest {

    @Test
    void conversationEnds() {
        var fixture = new TutorialConversation();

        assertTrue(verifyConversationEnds(fixture), "TutorialConversationTest did not end with ConversationEnd");
    }
}
