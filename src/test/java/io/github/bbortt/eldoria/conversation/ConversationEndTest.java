package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verifyNoInteractions;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({ MockitoExtension.class })
class ConversationEndTest {

    @Test
    void fromStaticAccessor() {
        assertThat(conversationEnd())
            .isInstanceOf(Conversation.class)
            .extracting(Conversation::get)
            .asList()
            .hasSize(1)
            .first()
            .isInstanceOf(ConversationPart.class)
            .isInstanceOf(ConversationEnd.class);
    }

    @Nested
    class ApplyTo {

        @Mock
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        @Test
        void shouldNotBeInvoked() {
            assertThatThrownBy(() -> conversationEnd().get().getFirst().applyTo(conversationPlayerMock))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("This method shall not be invoked!");

            verifyNoInteractions(conversationPlayerMock);
        }
    }
}
