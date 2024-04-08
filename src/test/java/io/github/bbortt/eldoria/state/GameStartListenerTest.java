package io.github.bbortt.eldoria.state;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.GoToMainMenuEvent;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationEventPublisher;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class GameStartListenerTest {

    @Mock
    private ApplicationEventPublisher applicationEventPublisherMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;

    @Captor
    private ArgumentCaptor<Object> eventCaptor;

    private GameStartListener fixture;

    @BeforeEach
    void setUp() {
        fixture = new GameStartListener(applicationEventPublisherMock, userPreferencesServiceMock);
    }

    @Test
    void allArgsConstructor() {
        assertThat(fixture)
                .hasFieldOrPropertyWithValue("applicationEventPublisher", applicationEventPublisherMock)
                .hasFieldOrPropertyWithValue("userPreferencesService", userPreferencesServiceMock);
    }

    @Test
    void whenUserHasPlayedTutorial_thenPublishGoToMainMenuEvent() {
        var userPreferences = mock(UserPreferences.class);
        when(userPreferences.hasPlayedTutorial()).thenReturn(true);
        when(userPreferencesServiceMock.loadUserPreferences()).thenReturn(userPreferences);

        fixture.onApplicationEvent(mock(ApplicationStartedEvent.class));

        verify(applicationEventPublisherMock).publishEvent(eventCaptor.capture());
        assertInstanceOf(GoToMainMenuEvent.class, eventCaptor.getValue(), "Should publish GoToMainMenuEvent");
    }

    @Test
    void whenUserHasNotPlayedTutorial_thenPublishStartTutorialEvent() {
        var userPreferences = mock(UserPreferences.class);
        when(userPreferences.hasPlayedTutorial()).thenReturn(false);
        when(userPreferencesServiceMock.loadUserPreferences()).thenReturn(userPreferences);

        fixture.onApplicationEvent(mock(ApplicationStartedEvent.class));

        verify(applicationEventPublisherMock).publishEvent(eventCaptor.capture());
        assertInstanceOf(StartTutorialEvent.class, eventCaptor.getValue(), "Should publish StartTutorialEvent");
    }
}