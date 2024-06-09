package io.github.bbortt.eldoria.game;

import static io.github.bbortt.eldoria.game.GameState.COMBAT;
import static io.github.bbortt.eldoria.game.GameState.GAME_CONFIGURATION;
import static io.github.bbortt.eldoria.game.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;

import io.github.bbortt.eldoria.game.event.StartGameEvent;
import io.github.bbortt.eldoria.game.event.StartNewGameEvent;
import io.github.bbortt.eldoria.game.event.StartTutorialEvent;
import io.github.bbortt.eldoria.game.event.StartTutorialGameEvent;
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
        void startGame() {
            var game = mock(io.github.bbortt.eldoria.domain.Game.class);

            fixture.onGameStateChangeEvent(new StartGameEvent(game));

            verify(gameMock).transitionTo(COMBAT);
            verifyNoInteractions(game);
        }

        @Test
        void startNewGame() {
            fixture.onGameStateChangeEvent(new StartNewGameEvent());

            verify(gameMock).transitionTo(GAME_CONFIGURATION);
        }

        @Test
        void startTutorial() {
            fixture.onGameStateChangeEvent(new StartTutorialEvent());

            verify(gameMock).transitionTo(TUTORIAL);
        }

        @Test
        void startTutorialGame() {
            var game = mock(io.github.bbortt.eldoria.domain.Game.class);

            fixture.onGameStateChangeEvent(new StartTutorialGameEvent(game));

            verify(gameMock).transitionTo(TUTORIAL);
            verifyNoInteractions(game);
        }
    }
}
