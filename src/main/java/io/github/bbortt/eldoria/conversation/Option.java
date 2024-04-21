package io.github.bbortt.eldoria.conversation;

public interface Option {

    String getKey();

    Conversation getNextConversation();
}
