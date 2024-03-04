/**
 * Copyright 2024 Timon Borter
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package io.github.bbortt.eldoria.card;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

import static java.util.stream.Collectors.toUnmodifiableSet;

public final class InGameHand implements Deck {

    private final Set<Card> cards;

    private InGameHand(@NotNull Set<Card> cards) {
        this.cards = cards.stream()
                .collect(toUnmodifiableSet());

        sanitize();
    }

    private void sanitize() {
        if (cards.size() != 16) {
            throw new IllegalArgumentException("Invalid sized deck supplied: A deck must contain exactly 16 cards!");
        }
    }
}
