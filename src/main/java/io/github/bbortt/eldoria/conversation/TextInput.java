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

import java.util.function.Consumer;

import static lombok.AccessLevel.PACKAGE;

public final class TextInput implements ConversationPart {

    private final Consumer<String> resultEmitter;

    @Getter(PACKAGE)
    private final Conversation nextConversation;

    private TextInput(Consumer<String> resultEmitter, Conversation nextConversation) {
        this.resultEmitter = resultEmitter;
        this.nextConversation = nextConversation;
    }

    public static ConversationPart awaitTextInput(Consumer<String> resultEmitter, Conversation nextConversation) {
        return new TextInput(resultEmitter, nextConversation);
    }

    @Override
    public void applyTo(ConversationManager.ConversationPlayer conversationPlayer) {
        conversationPlayer.continueWith(nextConversation);
    }
}
