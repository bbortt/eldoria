package io.github.bbortt.eldoria.state.event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.github.bbortt.eldoria.state.GameState.GAME_CONFIGURATION;
import static org.assertj.core.api.Assertions.assertThat;

class StartNewGameEventTest {

    private StartNewGameEvent fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new StartNewGameEvent();
    }

    @Test
    void isAbstractGameStateChangeEvent() {
        assertThat(fixture)
                .isInstanceOf(AbstractGameStateChangeEvent.class);
    }

    @Test
    void setsGameStateToTutorial() {
        assertThat(fixture)
                .extracting(StartNewGameEvent::getGameState)
                .isEqualTo(GAME_CONFIGURATION);
    }

    @Test
    void initialSceneIsMainView() {
        assertThat(fixture)
                .extracting(StartNewGameEvent::getInitialScene)
                .isEqualTo("GameConfiguration");
    }
}
