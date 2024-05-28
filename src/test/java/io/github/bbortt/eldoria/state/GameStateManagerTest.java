package io.github.bbortt.eldoria.state;

import static io.github.bbortt.eldoria.state.GameState.GAME_CONFIGURATION;
import static io.github.bbortt.eldoria.state.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

import io.github.bbortt.eldoria.state.event.StartNewGameEvent;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.stereotype.Component;

@ExtendWith({ MockitoExtension.class })
class GameStateManagerTest {

    @Mock
    private Game gameMock;

    private GameStateManager fixture;

    @BeforeEach
    void setUp() {
        fixture = new GameStateManager(gameMock);
    }

    @Test
    void isSpringComponent() {
        assertThat(GameStateManager.class).hasAnnotation(Component.class);
    }

    @Nested
    class OnGameStateChangeEvent {

        @Test
        void startNewGame() {
            // Simulate the main menu event
            fixture.onGameStateChangeEvent(new StartNewGameEvent());

            // Verify the transitionTo method was called with MAIN_MENU
            verify(gameMock).transitionTo(GAME_CONFIGURATION);
        }

        @Test
        void startTutorial() {
            // Simulate the start tutorial event
            fixture.onGameStateChangeEvent(new StartTutorialEvent());

            // Verify the transitionTo method was called with TUTORIAL
            verify(gameMock).transitionTo(TUTORIAL);
        }
    }
}
