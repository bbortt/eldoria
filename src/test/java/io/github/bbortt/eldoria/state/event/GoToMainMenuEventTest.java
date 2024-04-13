package io.github.bbortt.eldoria.state.event;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEvent;

import static org.assertj.core.api.Assertions.assertThat;

class GoToMainMenuEventTest {

    @Test
    void isApplicationEvent() {
        assertThat(new GoToMainMenuEvent(getClass()))
                .isInstanceOf(ApplicationEvent.class);
    }
}
