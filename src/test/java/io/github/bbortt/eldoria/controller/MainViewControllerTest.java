package io.github.bbortt.eldoria.controller;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.GoToMainMenuEvent;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import javafx.event.ActionEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class MainViewControllerTest {

    @Mock
    private ApplicationEventPublisher applicationEventPublisherMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;

    private MainViewController fixture;

    @BeforeEach
    void setUp() {
        fixture = new MainViewController(applicationEventPublisherMock, userPreferencesServiceMock);
    }

    @Test
    void whenUserHasPlayedTutorial_thenPublishGoToMainMenuEvent() {
        var userPreferences = mock(UserPreferences.class);
        doReturn(true).when(userPreferences).hasPlayedTutorial();
        doReturn(userPreferences).when(userPreferencesServiceMock).loadUserPreferences();

        fixture.handleStartGame(mock(ActionEvent.class));

        verify(applicationEventPublisherMock).publishEvent(any(GoToMainMenuEvent.class));
    }

    @Test
    void whenUserHasNotPlayedTutorial_thenPublishStartTutorialEvent() {
        var userPreferences = mock(UserPreferences.class);
        when(userPreferences.hasPlayedTutorial()).thenReturn(false);
        when(userPreferencesServiceMock.loadUserPreferences()).thenReturn(userPreferences);

        fixture.handleStartGame(mock(ActionEvent.class));

        verify(applicationEventPublisherMock).publishEvent(any(StartTutorialEvent.class));
    }
}
