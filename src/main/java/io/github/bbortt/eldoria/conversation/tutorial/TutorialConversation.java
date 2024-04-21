package io.github.bbortt.eldoria.conversation.tutorial;

import io.github.bbortt.eldoria.conversation.Conversation;
import io.github.bbortt.eldoria.conversation.ConversationPart;
import io.github.bbortt.eldoria.conversation.Decision;
import io.github.bbortt.eldoria.conversation.Option;
import io.github.bbortt.eldoria.conversation.Text;

import java.util.List;

public class TutorialConversation implements Conversation {

    @Override
    public List<ConversationPart> getParts() {
        return List.of(
                (Text) () -> "tutorial.welcome.introduction",
                (Decision) () -> List.of(new Option() {
                    @Override
                    public String getKey() {
                        return "tutorial.welcome.press-enter";
                    }

                    @Override
                    public Conversation getNextConversation() {
                        return () -> List.of(
                                (Text) () -> "tutorial.welcome.character-introduction"
                        );
                    }
                })
        );
    }
}
