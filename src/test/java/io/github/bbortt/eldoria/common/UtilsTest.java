package io.github.bbortt.eldoria.common;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class UtilsTest {

    @Test
    void utilityClassNotForInstantiationThrowsException() {
        assertThatThrownBy(Utils::utilityClassNotForInstantiation)
            .isInstanceOf(InstantiationError.class)
            .hasMessage("Cannot instantiate utility class!");
    }
}
