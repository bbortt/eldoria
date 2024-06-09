package io.github.bbortt.eldoria.service;

import static io.github.bbortt.eldoria.domain.Character.Race.HUMAN;
import static io.github.bbortt.eldoria.domain.Npc.BROM;
import static io.github.bbortt.eldoria.domain.Npc.THANE;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;

import io.github.bbortt.eldoria.domain.Game;
import io.github.bbortt.eldoria.domain.repository.GameRepository;
import io.github.bbortt.eldoria.game.event.StartGameEvent;
import io.github.bbortt.eldoria.game.event.StartTutorialGameEvent;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;

@ExtendWith({ MockitoExtension.class })
class GameServiceTest {

    @Mock
    private ApplicationEventPublisher applicationEventPublisherMock;

    @Mock
    private GameRepository gameRepositoryMock;

    private GameService fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new GameService(applicationEventPublisherMock, gameRepositoryMock);
    }

    @Nested
    class HasSavedAnyGames {

        static Stream<Long> returnsFalseIfCountIsLessThanOrEqualToZero() {
            return Stream.of(0L, -1L);
        }

        @Test
        void returnsTrueIfCountIsGreaterThanZero() {
            doReturn(1L).when(gameRepositoryMock).count();

            var result = fixture.hasSavedAnyGames();

            assertTrue(result);
        }

        @MethodSource
        @ParameterizedTest
        void returnsFalseIfCountIsLessThanOrEqualToZero(long count) {
            doReturn(count).when(gameRepositoryMock).count();

            var result = fixture.hasSavedAnyGames();

            assertFalse(result);
        }
    }

    @Nested
    class StartNewGame {

        @Test
        void persistsNewGame() {
            var playerName = "Bruce Vayne";
            var npcs = List.of(THANE, BROM);

            fixture.startNewGame(playerName, HUMAN, npcs);

            ArgumentCaptor<Game> gameArgumentCaptor = verifyGameHasBeenPersisted(playerName);

            ArgumentCaptor<StartGameEvent> startGameEventArgumentCaptor = captor();
            verify(applicationEventPublisherMock).publishEvent(startGameEventArgumentCaptor.capture());

            assertThat(startGameEventArgumentCaptor.getValue())
                .isNotNull()
                .extracting(StartGameEvent::getGame)
                .isEqualTo(gameArgumentCaptor.getValue());
        }
    }

    @Nested
    class StartNewTutorialGame {

        @Test
        void persistsNewGame() {
            var playerName = "Bruce Vayne";
            var npcs = List.of(THANE, BROM);

            fixture.startNewTutorialGame(playerName, HUMAN, npcs);

            ArgumentCaptor<Game> gameArgumentCaptor = verifyGameHasBeenPersisted(playerName);

            ArgumentCaptor<StartTutorialGameEvent> startTutorialGameEventArgumentCaptor = captor();
            verify(applicationEventPublisherMock).publishEvent(startTutorialGameEventArgumentCaptor.capture());

            assertThat(startTutorialGameEventArgumentCaptor.getValue())
                .isNotNull()
                .extracting(StartTutorialGameEvent::getGame)
                .isEqualTo(gameArgumentCaptor.getValue());
        }
    }

    private ArgumentCaptor<Game> verifyGameHasBeenPersisted(String playerName) {
        ArgumentCaptor<Game> gameArgumentCaptor = captor();
        verify(gameRepositoryMock).save(gameArgumentCaptor.capture());

        assertThat(gameArgumentCaptor.getValue())
            .isNotNull()
            .satisfies(
                g -> assertThat(g.getCharacter().getName()).isEqualTo(playerName),
                g ->
                    assertThat(g.getNpcs()).satisfiesExactlyInAnyOrder(
                        n -> assertThat(n.getName()).isEqualTo("Brom"),
                        n -> assertThat(n.getName()).isEqualTo("Thane")
                    )
            );
        return gameArgumentCaptor;
    }
}
