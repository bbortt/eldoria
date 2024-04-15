package io.github.bbortt.eldoria.service;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.domain.repository.UserPreferencesRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith({MockitoExtension.class})
class UserPreferencesServiceTest {

    @Mock
    private UserPreferencesRepository userPreferencesRepositoryMock;

    private UserPreferencesService userPreferencesService;

    @BeforeEach
    void setUp() {
        userPreferencesService = new UserPreferencesService(userPreferencesRepositoryMock);
    }

    @Test
    void returnExistingUserPreferences() {
        var existingPreferences = new UserPreferences();

        Page<UserPreferences> userPreferencesPage = new PageImpl<>(singletonList(existingPreferences));
        when(userPreferencesRepositoryMock.findAll(any(Pageable.class))).thenReturn(userPreferencesPage);

        var loadedPreferences = userPreferencesService.loadUserPreferences();

        assertThat(loadedPreferences)
                .isEqualTo(existingPreferences);

        verify(userPreferencesRepositoryMock).findAll(any(Pageable.class));
        verify(userPreferencesRepositoryMock, never()).save(any(UserPreferences.class));
    }

    @Test
    void createNewUserPreferencesIfNonExist() {
        when(userPreferencesRepositoryMock.findAll(any(Pageable.class))).thenReturn(Page.empty());
        when(userPreferencesRepositoryMock.save(any(UserPreferences.class))).thenAnswer(invocation -> invocation.getArgument(0));

        var createdPreferences = userPreferencesService.loadUserPreferences();

        assertNotNull(createdPreferences, "Created preferences should not be null");

        verify(userPreferencesRepositoryMock).findAll(any(Pageable.class));
        verify(userPreferencesRepositoryMock).save(any(UserPreferences.class));
    }
}
