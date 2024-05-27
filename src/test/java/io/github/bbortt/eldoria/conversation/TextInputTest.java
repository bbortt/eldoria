package io.github.bbortt.eldoria.conversation;

import io.github.palexdev.materialfx.controls.MFXButton;
import io.github.palexdev.materialfx.controls.MFXTextField;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.scene.Node;
import javafx.scene.layout.VBox;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

import java.util.function.Consumer;

import static io.github.bbortt.eldoria.conversation.TextInput.awaitTextInput;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

@ExtendWith({ApplicationExtension.class, MockitoExtension.class})
class TextInputTest {

    @Mock
    private Consumer<String> resultEmitter;

    @Mock
    private Conversation nextConversation;

    private ConversationPart fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = awaitTextInput(resultEmitter, nextConversation);
    }

    @Test
    void isTextInput() {
        assertThat(fixture)
                .isInstanceOf(TextInput.class);
    }

    @Nested
    class ApplyTo {

        @Mock
        private VBox actionContainerMock;

        @Mock
        private ObservableList<Node> actionContainerChildrenMock;

        @Mock
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        @BeforeEach
        void beforeEachSetup() {
            doReturn(actionContainerMock).when(conversationPlayerMock).getActionContainer();
            doReturn(actionContainerChildrenMock).when(actionContainerMock).getChildren();
        }

        @Test
        void setupControls() {
            var usernameText = "Username";
            doReturn(usernameText).when(conversationPlayerMock).resolveTranslation("global.character.username");

            var confirmText = "Confirm";
            doReturn(confirmText).when(conversationPlayerMock).resolveTranslation("global.button.confirm");

            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<MFXButton> buttonCaptor = captor();

            verify(actionContainerChildrenMock).addAll(inputCaptor.capture(), buttonCaptor.capture());

            assertThat(inputCaptor.getValue())
                    .isNotNull()
                    .extracting(MFXTextField::getPromptText)
                    .isEqualTo(usernameText);

            assertThat(buttonCaptor.getValue())
                    .isNotNull()
                    .extracting(MFXButton::getText)
                    .isEqualTo(confirmText);

            verifyNoInteractions(resultEmitter);
            verify(conversationPlayerMock, never()).continueWith(nextConversation);
        }

        @Test
        void awaitsTextInput() {
            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<MFXButton> buttonCaptor = captor();

            verify(actionContainerChildrenMock).addAll(inputCaptor.capture(), buttonCaptor.capture());

            // Part 2: Simulate input
            var inputText = "Dancing people are never wrong!";
            inputCaptor.getValue().setText(inputText);

            // Part 3: Verify confirmation button click
            var actionEventMock = mock(ActionEvent.class);
            buttonCaptor.getValue().getOnAction().handle(actionEventMock);

            verify(resultEmitter).accept(inputText);
            verify(conversationPlayerMock).continueWith(nextConversation);
        }

        @Test
        void refusesEmptyInput() {
            // Part 1: Setup
            fixture.applyTo(conversationPlayerMock);

            ArgumentCaptor<MFXTextField> inputCaptor = captor();
            ArgumentCaptor<MFXButton> buttonCaptor = captor();

            verify(actionContainerChildrenMock).addAll(inputCaptor.capture(), buttonCaptor.capture());

            // Part 2: Simulate input
            inputCaptor.getValue().setText("");

            // Part 3: Verify confirmation button click
            var actionEventMock = mock(ActionEvent.class);
            buttonCaptor.getValue().getOnAction().handle(actionEventMock);

            verifyNoInteractions(resultEmitter);
            verify(conversationPlayerMock, never()).continueWith(nextConversation);
        }
    }
}
