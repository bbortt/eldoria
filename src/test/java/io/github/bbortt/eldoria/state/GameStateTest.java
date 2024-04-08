package io.github.bbortt.eldoria.state;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.params.provider.EnumSource.Mode.EXCLUDE;
import static org.junit.jupiter.params.provider.EnumSource.Mode.INCLUDE;

class GameStateTest {

    @ParameterizedTest
    @EnumSource(value = GameState.class, names = {"COMBAT"}, mode = INCLUDE)
    void testIsInGamePositive(GameState gameState) {
        assertTrue(GameState.isInGame(gameState), "GameState should be considered 'in game' when in COMBAT state");
    }

    @ParameterizedTest
    @EnumSource(value = GameState.class, names = {"COMBAT"}, mode = EXCLUDE)
    void testIsInGameNegative(GameState gameState) {
        assertFalse(GameState.isInGame(gameState), "GameState should not be considered 'in game' for states other than COMBAT");
    }
}
