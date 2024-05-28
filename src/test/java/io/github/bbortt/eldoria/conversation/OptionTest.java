package io.github.bbortt.eldoria.conversation;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.CALLS_REAL_METHODS;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class OptionTest {

    private Option fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = mock(CALLS_REAL_METHODS);
    }

    @Test
    void requiredArgsConstructor() {
        var translationKey = "translate.this";

        assertThat(new Option(translationKey)).satisfies(
            o -> assertThat(o).extracting(Option::getTranslationKey).isEqualTo(translationKey),
            o -> assertThat(o).extracting(Option::getNextConversation).isNull()
        );
    }

    @Test
    void allArgsConstructor() {
        var translationKey = "translate.this";
        var nextConversation = mock(Conversation.class);

        assertThat(new Option(translationKey, nextConversation)).satisfies(
            o -> assertThat(o).extracting(Option::getTranslationKey).isEqualTo(translationKey),
            o -> assertThat(o).extracting(Option::getNextConversation).isEqualTo(nextConversation)
        );
    }

    @Nested
    class SetNextConversation {

        @Test
        void setsVariableWhenNotYetInitialized() {
            var nextConversation = mock(Conversation.class);

            fixture.setNextConversation(nextConversation);

            assertThat(fixture).extracting(Option::getNextConversation).isEqualTo(nextConversation);
        }

        @Test
        void throwsExceptionWhenAlreadyInitialized() {
            var nextConversation = mock(Conversation.class);

            // First invocation is ok
            fixture.setNextConversation(nextConversation);

            assertThatThrownBy(() -> fixture.setNextConversation(nextConversation))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Conversation already initialized!");
        }
    }
}
