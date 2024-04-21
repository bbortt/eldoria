package io.github.bbortt.eldoria.conversation;

import java.util.List;

public interface Decision extends ConversationPart {

    List<Option> getOptions();
}
