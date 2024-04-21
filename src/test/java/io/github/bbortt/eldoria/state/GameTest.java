package io.github.bbortt.eldoria.state;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Component;

import static io.github.bbortt.eldoria.state.GameState.MAIN_MENU;
import static io.github.bbortt.eldoria.state.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;

class GameTest {

    private Game fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new Game();
    }

    @Test
    void isSpringComponent() {
        assertThat(Game.class)
                .hasAnnotation(Component.class);
    }

    @Test
    void defaultGameState() {
        assertThat(fixture)
                .hasFieldOrPropertyWithValue("currentState", MAIN_MENU);
    }

    @Test
    void transitionToOtherGameState() {
        var otherState = TUTORIAL;

        fixture.transitionTo(otherState);

        assertThat(fixture)
                .hasFieldOrPropertyWithValue("currentState", otherState);
    }
}
