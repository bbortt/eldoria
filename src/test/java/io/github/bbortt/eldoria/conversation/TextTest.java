package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.Text.showTextWithVariables;
import static java.lang.System.lineSeparator;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.clearInvocations;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;

import java.util.function.Supplier;
import java.util.stream.Stream;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.ArgumentCaptor;
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
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        private GridPane conversationGridSpy;

        @BeforeEach
        void beforeEachSetup() {
            conversationGridSpy = spy(new GridPane());
            doReturn(conversationGridSpy).when(conversationPlayerMock).getConversationGrid();
        }

        public static Stream<String> emptyTextSource() {
            return Stream.of(null, "");
        }

        @Test
        void simpleTextWithoutCurrentText() {
            var translationKey = "quote";
            var translatedText = "you can totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showText(translationKey).applyTo(conversationPlayerMock);

            verifyTextLabelHasBeenAdded("you can totally do this");
        }

        @Test
        void simpleTextWithCurrentText() {
            var textLabel = createExistingLabelWithText("you can");

            var translationKey = "quote";
            var translatedText = "totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showText(translationKey).applyTo(conversationPlayerMock);

            verifyTextLabelHasBeenAdded(textLabel.getText() + lineSeparator() + translatedText);
        }

        @ParameterizedTest
        @MethodSource("emptyTextSource")
        void textWithArgumentsWithoutCurrentText(String currentText) {
            createExistingLabelWithText(currentText);

            var translationKey = "quote";
            var translatedText = "{0} can totally do this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showTextWithVariables(translationKey, () -> new String[] { "you" }).applyTo(conversationPlayerMock);

            verifyTextLabelHasBeenAdded("you can totally do this");
        }

        @Test
        void textWithArgumentsWithCurrentText() {
            var textLabel = createExistingLabelWithText("you can");

            var translationKey = "quote";
            var translatedText = "totally {0} this";

            doReturn(translatedText).when(conversationPlayerMock).resolveTranslation(translationKey);

            showTextWithVariables(translationKey, () -> new String[] { "not do" }).applyTo(conversationPlayerMock);

            verifyTextLabelHasBeenAdded(textLabel.getText() + lineSeparator() + "totally not do this");
        }

        private Label createExistingLabelWithText(String text) {
            var textLabel = new Label(text);
            conversationGridSpy.add(textLabel, 0, 0);
            clearInvocations(conversationGridSpy);
            return textLabel;
        }

        private void verifyTextLabelHasBeenAdded(String textLabel) {
            ArgumentCaptor<Label> labelArgumentCaptor = captor();
            verify(conversationGridSpy).add(labelArgumentCaptor.capture(), eq(0), eq(0));

            assertThat(labelArgumentCaptor.getValue()).extracting(Label::getText).isEqualTo(textLabel);
        }
    }
}
