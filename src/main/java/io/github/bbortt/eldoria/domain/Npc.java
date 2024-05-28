/**
 * Copyright 2024 Timon Borter
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.bbortt.eldoria.domain;

import static io.github.bbortt.eldoria.game.Dice.rollD20;
import static java.util.Arrays.stream;
import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter(PACKAGE)
@AllArgsConstructor(access = PRIVATE)
public enum Npc {
    // Frontline (Tank/Warrior)
    THANE(0, 180, 16, 16, 12, 14, 10, 10),
    // Rogue, probably
    NYSSA(1, 120, 14, 10, 16, 12, 14, 14),
    // Mage
    ELYNDOR(2, 100, 12, 8, 12, 10, 16, 14),
    // Frontline (Tank/Warrior)
    BROM(3, 200, 14, 18, 8, 16, 8, 12),
    // Cleric / Supporter
    SELENE(4, 140, 14, 10, 12, 14, 14, 16);

    private final int index;

    private final int baseMaxHP;
    private final int baseAC;
    private final int baseStrength;
    private final int baseDexterity;
    private final int baseConstitution;
    private final int baseIntelligence;
    private final int baseWisdom;

    public static Npc fromIndex(int index) {
        return stream(values()).filter(npc -> npc.index == index).findFirst().orElseThrow();
    }

    public Character createCharacter() {
        return Character.builder()
            .name(toString().charAt(0) + toString().substring(1).toLowerCase())
            .maxHP(baseMaxHP + rollD20())
            .AC(baseAC)
            .strength(baseStrength)
            .dexterity(baseDexterity)
            .constitution(baseConstitution)
            .intelligence(baseIntelligence)
            .wisdom(baseWisdom)
            .build();
    }
}
