package io.github.bbortt.eldoria.conversation.tutorial;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import io.github.bbortt.eldoria.conversation.AbstractConversationTest;
import javafx.scene.layout.BorderPane;
import org.junit.jupiter.api.Test;

class TutorialConversationTest extends AbstractConversationTest {

    @Test
    void conversationEnds() {
        var fixture = new TutorialConversation();

        assertTrue(
            verifyConversationEnds(fixture.build(mock(BorderPane.class))),
            "TutorialConversationTest did not end with ConversationEnd"
        );
    }
}
