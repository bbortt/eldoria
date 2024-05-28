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

package io.github.bbortt.eldoria.game;

import io.github.bbortt.eldoria.game.event.AbstractGameStateChangeEvent;
import io.github.bbortt.eldoria.game.event.StartNewGameEvent;
import io.github.bbortt.eldoria.game.event.StartTutorialEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class GameStateManager {

    private final Game game;

    public GameStateManager(Game game) {
        this.game = game;
    }

    @EventListener(AbstractGameStateChangeEvent.class)
    public void onGameStateChangeEvent(AbstractGameStateChangeEvent gameStateChange) {
        // TODO: This should also trigger the scene transition
        switch (gameStateChange) {
            case StartNewGameEvent startNewGameEvent -> transitionToGameState(startNewGameEvent);
            case StartTutorialEvent startTutorialEvent -> transitionToGameState(startTutorialEvent);
            default -> throw new IllegalStateException("Unexpected value: " + gameStateChange);
        }
    }

    private <T extends AbstractGameStateChangeEvent> void transitionToGameState(T gameStateChange) {
        var gameState = gameStateChange.getGameState();
        log.info("Transition to game state: {}", gameState);
        game.transitionTo(gameState);
    }
}
