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
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Option;
import io.github.bbortt.eldoria.conversation.OptionWithCallback;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextAndConfirm;
import static io.github.bbortt.eldoria.conversation.CombinedConversations.showTextWithVariablesAndConfirm;
import static io.github.bbortt.eldoria.conversation.ConversationEnd.conversationEnd;
import static io.github.bbortt.eldoria.conversation.Text.showText;
import static io.github.bbortt.eldoria.conversation.TextInput.awaitTextInput;
import static java.lang.String.format;
import static java.util.Collections.shuffle;
import static java.util.Objects.nonNull;

public class TutorialConversation implements Conversation {

    private final Conversation partyConversation;

    @Getter
    private final List<Integer> partyDecision = new ArrayList<>();

    @Getter
    private String playerName;

    public TutorialConversation() {
        List<Integer> indices = new ArrayList<>(List.of(0, 1, 2, 3, 4));
        shuffle(indices);

        partyConversation = createConversationWithNextConversation(indices, 0);
    }

    @Override
    public List<ConversationPart> get() {
        var tutorialConversation = showTextAndConfirm(
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
                                                                () -> new String[]{playerName},
                                                                showTextAndConfirm("tutorial.arena.introduction",
                                                                        partyConversation))))))));

        var lastDecision = extractLastPartyConversationOption();
        lastDecision.setNextConversation(
                conversationEnd());

        return tutorialConversation.get();
    }

    private Conversation createConversationWithNextConversation(List<Integer> indices, int currentIndex) {
        if (currentIndex == indices.size() - 1) {
            return newArenaEncounterConversation(indices, currentIndex, new OptionWithCallback("tutorial.arena.accept-company", () -> partyDecision.add(indices.get(currentIndex))));
        }

        var nextConversation = createConversationWithNextConversation(indices, currentIndex + 1);

        return newArenaEncounterConversation(indices, currentIndex, new OptionWithCallback("tutorial.arena.accept-company", nextConversation, () -> partyDecision.add(indices.get(currentIndex))));
    }

    private Conversation newArenaEncounterConversation(List<Integer> indices, int currentIndex, OptionWithCallback partyDecision) {
        return () -> List.of(
                showText(format("tutorial.arena.encounter-%s", indices.get(currentIndex))),
                new Decision(
                        List.of(partyDecision)));
    }

    private Option extractLastPartyConversationOption() {
        Conversation lastConversation = partyConversation;
        while (lastConversation.get().getLast() instanceof Decision decision
                && nonNull(decision.options().getLast().getNextConversation())) {
            lastConversation = decision.options().getLast().getNextConversation();
        }

        if (!(lastConversation.get().getLast() instanceof Decision decision)) {
            throw new IllegalArgumentException("Error while building tutorial conversation!");
        }

        return decision.options().getLast();
    }
}
