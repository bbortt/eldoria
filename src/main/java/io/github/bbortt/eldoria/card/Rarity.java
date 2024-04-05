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

package io.github.bbortt.eldoria.card;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public enum Rarity {

    COMMON,
    NORMAL,
    EPIC,
    LEGENDARY;

    private static final Random random = ThreadLocalRandom.current();
    private static final double[] cumulativeProbabilities = {
            0.30, // COMMON: 30%
            0.90, // NORMAL: 60%
            0.99, // EPIC: 9%
            1.0 // LEGENDARY: 1%
    };

    public static Rarity getRandomRarity() {
        double randomValue = random.nextDouble();

        for (int i = 0; i < cumulativeProbabilities.length; i++) {
            if (randomValue < cumulativeProbabilities[i]) {
                return values()[i];
            }
        }

        throw new IllegalArgumentException("Probabilities do not sum up to 1.0. This should never happen!");
    }
}
