package io.github.bbortt.eldoria.conversation;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.InstanceOfAssertFactories.type;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

import io.github.palexdev.materialfx.controls.MFXButton;
import jakarta.annotation.Nonnull;
import javafx.event.ActionEvent;
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
class DecisionTest {

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

        @Test
        void noOptions() {
            new Decision(emptyList()).applyTo(conversationPlayerMock);

            ArgumentCaptor<HBox> buttonGroupCaptor = captor();
            verify(conversationGridSpy).add(buttonGroupCaptor.capture(), eq(1), eq(0));

            var buttonGroup = buttonGroupCaptor.getValue();
            assertThat(buttonGroup.getChildren()).isEmpty();
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

        private @Nonnull MFXButton verifyOptionResultsInMfxButton(Option optionMock) {
            var buttonTextKey = "global.button.continue";
            doReturn(buttonTextKey).when(optionMock).getTranslationKey();

            var buttonText = "Continue";
            doReturn(buttonText).when(conversationPlayerMock).resolveTranslation(buttonTextKey);

            new Decision(singletonList(optionMock)).applyTo(conversationPlayerMock);

            ArgumentCaptor<HBox> buttonGroupCaptor = captor();
            verify(conversationGridSpy).add(buttonGroupCaptor.capture(), eq(1), eq(0));

            var buttonGroup = buttonGroupCaptor.getValue();
            assertThat(buttonGroup.getChildren())
                .hasSize(1)
                .first()
                .asInstanceOf(type(MFXButton.class))
                .extracting(MFXButton::getText)
                .isEqualTo(buttonText);

            reset(conversationPlayerMock);

            return (MFXButton) buttonGroup.getChildren().getFirst();
        }
    }
}
