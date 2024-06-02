package io.github.bbortt.eldoria.domain;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import io.github.bbortt.eldoria.IntegrationTest;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.beans.factory.annotation.Autowired;

@IntegrationTest
class NpcIT {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    @ParameterizedTest
    @EnumSource(Npc.class)
    void canPersistNpcCharacter(Npc npc) {
        assertDoesNotThrow(() -> entityManager.persist(npc.createCharacter()));
    }
}
