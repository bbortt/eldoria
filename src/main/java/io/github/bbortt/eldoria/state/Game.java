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

package io.github.bbortt.eldoria.state;

import lombok.Getter;
import org.springframework.stereotype.Component;

import static io.github.bbortt.eldoria.state.GameState.MAIN_MENU;

@Getter
@Component
public final class Game {

    private GameState currentState;

    public Game() {
        this.currentState = MAIN_MENU;
    }

    synchronized void transitionTo(GameState gameState) {
        // TODO: validation could be added
        this.currentState = gameState;
    }
}
