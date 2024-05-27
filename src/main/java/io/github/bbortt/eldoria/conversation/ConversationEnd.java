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

import static java.util.Collections.singletonList;

public final class ConversationEnd implements ConversationPart {

    private ConversationEnd() {
        // Static access only
    }

    public static Conversation conversationEnd() {
        return () -> singletonList(new ConversationEnd());
    }

    @Override
    public void applyTo(ConversationManager.ConversationPlayer conversationPlayer) {
        throw new IllegalArgumentException("This method shall not be invoked!");
    }
}