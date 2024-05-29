package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.conversation.TextInput.awaitTextInput;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.LIST;
import static org.assertj.core.api.InstanceOfAssertFactories.type;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

import io.github.palexdev.materialfx.controls.MFXButton;
import io.github.palexdev.materialfx.controls.MFXTextField;
import java.util.function.Consumer;
import javafx.event.ActionEvent;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class TextInputTest {

    private static final String LABEL_TRANSLATION_KEY = "test.label";

    @Mock
    private Consumer<String> resultEmitter;

    @Mock
    private Conversation nextConversation;

    private ConversationPart fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = awaitTextInput(LABEL_TRANSLATION_KEY, resultEmitter, nextConversation);
    }

    @Test
    void isTextInput() {
        assertThat(fixture).isInstanceOf(TextInput.class);
    }

    @Nested
    class ApplyTo {

        public static final String SETUP_EXCEPTION_MESSAGE = "Grid is not properly configured for text input!";

        @Mock
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        private GridPane conversationGridSpy;

        @BeforeEach
        void beforeEachSetup() {
            conversationGridSpy = spy(new GridPane());
            doReturn(conversationGridSpy).when(conversationPlayerMock).getConversationGrid();
        }

        @Test
        void throwsErrorWithoutExistingChildren() {
            assertThatThrownBy(() -> fixture.applyTo(conversationPlayerMock))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage(SETUP_EXCEPTION_MESSAGE);
        }

        @Test
        void throwsErrorWithTooMuchRows() {
            conversationGridSpy.addRow(1, new Label("I exist so there are more than one rows!"));

            assertThatThrownBy(() -> fixture.applyTo(conversationPlayerMock))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage(SETUP_EXCEPTION_MESSAGE);
        }

        @Test
        void setupControls() {
            configureFirstRow();

            var labelText = "Whatever You Want";
            doReturn(labelText).when(conversationPlayerMock).resolveTranslation(LABEL_TRANSLATION_KEY);

            var confirmText = "Confirm";
            doReturn(confirmText).when(conversationPlayerMock).resolveTranslation("global.button.confirm");

            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<HBox> buttonGroupCaptor = captor();

            verify(conversationGridSpy).addRow(eq(1), inputCaptor.capture(), buttonGroupCaptor.capture());

            assertThat(inputCaptor.getValue()).isNotNull().extracting(MFXTextField::getPromptText).isEqualTo(labelText);

            assertThat(buttonGroupCaptor.getValue())
                .isNotNull()
                .extracting(HBox::getChildren)
                .asInstanceOf(LIST)
                .hasSize(1)
                .first()
                .asInstanceOf(type(MFXButton.class))
                .extracting(MFXButton::getText)
                .isEqualTo(confirmText);

            verifyNoInteractions(resultEmitter);
            verify(conversationPlayerMock, never()).continueWith(nextConversation);
        }

        @Test
        void awaitsTextInput() {
            configureFirstRow();

            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<HBox> buttonGroupCaptor = captor();

            verify(conversationGridSpy).addRow(eq(1), inputCaptor.capture(), buttonGroupCaptor.capture());

            // Part 2: Simulate input
            assertThat(inputCaptor.getValue()).isNotNull();
            var inputText = "Dancing people are never wrong!";
            inputCaptor.getValue().setText(inputText);

            // Part 3: Simulate confirmation button click
            verifyConfirmButtonAddedAndClick(buttonGroupCaptor);

            verify(resultEmitter).accept(inputText);
            verify(conversationPlayerMock).continueWith(nextConversation);
        }

        @Test
        void refusesEmptyInput() {
            configureFirstRow();

            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<HBox> buttonGroupCaptor = captor();

            verify(conversationGridSpy).addRow(eq(1), inputCaptor.capture(), buttonGroupCaptor.capture());

            // Part 2: Simulate input
            inputCaptor.getValue().setText("");

            // Part 3: Simulate confirmation button click
            verifyConfirmButtonAddedAndClick(buttonGroupCaptor);

            verifyNoInteractions(resultEmitter);
            verify(conversationPlayerMock, never()).continueWith(nextConversation);
        }

        private static void verifyConfirmButtonAddedAndClick(ArgumentCaptor<HBox> buttonGroupCaptor) {
            assertThat(buttonGroupCaptor.getValue()).isNotNull().extracting(HBox::getChildren).asInstanceOf(LIST).hasSize(1);
            var actionEventMock = mock(ActionEvent.class);
            ((MFXButton) buttonGroupCaptor.getValue().getChildren().getFirst()).getOnAction().handle(actionEventMock);
        }

        private void configureFirstRow() {
            conversationGridSpy.add(new Label("I exist so the grid is \"valid\"!"), 0, 0);
        }
    }
}
