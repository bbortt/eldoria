package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.Text.showTextWithVariables;
import static java.lang.System.lineSeparator;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;

import java.util.function.Supplier;
import java.util.stream.Stream;
import javafx.scene.control.Label;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class TextTest {

    public static final String TRANSLATION_KEY = "translationKey";

    @Test
    void fromStaticAccessor() {
        var translationKey = "not the string your looking for";

        assertThat(showText(translationKey))
            .isInstanceOf(ConversationPart.class)
            .isInstanceOf(Text.class)
            .hasAllNullFieldsOrPropertiesExcept(TRANSLATION_KEY)
            .hasFieldOrPropertyWithValue(TRANSLATION_KEY, translationKey);
    }

    @Test
    void fromStaticAccessorWithVariables() {
        var translationKey = "not the string your looking for";
        Supplier<Object[]> argumentSupplier = () -> new String[] { "one", "two", "or three" };

        assertThat(showTextWithVariables(translationKey, argumentSupplier))
            .isInstanceOf(ConversationPart.class)
            .isInstanceOf(Text.class)
            .hasNoNullFieldsOrProperties()
            .hasFieldOrPropertyWithValue(TRANSLATION_KEY, translationKey)
            .hasFieldOrPropertyWithValue("argumentSupplier", argumentSupplier);
    }

    @Nested
    class ApplyTo {

        @Mock
        private Label labelMock;

        @Mock
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        @BeforeEach
        void beforeEachSetup() {
            doReturn(labelMock).when(conversationPlayerMock).getConversationText();
        }

        public static Stream<String> emptyTextSource() {
            return Stream.of(null, "");
        }

        @ParameterizedTest
        @MethodSource("emptyTextSource")
        void simpleTextWithoutCurrentText(String currentText) {
            doReturn(currentText).when(labelMock).getText();

            var translationKey = "quote";
            var translatedText = "you can totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showText(translationKey).applyTo(conversationPlayerMock);

            verify(labelMock).setText(translatedText);

            verifyGetConversationText();
        }

        @Test
        void simpleTextWithCurrentText() {
            var currentText = "you can";
            doReturn(currentText).when(labelMock).getText();

            var translationKey = "quote";
            var translatedText = "totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showText(translationKey).applyTo(conversationPlayerMock);

            verify(labelMock).setText(currentText + lineSeparator() + translatedText);

            verifyGetConversationText();
        }

        @ParameterizedTest
        @MethodSource("emptyTextSource")
        void textWithArgumentsWithoutCurrentText(String currentText) {
            doReturn(currentText).when(labelMock).getText();

            var translationKey = "quote";
            var translatedText = "{0} can totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showTextWithVariables(translationKey, () -> new String[] { "you" }).applyTo(conversationPlayerMock);

            verify(labelMock).setText("you can totally do this");

            verifyGetConversationText();
        }

        @Test
        void textWithArgumentsWithCurrentText() {
            var currentText = "you can";
            doReturn(currentText).when(labelMock).getText();

            var translationKey = "quote";
            var translatedText = "totally {0} this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showTextWithVariables(translationKey, () -> new String[] { "not do" }).applyTo(conversationPlayerMock);

            verify(labelMock).setText(currentText + lineSeparator() + "totally not do this");

            verifyGetConversationText();
        }

        private void verifyGetConversationText() {
            verify(conversationPlayerMock).getConversationText();
            verifyNoMoreInteractions(conversationPlayerMock);
        }
    }
}
