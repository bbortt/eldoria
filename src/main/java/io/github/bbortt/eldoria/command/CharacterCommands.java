package io.github.bbortt.eldoria.command;

import io.github.bbortt.eldoria.state.GameState;
import org.springframework.shell.Availability;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellMethodAvailability;

import static org.springframework.shell.Availability.available;
import static org.springframework.shell.Availability.unavailable;

@ShellComponent
public class CharacterCommands {

    private final GameState gameState;

    public CharacterCommands(GameState gameState) {
        this.gameState = gameState;
    }

    @ShellMethod("Display the current character stats.")
    public String stats() {
        // Initialize and start your game here
        return "Game started. What's your first move?";
    }

    @ShellMethodAvailability({"stats"})
    public  Availability isGameRunning() {
        return gameState.isInGame() ? available() : unavailable("You need to start the game first.");
    }
}
