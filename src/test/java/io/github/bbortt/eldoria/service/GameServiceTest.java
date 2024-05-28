package io.github.bbortt.eldoria.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doReturn;

import io.github.bbortt.eldoria.domain.repository.GameRepository;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith({ MockitoExtension.class })
class GameServiceTest {

    @Mock
    private GameRepository gameRepositoryMock;

    private GameService fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new GameService(gameRepositoryMock);
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
}
