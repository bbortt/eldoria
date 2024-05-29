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

package io.github.bbortt.eldoria.service;

import static java.util.stream.Collectors.toSet;

import io.github.bbortt.eldoria.domain.Character;
import io.github.bbortt.eldoria.domain.Game;
import io.github.bbortt.eldoria.domain.Npc;
import io.github.bbortt.eldoria.domain.repository.GameRepository;
import io.github.bbortt.eldoria.game.event.StartGameEvent;
import java.util.List;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final ApplicationEventPublisher applicationEventPublisher;
    private final GameRepository gameRepository;

    public GameService(ApplicationEventPublisher applicationEventPublisher, GameRepository gameRepository) {
        this.applicationEventPublisher = applicationEventPublisher;
        this.gameRepository = gameRepository;
    }

    public boolean hasSavedAnyGames() {
        return gameRepository.count() > 0;
    }

    public void startNewGame(String playerName, List<Npc> alies) {
        var game = Game.builder()
            .character(Character.builder().name(playerName).build())
            .npcs(alies.stream().map(Npc::createCharacter).collect(toSet()))
            .build();

        gameRepository.save(game);

        applicationEventPublisher.publishEvent(new StartGameEvent(game));
    }
}
