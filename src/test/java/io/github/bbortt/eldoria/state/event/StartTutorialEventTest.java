package io.github.bbortt.eldoria.state.event;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEvent;

import static org.assertj.core.api.Assertions.assertThat;

class StartTutorialEventTest {

    @Test
    void isApplicationEvent() {
        assertThat(new StartTutorialEvent(getClass()))
                .isInstanceOf(ApplicationEvent.class);
    }
}
