package io.github.bbortt.eldoria.game;

import java.util.concurrent.ThreadLocalRandom;
import lombok.Data;

@Data
public class Character {

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

    public void attack(Character target) {
        int attackRoll = rollD20() + getModifier(this.strength); // Roll d20 and add strength modifier
        if (attackRoll >= target.getAC()) {
            int damage = rollD6() + getModifier(this.strength); // Roll d6 and add strength modifier for damage
            target.takeDamage(damage);
            System.out.println(this.name + " hits " + target.getName() + " for " + damage + " damage!");
        } else {
            System.out.println(this.name + " misses " + target.getName() + "!");
        }
    }

    // Method to take damage
    public void takeDamage(int damage) {
        this.currentHP -= damage;
        if (this.currentHP <= 0) {
            System.out.println(this.name + " has been defeated!");
        }
    }

    // Helper method to roll a d20
    private int rollD20() {
        return (int) (ThreadLocalRandom.current().nextDouble() * 20) + 1;
    }

    // Helper method to roll a d6
    private int rollD6() {
        return (int) (ThreadLocalRandom.current().nextDouble() * 6) + 1;
    }

    // Helper method to calculate ability modifier
    private int getModifier(int abilityScore) {
        return (abilityScore - 10) / 2;
    }
}
