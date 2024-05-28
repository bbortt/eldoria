package io.github.bbortt.eldoria.conversation;

import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static java.util.Collections.singletonList;
import static java.util.concurrent.TimeUnit.SECONDS;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.clearInvocations;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import io.github.bbortt.eldoria.i18n.SpringResourceBundle;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeoutException;
import javafx.collections.ObservableList;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class ConversationManagerTest {

    @Mock
    private Label labelMock;

    @Mock
    private VBox actionContainerMock;

    @Mock
    private ObservableList<Node> actionContainerChildrenMock;

    @Mock
    private SpringResourceBundle springResourceBundle;

    private ConversationManager fixture;

    @BeforeEach
    void setUp() {
        fixture = new ConversationManager(labelMock, actionContainerMock, springResourceBundle);
    }

    @Nested
    class PlayConversation {

        @BeforeEach
        void beforeEachSetup() {
            doReturn(actionContainerChildrenMock).when(actionContainerMock).getChildren();
        }

        @Test
        void appliesPlayerToEachPart() throws ExecutionException, InterruptedException, TimeoutException {
            var conversationPartMock = mock(ConversationPart.class);

            Future<Void> playedConversation = fixture.playConversation(() -> singletonList(conversationPartMock));

            assertThat(playedConversation).isNotDone();

            verify(labelMock).setText("");
            verify(actionContainerChildrenMock).clear();

            ArgumentCaptor<ConversationManager.ConversationPlayer> conversationPlayerCaptor = captor();
            verify(conversationPartMock).applyTo(conversationPlayerCaptor.capture());

            ConversationManager.ConversationPlayer conversationPlayer = conversationPlayerCaptor.getValue();
            assertThat(conversationPlayer).satisfies(
                p -> assertThat(p).extracting(ConversationManager.ConversationPlayer::getConversationText).isEqualTo(labelMock),
                p -> assertThat(p).extracting(ConversationManager.ConversationPlayer::getActionContainer).isEqualTo(actionContainerMock)
            );

            var translationKey = "quote";
            var translatedValue = "I can and I will.";
            doReturn(translatedValue).when(springResourceBundle).getString(translationKey);

            assertThat(conversationPlayer.resolveTranslation(translationKey)).isEqualTo(translatedValue);

            clearInvocations(labelMock, actionContainerChildrenMock);

            conversationPlayer.continueWith(conversationEnd());

            verifyConversationCompletes(playedConversation);
        }

        @Test
        @Timeout(5)
        void conversationEndResolvesFuture() throws ExecutionException, InterruptedException, TimeoutException {
            verifyConversationCompletes(fixture.playConversation(conversationEnd()));
        }

        private void verifyConversationCompletes(Future<Void> conversationCompleted)
            throws InterruptedException, ExecutionException, TimeoutException {
            verify(labelMock).setText("");
            verify(actionContainerChildrenMock).clear();

            conversationCompleted.get(1, SECONDS);

            assertThat(conversationCompleted).isDone();
        }
    }
}
