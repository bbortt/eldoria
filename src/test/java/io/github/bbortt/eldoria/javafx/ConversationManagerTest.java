package io.github.bbortt.eldoria.javafx;

import io.github.bbortt.eldoria.conversation.ContinueButtonOption;
import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Text;
import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

import java.util.List;
import java.util.concurrent.Future;

import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;

@ExtendWith({ApplicationExtension.class, MockitoExtension.class})
class ConversationManagerTest {

    @Mock
    private Label labelMock;

    @Mock
    private VBox buttonContainerMock;

    @Mock
    private ObservableList buttonContainerChildrenMock;

    @Mock
    private SpringResourceBundle springResourceBundle;

    private ConversationManager fixture;

    private String currentText = "";

    @BeforeEach
    void setUp() {
        doAnswer(invocationOnMock -> currentText = invocationOnMock.getArgument(0)).when(labelMock).setText(anyString());

        doReturn(buttonContainerChildrenMock).when(buttonContainerMock).getChildren();

        fixture = new ConversationManager(labelMock, buttonContainerMock, springResourceBundle);
    }

    @Nested
    class PlayConversation {

        @Test
        void singleTextPart() {
            var translationKey = "tutorial.welcome.introduction";
            var translatedText = "Welcome to the Eldoria tutorial!";

            doAnswer(invocationOnMock -> currentText).when(labelMock).getText();

            doReturn(translatedText).when(springResourceBundle).getString(translationKey);

            Conversation conversation = () -> List.of(new Text(translationKey));

            Future<Void> playedConversation = fixture.playConversation(conversation);
            assertThat(playedConversation)
                    .isNotDone();

            assertThat(currentText)
                    .isEqualTo(translatedText);

            verify(buttonContainerMock).getChildren();
            verifyNoMoreInteractions(buttonContainerMock);

            verify(buttonContainerChildrenMock).clear();
            verifyNoMoreInteractions(buttonContainerChildrenMock);
        }

        @Test
        void decisionWithContinueOption() {
            var buttonTextKey = "global.button.continue";
            var buttonText = "Continue";
            var nextTextKey = "tutorial.welcome.character-introduction";
            var nextText = "You are a brave adventurer...";

            doAnswer(invocationOnMock -> currentText).when(labelMock).getText();

            doReturn(buttonText).when(springResourceBundle).getString(buttonTextKey);

            Conversation conversation = () -> List.of(
                    new Decision(List.of(
                            new ContinueButtonOption(() -> List.of(new Text(nextTextKey)))
                    ))
            );

            Future<Void> playedConversation = fixture.playConversation(conversation);
            assertThat(playedConversation)
                    .isNotDone();

            assertThat(currentText)
                    .isEmpty();

            verify(buttonContainerMock, times(2)).getChildren();
            verifyNoMoreInteractions(buttonContainerMock);

            ArgumentCaptor<MFXButton> buttonCaptor = captor();
            verify(buttonContainerChildrenMock).add(buttonCaptor.capture());

            assertThat(buttonCaptor.getValue())
                    .extracting(MFXButton::getText)
                    .isEqualTo(buttonText);

            doReturn(nextText).when(springResourceBundle).getString(nextTextKey);
            buttonCaptor.getValue().getOnAction().handle(mock(ActionEvent.class));

            assertThat(currentText)
                    .isEqualTo(nextText);
        }

        @Test
        void conversationEndResolvesFuture() {
            var conversation = conversationEnd();

            Future<Void> playedConversation = fixture.playConversation(conversation);
            assertThat(playedConversation)
                    .isDone();
        }
    }
}
