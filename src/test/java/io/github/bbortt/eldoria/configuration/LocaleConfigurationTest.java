package io.github.bbortt.eldoria.configuration;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.ResourceBundleMessageSource;

class LocaleConfigurationTest {

    private LocaleConfiguration fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new LocaleConfiguration();
    }

    @Nested
    class MessageSource {

        @Test
        void containsBasenames() {
            assertThat(fixture.messageSource())
                .extracting(ResourceBundleMessageSource::getBasenameSet)
                .satisfies(basenames -> assertThat(basenames).containsExactly("i18n/character", "i18n/global", "i18n/main", "i18n/tutorial")
                );
        }
    }
}
