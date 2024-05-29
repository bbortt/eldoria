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
    THANE(0, 180, Character.builder().AC(16).strength(16).dexterity(12).constitution(14).intelligence(10).wisdom(10)),
    // Rogue, probably
    NYSSA(1, 120, Character.builder().AC(14).strength(10).dexterity(16).constitution(12).intelligence(14).wisdom(14)),
    // Mage
    ELYNDOR(2, 100, Character.builder().AC(12).strength(8).dexterity(12).constitution(10).intelligence(16).wisdom(14)),
    // Frontline (Tank/Warrior)
    BROM(3, 200, Character.builder().AC(14).strength(18).dexterity(8).constitution(16).intelligence(8).wisdom(12)),
    // Cleric / Supporter
    SELENE(4, 140, Character.builder().AC(14).strength(10).dexterity(12).constitution(14).intelligence(14).wisdom(16));

    private final int index;

    private final int baseMaxHP;
    private final Character.CharacterBuilder characterBuilder;

    public static Npc fromIndex(int index) {
        return stream(values()).filter(npc -> npc.index == index).findFirst().orElseThrow();
    }

    public Character createCharacter() {
        return characterBuilder.name(toString().charAt(0) + toString().substring(1).toLowerCase()).maxHP(baseMaxHP + rollD20()).build();
    }
}
