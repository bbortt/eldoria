package io.github.bbortt.eldoria.game.event;

import static io.github.bbortt.eldoria.game.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class StartTutorialEventTest {

    private StartTutorialEvent fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new StartTutorialEvent();
    }

    @Test
    void isAbstractGameStateChangeEvent() {
        assertThat(fixture).isInstanceOf(AbstractGameStateChangeEvent.class);
    }

    @Test
    void setsGameStateToTutorial() {
        assertThat(fixture).extracting(StartTutorialEvent::getGameState).isEqualTo(TUTORIAL);
    }

    @Test
    void containsInitialScene() {
        assertThat(fixture).extracting(StartTutorialEvent::getInitialScene).isEqualTo("Tutorial");
    }
}
