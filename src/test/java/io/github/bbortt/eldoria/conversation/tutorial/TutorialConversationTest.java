package io.github.bbortt.eldoria.conversation.tutorial;

import io.github.bbortt.eldoria.conversation.AbstractConversationTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class TutorialConversationTest extends AbstractConversationTest {

    @Test
    public void conversationEnds() {
        var fixture = new TutorialConversation();

        assertTrue(conversationEnds(fixture.getParts()), "TutorialConversationTest did not end with ConversationEnd");
    }
}
