package io.github.bbortt.eldoria.conversation.tutorial;

import io.github.bbortt.eldoria.conversation.ContinueButtonOption;
import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.ConversationEnd;
import io.github.bbortt.eldoria.conversation.ConversationPart;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Text;

import java.util.List;

public class TutorialConversation implements Conversation {

    @Override
    public List<ConversationPart> getParts() {
        return List.of(
                new Text("tutorial.welcome.introduction"),
                new Decision(
                        List.of(
                                new ContinueButtonOption(
                                        () -> List.of(
                                                new Text("tutorial.welcome.character-introduction"),
                                                new ConversationEnd()
                                        )
                                )
                        )
                )
        );
    }
}
