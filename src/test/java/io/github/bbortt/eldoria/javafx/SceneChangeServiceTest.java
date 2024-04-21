package io.github.bbortt.eldoria.javafx;

import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.AbstractGameStateChangeEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.testfx.framework.junit5.ApplicationExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;

@ExtendWith({ApplicationExtension.class, MockitoExtension.class})
class SceneChangeServiceTest {

    @Mock
    private ApplicationContext applicationContextMock;

    @Mock
    private ResourceBundleMessageSource messageSourceMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;


    private SceneChangeService fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new SceneChangeService(
                applicationContextMock,
                messageSourceMock,
                userPreferencesServiceMock);
    }

    @Nested
    class OnGameStateChange {

        @Test
        void throwsExceptionIfStageHasNotBeenInitializedYet() {
            var event = mock(AbstractGameStateChangeEvent.class);

            assertThatThrownBy(() -> fixture.onGameStateChange(event))
                    .isInstanceOf(IllegalArgumentException.class)
                    .hasMessage("Stage not initialized; State change came too early!");

            verifyNoInteractions(event);
        }
    }
}