package io.github.bbortt.eldoria.javafx;

import javafx.stage.Stage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ConfigurableApplicationContext;
import org.testfx.framework.junit5.ApplicationExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.springframework.test.util.ReflectionTestUtils.setField;

@ExtendWith({ApplicationExtension.class, MockitoExtension.class})
class EldoriaApplicationTest {

    @Mock
    private ConfigurableApplicationContext applicationContextMock;

    private EldoriaApplication fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new EldoriaApplication();
        setField(fixture, "applicationContext", applicationContextMock, ConfigurableApplicationContext.class);
    }

    @Nested
    class Start {

        @Test
        void configuresHeightAndWidth() {
            var stageMock = mock(Stage.class);

            fixture.start(stageMock);

            verify(stageMock).setHeight(832);
            verify(stageMock).setWidth(1216);

            ArgumentCaptor<StageReadyEvent> argument = captor();
            verify(applicationContextMock).publishEvent(argument.capture());

            assertThat(argument.getAllValues())
                    .hasSize(1)
                    .first()
                    .extracting(StageReadyEvent::getStage)
                    .isEqualTo(stageMock);
        }
    }
}
