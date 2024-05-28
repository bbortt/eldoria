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

import static java.util.Arrays.stream;
import static lombok.AccessLevel.PACKAGE;

import lombok.Getter;

public enum Npc {
    THANE(0),
    NYSSA(1),
    ELYNDOR(2),
    BROM(3),
    SELENE(4);

    @Getter(PACKAGE)
    private final int index;

    Npc(int index) {
        this.index = index;
    }

    public static Npc fromIndex(int index) {
        return stream(values()).filter(npc -> npc.index == index).findFirst().orElseThrow();
    }

    public Character createCharacter() {
        return Character.builder().name(toString().charAt(0) + toString().substring(1).toLowerCase()).build();
    }
}
