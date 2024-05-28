package io.github.bbortt.eldoria.card;

import static io.github.bbortt.eldoria.card.Rarity.COMMON;
import static io.github.bbortt.eldoria.card.Rarity.EPIC;
import static io.github.bbortt.eldoria.card.Rarity.LEGENDARY;
import static io.github.bbortt.eldoria.card.Rarity.NORMAL;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.EnumMap;
import java.util.Map;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

class RarityTest {

    @Test
    void containsFourLevels() {
        assertThat(Rarity.values()).containsExactly(COMMON, NORMAL, EPIC, LEGENDARY);
    }

    @Nested
    class getRandomRarity {

        @RepeatedTest(100)
        void isDistributedAccordingToProbabilities() {
            Map<Rarity, Integer> rarityCounts = new EnumMap<>(Rarity.class);
            final int iterations = 1000; // Large number for statistical significance

            // Initialize counts
            for (Rarity rarity : Rarity.values()) {
                rarityCounts.put(rarity, 0);
            }

            // Run getRandomRarity many times and count occurrences
            for (int i = 0; i < iterations; i++) {
                Rarity rarity = Rarity.getRandomRarity();
                rarityCounts.put(rarity, rarityCounts.get(rarity) + 1);
            }

            // Check that all rarities were hit
            assertThat(rarityCounts.values()).allMatch(count -> count > 0, "All rarities should be selected at least once.");

            // Check distribution
            assertThat(rarityCounts.get(COMMON))
                .as("COMMON frequency")
                .isLessThan(rarityCounts.get(NORMAL))
                .isGreaterThan(rarityCounts.get(EPIC))
                .isGreaterThan(rarityCounts.get(LEGENDARY));

            assertThat(rarityCounts.get(NORMAL))
                .as("NORMAL frequency")
                .isGreaterThan(rarityCounts.get(EPIC))
                .isGreaterThan(rarityCounts.get(LEGENDARY));

            assertThat(rarityCounts.get(EPIC)).as("EPIC frequency").isGreaterThan(rarityCounts.get(LEGENDARY));
        }
    }
}
