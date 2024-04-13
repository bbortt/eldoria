package io.github.bbortt.eldoria.state;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.stereotype.Component;

import static io.github.bbortt.eldoria.state.GameState.MAIN_MENU;
import static io.github.bbortt.eldoria.state.GameState.TUTORIAL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith({MockitoExtension.class})
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
        assertThat(GameStateManager.class)
                .hasAnnotation(Component.class);
    }

    @Test
    void testGoToMainMenu() {
        // Simulate the main menu event
        fixture.goToMainMenu();

        // Verify the transitionTo method was called with MAIN_MENU
        verify(gameMock).transitionTo(MAIN_MENU);
    }

    @Test
    void testStartTutorial() {
        // Simulate the start tutorial event
        fixture.startTutorial();

        // Verify the transitionTo method was called with TUTORIAL
        verify(gameMock).transitionTo(TUTORIAL);
    }
}
