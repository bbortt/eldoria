package io.github.bbortt.eldoria.domain;

import static io.github.bbortt.eldoria.domain.Npc.BROM;
import static io.github.bbortt.eldoria.domain.Npc.ELYNDOR;
import static io.github.bbortt.eldoria.domain.Npc.NYSSA;
import static io.github.bbortt.eldoria.domain.Npc.SELENE;
import static io.github.bbortt.eldoria.domain.Npc.THANE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.params.provider.Arguments.arguments;

import java.util.stream.Stream;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.MethodSource;

class NpcTest {

    @ParameterizedTest
    @EnumSource(Npc.class)
    void fromIndex(Npc npc) {
        assertThat(Npc.fromIndex(npc.getIndex())).isEqualTo(npc);
    }

    public static Stream<Arguments> createCharacter() {
        return Stream.of(
            arguments(THANE, "Thane"),
            arguments(NYSSA, "Nyssa"),
            arguments(ELYNDOR, "Elyndor"),
            arguments(BROM, "Brom"),
            arguments(SELENE, "Selene")
        );
    }

    @MethodSource
    @ParameterizedTest
    void createCharacter(Npc npc, String name) {
        // Combination of parameterized and repeated test is not possible - we're faking it!
        for (int i = 0; i < 100; i++) {
            var character = npc.createCharacter();

            assertThat(character).hasNoNullFieldsOrProperties();
            assertThat(character.getName()).isEqualTo(name);
            assertThat(character.getMaxHP()).isGreaterThan(npc.getBaseMaxHP()).isLessThanOrEqualTo(npc.getBaseMaxHP() + 20);
        }
    }
}
