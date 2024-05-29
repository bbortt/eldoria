package io.github.bbortt.eldoria.game.event;

import static io.github.bbortt.eldoria.game.GameState.GAME_CONFIGURATION;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StartNewGameEventTest {

    private StartNewGameEvent fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new StartNewGameEvent();
    }

    @Test
    void isAbstractGameStateChangeEvent() {
        assertThat(fixture).isInstanceOf(AbstractGameStateChangeEvent.class);
    }

    @Test
    void setsGameStateToGameConfiguration() {
        assertThat(fixture).extracting(StartNewGameEvent::getGameState).isEqualTo(GAME_CONFIGURATION);
    }

    @Test
    void initialSceneIsGameConfiguration() {
        assertThat(fixture).extracting(StartNewGameEvent::getInitialScene).isEqualTo("GameConfiguration");
    }
}
