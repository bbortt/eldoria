package io.github.bbortt.eldoria.javafx.view.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.service.GameService;
import io.github.bbortt.eldoria.service.UserPreferencesService;
import java.util.Locale;
import javafx.collections.ObservableList;
import javafx.scene.Node;
import javafx.scene.control.Label;
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

    @Mock
    private VBox viewBoxMock;

    @Mock
    public Label tutorialTextMock;

    @Mock
    public VBox actionContainerMock;

    @Mock
    private ObservableList<Node> actionContainerChildrenMock;

    private TutorialViewController fixture;

    @BeforeEach
    void setUp() {
        fixture = new TutorialViewController(messageSourceMock, gameServiceMock, userPreferencesServiceMock);

        setField(fixture, "viewBox", viewBoxMock, VBox.class);
        setField(fixture, "tutorialText", tutorialTextMock, Label.class);
        setField(fixture, "actionContainer", actionContainerMock, VBox.class);
    }

    @Nested
    class Initialize {

        @BeforeEach
        void setUp() {
            doReturn(actionContainerChildrenMock).when(actionContainerMock).getChildren();
        }

        @Test
        void configuresBackground() {
            var userPreferences = new UserPreferences();
            doReturn(userPreferences).when(userPreferencesServiceMock).loadUserPreferences();

            doReturn("Welcome, welcome!")
                .when(messageSourceMock)
                .getMessage(
                    argThat(string -> string.equals("tutorial.welcome.introduction") || string.equals("global.button.continue")),
                    isNull(),
                    any(Locale.class)
                );

            fixture.initialize();

            verify(viewBoxMock).setBackground(any(Background.class));
            verify(tutorialTextMock).setText("");
            verify(actionContainerChildrenMock).clear();
        }
    }
}
