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

import io.github.bbortt.eldoria.state.Game;
import org.springframework.core.env.Environment;
import org.springframework.shell.Availability;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellMethodAvailability;

import static org.springframework.shell.Availability.available;
import static org.springframework.shell.Availability.unavailable;

@ShellComponent
public class DevCommands {

    private final Environment environment;
    private final Game game;

    public DevCommands(Environment environment, Game game) {
        this.environment = environment;
        this.game = game;
    }

    @ShellMethod("Displays the current game state.")
    public String state() {
        return "Current state: " + game.getCurrentState();
    }

    @ShellMethodAvailability
    public Availability isInDevMode() {
        return environment.matchesProfiles("dev") ? available() : unavailable("This application has not been started in 'dev' mode.");
    }
}
