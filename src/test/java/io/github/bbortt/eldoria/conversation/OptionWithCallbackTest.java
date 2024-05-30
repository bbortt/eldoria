package io.github.bbortt.eldoria.conversation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

import java.util.concurrent.atomic.AtomicBoolean;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class OptionWithCallbackTest {

    @Nested
    class GetNextConversation {

        @Test
        void invokesCallback() {
            var translationKey = "translate.this";
            var nextConversation = mock(Conversation.class);

            var callback = new AtomicBoolean(false);

            var fixture = new OptionWithCallback(translationKey, nextConversation, () -> callback.set(true));

            var result = fixture.getNextConversation();

            assertThat(result).isEqualTo(nextConversation);

            assertThat(callback).isTrue();
        }
    }
}
