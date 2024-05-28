package io.github.bbortt.eldoria.conversation;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;

import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.scene.Node;
import javafx.scene.layout.VBox;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class DecisionTest {

    @Nested
    class ApplyTo {

        @Mock
        private VBox actionContainerMock;

        @Mock
        private ObservableList<Node> actionContainerChildrenMock;

        @Mock
        private ConversationManager.ConversationPlayer conversationPlayerMock;

        @Test
        void noOptions() {
            new Decision(emptyList()).applyTo(conversationPlayerMock);

            verifyNoInteractions(conversationPlayerMock);
        }

        @Test
        void normalOptionHasNoAction() {
            var optionMock = mock(Option.class);
            verifyOptionResultsInMfxButton(optionMock);
        }

        @Test
        void continueButtonOptionHasAction() {
            var continueButtonOptionMock = mock(ContinueButtonOption.class);
            var mfxButton = verifyOptionResultsInMfxButton(continueButtonOptionMock);

            var conversationMock = mock(Conversation.class);
            doReturn(conversationMock).when(continueButtonOptionMock).getNextConversation();

            var actionEventMock = mock(ActionEvent.class);
            mfxButton.getOnAction().handle(actionEventMock);
            verifyNoInteractions(actionEventMock);

            verify(conversationPlayerMock).continueWith(conversationMock);
        }

        private MFXButton verifyOptionResultsInMfxButton(Option optionMock) {
            var buttonTextKey = "global.button.continue";
            doReturn(buttonTextKey).when(optionMock).getTranslationKey();

            var buttonText = "Continue";
            doReturn(buttonText).when(conversationPlayerMock).resolveTranslation(buttonTextKey);

            doReturn(actionContainerMock).when(conversationPlayerMock).getActionContainer();
            doReturn(actionContainerChildrenMock).when(actionContainerMock).getChildren();

            new Decision(singletonList(optionMock)).applyTo(conversationPlayerMock);

            verify(actionContainerMock).getChildren();
            verifyNoMoreInteractions(actionContainerMock);

            ArgumentCaptor<MFXButton> buttonCaptor = captor();
            verify(actionContainerChildrenMock).add(buttonCaptor.capture());

            var mfxButton = buttonCaptor.getValue();
            assertThat(mfxButton).extracting(MFXButton::getText).isEqualTo(buttonText);

            reset(conversationPlayerMock);

            return mfxButton;
        }
    }
}
