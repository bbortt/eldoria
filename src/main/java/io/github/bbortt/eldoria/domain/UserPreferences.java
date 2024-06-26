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

package io.github.bbortt.eldoria.domain;

import static jakarta.persistence.GenerationType.SEQUENCE;
import static java.util.Locale.forLanguageTag;
import static lombok.AccessLevel.NONE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Locale;
import javax.annotation.Nonnull;
import lombok.Data;
import lombok.Getter;

@Data
@Table
@Entity
public class UserPreferences {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private Long version;

    @Column
    @Getter(NONE)
    private Boolean playedTutorial = false;

    @Column
    @Getter(NONE)
    private String locale = "en-US";

    public @Nonnull Boolean hasPlayedTutorial() {
        return playedTutorial;
    }

    public Locale getLocale() {
        return forLanguageTag(locale);
    }
}
