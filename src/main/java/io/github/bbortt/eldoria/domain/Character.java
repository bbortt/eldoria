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

import static jakarta.persistence.EnumType.STRING;
import static lombok.AccessLevel.PRIVATE;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = PRIVATE)
public class Character implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    private String name;

    @Nonnull
    @Enumerated(STRING)
    private Race race;

    // Maximum hit points, determines how much health the character can have.
    @Nonnull
    private int maxHP;

    // Current hit points, indicates the character's remaining health.
    private int currentHP;

    // Armor Class, influences the difficulty for enemies to hit the character in combat.
    @Nonnull
    private int AC;

    // Affects physical damage dealt in melee combat and carrying capacity.
    @Nonnull
    private int strength;

    // Influences accuracy with ranged weapons, reflexes (initiative), and defense (AC).
    @Nonnull
    private int dexterity;

    // Determines base hit points, stamina, and resistance to harmful effects.
    @Nonnull
    private int constitution;

    // Affects spellcasting ability, problem-solving skills, and some social interactions.
    @Nonnull
    private int intelligence;

    // Influences perception, awareness, willpower (resisting spells), and some social interactions.
    @Nonnull
    private int wisdom;

    // Affects social interactions, influence on others, and inspiring allies.
    @Nonnull
    private int charisma;

    //    public void attack(Character target) {
    //        int attackRoll = rollD20() + getModifier(this.strength); // Roll d20 and add strength modifier
    //        if (attackRoll >= target.getAC()) {
    //            int damage = rollD6() + getModifier(this.strength); // Roll d6 and add strength modifier for damage
    //            target.takeDamage(damage);
    //            System.out.println(this.name + " hits " + target.getName() + " for " + damage + " damage!");
    //        } else {
    //            System.out.println(this.name + " misses " + target.getName() + "!");
    //        }
    //    }

    //    public void takeDamage(int damage) {
    //        this.currentHP -= damage;
    //        if (this.currentHP <= 0) {
    //            System.out.println(this.name + " has been defeated!");
    //        }
    //    }

    //    private int getModifier(int abilityScore) {
    //        return (abilityScore - 10) / 2;
    //    }

    public enum Race {
        HUMAN,
        DWARF,
        ELF,
        GIANT,
        HALFLING,
    }
}
