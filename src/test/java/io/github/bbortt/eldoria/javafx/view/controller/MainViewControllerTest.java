package io.github.bbortt.eldoria.javafx.view.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.StartNewGameEvent;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.scene.Scene;
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

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
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
            var viewBoxMock = mock(VBox.class);
            setField(fixture, "viewBox", viewBoxMock, VBox.class);

            fixture.initialize();

            verify(viewBoxMock).setBackground(any(Background.class));
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
            var exitButtonMock = mock(MFXButton.class);
            setField(fixture, "exitButton", exitButtonMock, MFXButton.class);

            var sceneNodeMock = mock(Scene.class);
            doReturn(sceneNodeMock).when(exitButtonMock).getScene();

            var stageMock = mock(Stage.class);
            doReturn(stageMock).when(sceneNodeMock).getWindow();

            fixture.handleExitGame();

            verify(stageMock).close();
        }
    }
}
