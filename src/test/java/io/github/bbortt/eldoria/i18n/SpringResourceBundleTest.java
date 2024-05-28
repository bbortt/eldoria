package io.github.bbortt.eldoria.i18n;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import java.util.Enumeration;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;

@ExtendWith({ MockitoExtension.class })
class SpringResourceBundleTest {

    private static final Locale TEST_LOCALE = Locale.ENGLISH;

    @Mock
    private MessageSource messageSourceMock;

    @Mock
    private SpringResourceBundle.ResourceBundleProvider resourceBundleProviderMock;

    private SpringResourceBundle fixture;

    @BeforeEach
    void beforeEachSetup() {
        fixture = new SpringResourceBundle(messageSourceMock, TEST_LOCALE);
        setField(fixture, "resourceBundleProvider", resourceBundleProviderMock, SpringResourceBundle.ResourceBundleProvider.class);
    }

    @Nested
    class HandleGetObject {

        @Test
        void returnsTranslatedMessage() {
            var key = "testKey";
            var expectedMessage = "Test Message";

            doReturn(expectedMessage).when(messageSourceMock).getMessage(key, null, TEST_LOCALE);

            assertThat(fixture.handleGetObject(key)).isEqualTo(expectedMessage);
        }
    }

    @Nested
    class GetKeys {

        @Test
        void doNotAddKeysIfMessageSourceIsNoBundle() {
            assertThat(getKeys()).isEmpty();

            verifyNoMoreInteractions(messageSourceMock, resourceBundleProviderMock);
        }

        @Test
        void getKeysFromResourceBundleMessageSource() {
            var resourceBundleMessageSourceMock = mock(ResourceBundleMessageSource.class);
            setField(fixture, "messageSource", resourceBundleMessageSourceMock, MessageSource.class);

            doReturn(Set.of("messages")).when(resourceBundleMessageSourceMock).getBasenameSet();

            var resourceBundleMock = mock(ResourceBundle.class);
            doReturn(resourceBundleMock).when(resourceBundleProviderMock).getBundle(anyString(), eq(TEST_LOCALE));

            Set<String> translationKeySet = Set.of("key1", "key2");
            doReturn(translationKeySet).when(resourceBundleMock).keySet();

            assertThat(getKeys()).isEqualTo(translationKeySet);
        }

        @Test
        void getKeysFromUnknownSourceIsEmpty() {
            var resourceBundleMessageSourceMock = mock(ResourceBundleMessageSource.class);
            setField(fixture, "messageSource", resourceBundleMessageSourceMock, MessageSource.class);

            doReturn(Set.of("nonexistent")).when(resourceBundleMessageSourceMock).getBasenameSet();

            doThrow(new MissingResourceException("Not found", "ResourceBundle", "nonexistent"))
                .when(resourceBundleProviderMock)
                .getBundle(anyString(), eq(TEST_LOCALE));

            assertThat(getKeys()).isEmpty();
        }

        private Set<String> getKeys() {
            Enumeration<String> keys = fixture.getKeys();
            Set<String> keySet = new ConcurrentSkipListSet<>();
            keys.asIterator().forEachRemaining(keySet::add);
            return keySet;
        }
    }
}
