package io.github.bbortt.eldoria.javafx.view.controller;

import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static io.github.bbortt.eldoria.domain.Npc.ELYNDOR;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.util.ReflectionTestUtils.setField;
import static org.testfx.util.WaitForAsyncUtils.waitForFxEvents;

import io.github.bbortt.eldoria.conversation.tutorial.TutorialConversation;
import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import java.util.Locale;
import javafx.scene.layout.Background;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class TutorialViewControllerTest {

    @Mock
    private MessageSource messageSourceMock;

    @Mock
    private GameService gameServiceMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;

    @Mock
    private BorderPane viewBoxMock;

    private TutorialViewController fixture;

    @BeforeEach
    void setUp() {
        fixture = new TutorialViewController(messageSourceMock, gameServiceMock, userPreferencesServiceMock);

        setField(fixture, "viewBox", viewBoxMock, BorderPane.class);
        setField(fixture, "conversationGrid", new GridPane(), GridPane.class);
    }

    @Test
    void hasConfiguredTutorialConversation() {
        assertThat(fixture).hasNoNullFieldsOrProperties();
    }

    @Nested
    class Initialize {

        UserPreferences userPreferences;

        @BeforeEach
        void setUp() {
            userPreferences = new UserPreferences();
            doReturn(userPreferences).when(userPreferencesServiceMock).loadUserPreferences();
        }

        @Test
        void configuresBackground() {
            userPreferences.setLocale("en_US");

            doReturn("Welcome, welcome!")
                .when(messageSourceMock)
                .getMessage(
                    argThat(string -> string.equals("tutorial.welcome.introduction") || string.equals("global.button.continue")),
                    isNull(),
                    any(Locale.class)
                );

            fixture.initialize();

            verify(viewBoxMock).setBackground(any(Background.class));
        }

        @Test
        void startsGameAfterwards() {
            var tutorialConversationMock = mock(TutorialConversation.class);
            doReturn(conversationEnd().get()).when(tutorialConversationMock).get();

            var playerName = "Parzival";
            doReturn(playerName).when(tutorialConversationMock).getPlayerName();

            doReturn(singletonList(2)).when(tutorialConversationMock).getPartyDecision();

            setField(fixture, "conversation", tutorialConversationMock, TutorialConversation.class);

            fixture.initialize();

            waitForFxEvents();

            verify(gameServiceMock).startNewGame(playerName, singletonList(ELYNDOR));
            verify(userPreferencesServiceMock).setTutorialFinished();
        }
    }
}
