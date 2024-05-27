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

package io.github.bbortt.eldoria.conversation;

import lombok.Getter;

import static java.util.Objects.nonNull;
import static lombok.AccessLevel.PACKAGE;

@Getter(PACKAGE)
public sealed class Option permits ContinueButtonOption, OptionWithCallback {

    private final String translationKey;

    @Getter
    private Conversation nextConversation;

    protected Option(String translationKey) {
        this.translationKey = translationKey;
    }

    public Option(String translationKey, Conversation nextConversation) {
        this.translationKey = translationKey;
        this.nextConversation = nextConversation;
    }

    public void setNextConversation(Conversation nextConversation) {
        if (nonNull(this.nextConversation)) {
            throw new IllegalArgumentException("Conversation already initialized!");
        }

        this.nextConversation = nextConversation;
    }
}
