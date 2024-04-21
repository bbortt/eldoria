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

import io.github.bbortt.eldoria.conversation.ContinueButtonOption;
import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.ConversationPart;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Text;

import java.util.List;

import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;

public class TutorialConversation implements Conversation {

    @Override
    public List<ConversationPart> get() {
        return List.of(
                new Text("tutorial.welcome.introduction"),
                new Decision(
                        List.of(
                                new ContinueButtonOption(
                                        conversationEnd()
//                                        () -> List.of(
//                                                new Text("tutorial.welcome.character-introduction"),
//                                                conversationEnd()
//                                        )
                                )
                        )
                )
        );
    }
}
