package io.github.bbortt.eldoria.javafx.view.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import javafx.scene.layout.Background;
import javafx.scene.layout.VBox;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class, MockitoExtension.class })
class TutorialViewControllerTest {

    @Mock
    private MessageSource messageSourceMock;

    @Mock
    private GameService gameServiceMock;

    @Mock
    private UserPreferencesService userPreferencesServiceMock;

    private TutorialViewController fixture;

    @BeforeEach
    void setUp() {
        fixture = new TutorialViewController(messageSourceMock, gameServiceMock, userPreferencesServiceMock);
    }

    @Nested
    class Initialize {

        @Test
        void configuresBackground() {
            var viewBoxMock = mock(VBox.class);
            setField(fixture, "viewBox", viewBoxMock, VBox.class);

            fixture.initialize();

            verify(viewBoxMock).setBackground(any(Background.class));
        }
    }
}
