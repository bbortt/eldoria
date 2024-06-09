package io.github.bbortt.eldoria.javafx;

import static io.github.bbortt.eldoria.javafx.LayoutUtils.applyBackground;
import static io.github.bbortt.eldoria.javafx.LayoutUtils.buttonGroup;
import static javafx.geometry.Pos.CENTER;
import static javafx.scene.layout.BackgroundRepeat.NO_REPEAT;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.InstanceOfAssertFactories.LIST;
import static org.assertj.core.api.InstanceOfAssertFactories.type;
import static org.mockito.ArgumentCaptor.captor;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.verify;
import static org.testfx.util.WaitForAsyncUtils.waitForFxEvents;

import io.github.palexdev.materialfx.controls.MFXButton;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundImage;
import javafx.scene.layout.BackgroundPosition;
import javafx.scene.layout.Pane;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.testfx.framework.junit5.ApplicationExtension;

@ExtendWith({ ApplicationExtension.class })
class LayoutUtilsTest {

    @Nested
    class ButtonGroup {

        @Test
        void emptyArray() {
            var buttonGroup = buttonGroup();

            assertThat(buttonGroup)
                .isNotNull()
                .satisfies(b -> assertThat(b.getAlignment()).isEqualTo(CENTER), b -> assertThat(b.getChildren()).isEmpty());
        }

        @Test
        void multipleButtons() {
            var button1 = new MFXButton();
            var button2 = new MFXButton();

            var buttonGroup = buttonGroup(button1, button2);

            assertThat(buttonGroup)
                .isNotNull()
                .satisfies(
                    b -> assertThat(b.getAlignment()).isEqualTo(CENTER),
                    b -> assertThat(b.getChildren()).containsExactly(button1, button2),
                    b -> assertThat(b.getSpacing()).isEqualTo(5.0)
                );
        }
    }

    @Nested
    class ApplyBackground {

        Pane paneSpy;

        @BeforeEach
        void beforeEachSetup() {
            paneSpy = spy(new Pane());
        }

        @Test
        void validImageWithAnimation() {
            applyBackground("images/background.png", paneSpy);

            waitForFxEvents();

            verifyBackgroundHasBeenApplied();
        }

        @Test
        void validImageWithoutAnimation() {
            applyBackground("images/background.png", paneSpy, false);

            verifyBackgroundHasBeenApplied();
        }

        private void verifyBackgroundHasBeenApplied() {
            ArgumentCaptor<Background> backgroundArgumentCaptor = captor();
            verify(paneSpy).setBackground(backgroundArgumentCaptor.capture());

            assertThat(backgroundArgumentCaptor.getValue())
                .isNotNull()
                .extracting(Background::getImages)
                .asInstanceOf(LIST)
                .hasSize(1)
                .first()
                .asInstanceOf(type(BackgroundImage.class))
                .satisfies(
                    i -> assertThat(i.getImage()).isNotNull(),
                    i -> assertThat(i.getRepeatX()).isEqualTo(NO_REPEAT),
                    i -> assertThat(i.getRepeatY()).isEqualTo(NO_REPEAT),
                    i -> assertThat(i.getPosition()).isEqualTo(BackgroundPosition.CENTER)
                );
        }

        @Test
        void invalidImage() {
            assertThatThrownBy(() -> applyBackground("non-existing.image", paneSpy)).isInstanceOf(NullPointerException.class);
        }
    }
}
