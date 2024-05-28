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

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Character {

    @Id
    private String name;

    private int maxHP;
    private int currentHP;
    private int AC;
    private int strength;
    private int dexterity;
    private int constitution;
    private int intelligence;
    private int wisdom;
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
}
