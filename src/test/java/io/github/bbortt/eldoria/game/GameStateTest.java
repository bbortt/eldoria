package io.github.bbortt.eldoria.game;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.params.provider.EnumSource.Mode.EXCLUDE;
import static org.junit.jupiter.params.provider.EnumSource.Mode.INCLUDE;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

class GameStateTest {

    @ParameterizedTest
    @EnumSource(value = GameState.class, names = { "COMBAT" }, mode = INCLUDE)
    void isInGame(GameState gameState) {
        assertTrue(GameState.isInGame(gameState), "GameState should be considered 'in game' when in COMBAT state");
    }

    @ParameterizedTest
    @EnumSource(value = GameState.class, names = { "COMBAT" }, mode = EXCLUDE)
    void isNotInGame(GameState gameState) {
        assertFalse(GameState.isInGame(gameState), "GameState should not be considered 'in game' for states other than COMBAT");
    }
}
