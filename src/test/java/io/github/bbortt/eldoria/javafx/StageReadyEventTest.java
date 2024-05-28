package io.github.bbortt.eldoria.javafx;

import static org.assertj.core.api.Assertions.assertThat;

import javafx.stage.Stage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.testfx.framework.junit5.ApplicationExtension;
import org.testfx.framework.junit5.Start;

@ExtendWith({ ApplicationExtension.class })
class StageReadyEventTest {

    private Stage stage;

    @Start
    private void start(Stage stage) {
        this.stage = stage;
    }

    @Test
    void getStageReturnsSource() {
        var fixture = new StageReadyEvent(stage);

        assertThat(fixture).extracting(StageReadyEvent::getStage).isEqualTo(stage);
    }
}
