package io.github.bbortt.eldoria.tutorial;

import io.github.bbortt.eldoria.service.UserPreferencesService;
import io.github.bbortt.eldoria.state.event.StartTutorialEvent;
import lombok.extern.slf4j.Slf4j;
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.terminal.Terminal;
import org.springframework.context.event.EventListener;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class WelcomeChat {

    private final ResourceBundleMessageSource messageSource;
    private final Terminal terminal;
    private final UserPreferencesService userPreferencesService;

    private final LineReader lineReader;

    public WelcomeChat(ResourceBundleMessageSource messageSource, Terminal terminal, UserPreferencesService userPreferencesService) {
        this.messageSource = messageSource;
        this.terminal = terminal;

        this.userPreferencesService = userPreferencesService;

        this.lineReader = LineReaderBuilder.builder().terminal(terminal).build();
    }

    @EventListener(StartTutorialEvent.class)
    public void startTutorial() {
        log.info("Starting tutorial");

        writeBlockAndConfirmWithEnter("tutorial.welcome.introduction");

        writeBlockAndConfirmWithEnter("tutorial.welcome.character-introduction");

        writeBlockAndConfirmWithEnter("tutorial.welcome.guild-introduction");

        writeBlockAndConfirmWithEnter("tutorial.welcome.arena-entrance");

        String playerName = lineReader.readLine(messageSource.getMessage("tutorial.welcome.chose-name", null, userPreferencesService.loadUserPreferences().getLocale()));
        userPreferencesService.setUsername(playerName);

        writeBlockAndConfirmWithEnter("tutorial.welcome.your-journey-begins");
    }

    private void writeBlockAndConfirmWithEnter(String code) {
        terminal.writer().println(messageSource.getMessage(code, null, userPreferencesService.loadUserPreferences().getLocale()));
        terminal.writer().flush();

        lineReader.readLine(messageSource.getMessage("tutorial.welcome.press-enter", null, userPreferencesService.loadUserPreferences().getLocale()));
    }
}
