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

package io.github.bbortt.eldoria.conversation.tutorial;

import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.ConversationPart;
import lombok.Getter;

import java.util.List;

import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextAndConfirm;
import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextWithVariablesAndConfirm;
import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.TextInput.awaitTextInput;

public class TutorialConversation implements Conversation {

    @Getter
    private String playerName;

    @Override
    public List<ConversationPart> get() {
        return showTextAndConfirm(
                "tutorial.welcome.introduction",
                showTextAndConfirm(
                        "tutorial.welcome.character-introduction",
                        showTextAndConfirm(
                                "tutorial.welcome.guild-introduction",
                                showTextAndConfirm(
                                        "tutorial.welcome.arena-entrance",
                                        () -> List.of(
                                                showText("tutorial.welcome.chose-name"),
                                                awaitTextInput(
                                                        (result) -> playerName = result,
                                                        showTextWithVariablesAndConfirm(
                                                                "tutorial.welcome.your-journey-begins",
                                                                () -> new Object[]{playerName},
                                                                conversationEnd())))))))
                .get();
    }
}
