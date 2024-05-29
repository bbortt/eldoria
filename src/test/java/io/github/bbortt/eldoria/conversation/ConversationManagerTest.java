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
import javafx.scene.layout.GridPane;
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
    private GridPane conversationGridMock;

    @Mock
    private ObservableList<Node> conversationGridChildrenMock;

    @Mock
    private SpringResourceBundle springResourceBundle;

    private ConversationManager fixture;

    @BeforeEach
    void setUp() {
        fixture = new ConversationManager(conversationGridMock, springResourceBundle);
    }

    @Nested
    class PlayConversation {

        @BeforeEach
        void beforeEachSetup() {
            doReturn(conversationGridChildrenMock).when(conversationGridMock).getChildren();
        }

        @Test
        void appliesPlayerToEachPart() throws ExecutionException, InterruptedException, TimeoutException {
            var conversationPartMock = mock(ConversationPart.class);

            Future<Void> playedConversation = fixture.playConversation(() -> singletonList(conversationPartMock));

            assertThat(playedConversation).isNotDone();

            verify(conversationGridChildrenMock).clear();

            ArgumentCaptor<ConversationManager.ConversationPlayer> conversationPlayerCaptor = captor();
            verify(conversationPartMock).applyTo(conversationPlayerCaptor.capture());

            ConversationManager.ConversationPlayer conversationPlayer = conversationPlayerCaptor.getValue();
            assertThat(conversationPlayer)
                .extracting(ConversationManager.ConversationPlayer::getConversationGrid)
                .isEqualTo(conversationGridMock);

            var translationKey = "quote";
            var translatedValue = "I can and I will.";
            doReturn(translatedValue).when(springResourceBundle).getString(translationKey);

            assertThat(conversationPlayer.resolveTranslation(translationKey)).isEqualTo(translatedValue);

            clearInvocations(conversationGridChildrenMock);

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
            verify(conversationGridChildrenMock).clear();

            conversationCompleted.get(1, SECONDS);

            assertThat(conversationCompleted).isDone();
        }
    }
}
