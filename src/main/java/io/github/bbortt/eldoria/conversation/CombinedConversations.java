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

import java.util.List;

import static io.github.bbortt.eldoria.conversation.ContinueButtonOption.confirmAndContinueWith;
import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.Text.showTextWithVariables;

public final class CombinedConversations {

    private CombinedConversations() {
        // Static utility class
    }

    public static Conversation showTextAndConfirm(String translationKey, Conversation nextConversation) {
        return () -> List.of(
                showText(translationKey),
                confirmAndContinueWith(nextConversation));
    }

    public static Conversation showTextWithVariablesAndConfirm(String translationKey, Object[] arguments, Conversation nextConversation) {
        return () -> List.of(
                showTextWithVariables(translationKey, arguments),
                confirmAndContinueWith(nextConversation));
    }
}
