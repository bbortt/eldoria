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
