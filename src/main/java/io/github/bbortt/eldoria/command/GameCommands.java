package io.github.bbortt.eldoria.command;

import io.github.bbortt.eldoria.state.GameState;
import org.springframework.shell.Availability;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellMethodAvailability;

import static org.springframework.shell.Availability.available;
import static org.springframework.shell.Availability.unavailable;

@ShellComponent
public class GameCommands {

    private final GameState gameState;

    public GameCommands(GameState gameState) {
        this.gameState = gameState;
    }

    @ShellMethod("Starts the game.")
    @ShellMethodAvailability("isInHomeScreen")
    public String start() {
        // Initialize and start your game here
        return "Game started. What's your first move?";
    }

    @ShellMethod("Exits the game.")
    @ShellMethodAvailability("isGameRunning")
    public String exit() {
        // Perform any cleanup or save game state before exiting
        return "Thanks for playing!";
    }

    public Availability isInHomeScreen() {
        return gameState.isInGame() ? unavailable("You are already in game!."): available();
    }

    public Availability isGameRunning() {
        return gameState.isInGame() ? available() : unavailable("You need to start the game first.");
    }
}
