package io.github.bbortt.eldoria.state;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class GameState {

    private boolean inGame = false;
}
