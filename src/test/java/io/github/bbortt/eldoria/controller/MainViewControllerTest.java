package io.github.bbortt.eldoria.controller;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.StartNewGameEvent;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.Background;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.testfx.framework.junit5.ApplicationExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;

@ExtendWith({ApplicationExtension.class, MockitoExtension.class})
class MainViewControllerTest {

    @Mock
    private ApplicationEventPublisher applicationEventPublisherMock;

    @Mock
    private GameService gameServiceMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;

    private MainViewController fixture;

    @BeforeEach
    void setUp() {
        fixture = new MainViewController(applicationEventPublisherMock, gameServiceMock, userPreferencesServiceMock);
    }

    @Nested
    class Initialize {

        @Test
        void configuresBackground() {
            var mainViewMock = mock(VBox.class);
            setField(fixture, "mainView", mainViewMock, VBox.class);

            fixture.initialize();

            verify(mainViewMock).setBackground(any(Background.class));
        }
    }

    @Nested
    class HandleStartGame {

        @Test
        void publishGoToMainMenuEventIfUserHasPlayedTutorial() {
            var userPreferences = mock(UserPreferences.class);
            doReturn(true).when(userPreferences).hasPlayedTutorial();
            doReturn(userPreferences).when(userPreferencesServiceMock).loadUserPreferences();

            fixture.handleStartGame();

            verify(applicationEventPublisherMock).publishEvent(any(StartNewGameEvent.class));
        }

        @Test
        void publishStartTutorialEventIfUserHasNotPlayedTutorial() {
            var userPreferences = mock(UserPreferences.class);
            when(userPreferences.hasPlayedTutorial()).thenReturn(false);
            when(userPreferencesServiceMock.loadUserPreferences()).thenReturn(userPreferences);

            fixture.handleStartGame();

            verify(applicationEventPublisherMock).publishEvent(any(StartTutorialEvent.class));
        }
    }

    @Nested
    class HandleExitGame {

        @Test
        void closeStage() {
            var exitButtonMock = mock(Button.class);
            setField(fixture, "exitButton", exitButtonMock, Button.class);

            var sceneNodeMock = mock(Scene.class);
            doReturn(sceneNodeMock).when(exitButtonMock).getScene();

            var stageMock = mock(Stage.class);
            doReturn(stageMock).when(sceneNodeMock).getWindow();

            fixture.handleExitGame();

            verify(stageMock).close();
        }
    }
}
