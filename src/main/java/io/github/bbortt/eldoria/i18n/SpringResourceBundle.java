/**
 * Copyright 2024 Timon Borter
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * https://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.bbortt.eldoria.i18n;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;

import java.util.Enumeration;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import static java.util.Collections.enumeration;

@Slf4j
public class SpringResourceBundle extends ResourceBundle {

    private Set<String> keys = new ConcurrentSkipListSet<>();

    private MessageSource messageSource;
    private Locale locale;

    public SpringResourceBundle(MessageSource messageSource, Locale locale) {
        this.messageSource = messageSource;
        this.locale = locale;
    }

    @Override
    protected String handleGetObject(String key) {
        return messageSource.getMessage(key, null, locale);
    }

    @Override
    public Enumeration<String> getKeys() {
        if (keys.isEmpty() && messageSource instanceof ResourceBundleMessageSource resourceBundleMessageSource) {
            resourceBundleMessageSource.getBasenameSet().forEach(baseName -> {
                try {
                    ResourceBundle resourceBundle = ResourceBundle.getBundle(baseName, locale);
                    keys.addAll(resourceBundle.keySet());
                } catch (MissingResourceException e) {
                    log.error("No resource bundle found for basename {} and locale {}!", baseName, locale, e);
                }
            });

        }

        return enumeration(keys);
    }
}
