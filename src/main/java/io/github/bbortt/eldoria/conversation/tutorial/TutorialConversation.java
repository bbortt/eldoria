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

import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextAndConfirm;
import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextWithVariablesAndConfirm;
import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static io.github.bbortt.eldoria.conversation.ConversationUtils.continueActionWith;
import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.TextInput.awaitTextInput;
import static io.github.bbortt.eldoria.javafx.LayoutUtils.applyBackground;
import static java.lang.String.format;
import static java.util.Collections.shuffle;

import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Option;
import io.github.bbortt.eldoria.conversation.OptionWithCallback;
import jakarta.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;
import javafx.scene.layout.BorderPane;
import lombok.Getter;

public class TutorialConversation {

    private final List<Integer> partyIndices = new ArrayList<>(List.of(0, 1, 2, 3, 4));

    private Conversation tutorialConversation;

    @Getter
    private final List<Integer> partyDecision = new ArrayList<>();

    @Getter
    private String playerName;

    public TutorialConversation() {
        shuffle(partyIndices);
    }

    public Conversation build(BorderPane viewBox) {
        tutorialConversation = showTextAndConfirm(
            "tutorial.welcome.introduction",
            showTextAndConfirm(
                "tutorial.welcome.character-introduction",
                showTextAndConfirm(
                    "tutorial.welcome.guild-introduction",
                    continueActionWith(
                        conversationPlayer -> applyBackground("images/tutorial/arena.png", viewBox),
                        showTextAndConfirm("tutorial.welcome.arena-entrance", () ->
                            List.of(
                                showText("tutorial.welcome.chose-name"),
                                awaitTextInput(
                                    "global.character.username",
                                    result -> playerName = result,
                                    showTextWithVariablesAndConfirm(
                                        "tutorial.welcome.your-journey-begins",
                                        () -> new String[] { playerName },
                                        showTextAndConfirm(
                                            "tutorial.arena.introduction",
                                            createPartyConversationContinuingWithNextConversation(
                                                0,
                                                viewBox,
                                                showTextAndConfirm("tutorial.arena.group", conversationEnd())
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );

        return tutorialConversation;
    }

    private Conversation createPartyConversationContinuingWithNextConversation(
        int currentIndex,
        BorderPane viewBox,
        Conversation nextConversation
    ) {
        if (currentIndex == partyIndices.size() - 1) {
            return newArenaEncounterConversation(currentIndex, viewBox, nextConversation);
        }

        var partyConversation = createPartyConversationContinuingWithNextConversation(currentIndex + 1, viewBox, nextConversation);
        return newArenaEncounterConversation(currentIndex, viewBox, partyConversation);
    }

    private Conversation newArenaEncounterConversation(int currentIndex, BorderPane viewBox, @Nullable Conversation nextConversation) {
        return continueActionWith(
            conversationPlayer -> applyBackground(format("images/characters/encounter-%s.png", currentIndex), viewBox),
            () ->
                List.of(
                    showText(format("tutorial.arena.encounter-%s", partyIndices.get(currentIndex))),
                    new Decision(
                        List.of(
                            new OptionWithCallback("tutorial.arena.accept-company", nextConversation, () ->
                                partyDecision.add(partyIndices.get(currentIndex))
                            ),
                            new Option("tutorial.arena.refuse-company", nextConversation)
                        )
                    )
                )
        );
    }
}
