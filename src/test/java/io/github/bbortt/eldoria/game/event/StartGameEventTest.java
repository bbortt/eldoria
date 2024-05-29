package io.github.bbortt.eldoria.game.event;

import static io.github.bbortt.eldoria.game.GameState.COMBAT;
import static org.assertj.core.api.Assertions.assertThat;

import io.github.bbortt.eldoria.domain.Game;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

class StartGameEventTest {

    @Mock
    private Game gameMock;

    private StartGameEvent fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new StartGameEvent(gameMock);
    }

    @Test
    void isAbstractGameStateChangeEvent() {
        assertThat(fixture).isInstanceOf(AbstractGameStateChangeEvent.class);
    }

    @Test
    void setsGameStateToCombat() {
        assertThat(fixture).extracting(StartGameEvent::getGameState).isEqualTo(COMBAT);
    }

    @Test
    void initialSceneIsArena() {
        assertThat(fixture).extracting(StartGameEvent::getInitialScene).isEqualTo("Arena");
    }
}
