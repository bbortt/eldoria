package io.github.bbortt.eldoria.state.event;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.github.bbortt.eldoria.state.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;

class StartTutorialEventTest {

    private StartTutorialEvent fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new StartTutorialEvent();
    }

    @Test
    void isAbstractGameStateChangeEvent() {
        assertThat(fixture)
                .isInstanceOf(AbstractGameStateChangeEvent.class);
    }

    @Test
    void setsGameStateToTutorial() {
        assertThat(fixture)
                .extracting(StartTutorialEvent::getGameState)
                .isEqualTo(TUTORIAL);
    }

    @Test
    void containsInitialScene() {
        assertThat(fixture)
                .extracting(StartTutorialEvent::getInitialScene)
                .isEqualTo("Tutorial");
    }
}
