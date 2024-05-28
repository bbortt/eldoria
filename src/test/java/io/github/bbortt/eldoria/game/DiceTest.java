package io.github.bbortt.eldoria.game;

import static io.github.bbortt.eldoria.game.Dice.rollD20;
import static io.github.bbortt.eldoria.game.Dice.rollD6;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;

class DiceTest {

    @Nested
    class RollD6 {

        @RepeatedTest(100)
        void rollsAtMaximum6() {
            assertThat(rollD6()).isGreaterThan(0).isLessThanOrEqualTo(6);
        }
    }

    @Nested
    class RollD20 {

        @RepeatedTest(100)
        void rollsAtMaximum20() {
            assertThat(rollD20()).isGreaterThan(0).isLessThanOrEqualTo(20);
        }
    }
}
