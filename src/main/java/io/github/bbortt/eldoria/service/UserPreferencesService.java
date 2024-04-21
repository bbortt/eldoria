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

package io.github.bbortt.eldoria.service;

import io.github.bbortt.eldoria.domain.UserPreferences;
import io.github.bbortt.eldoria.domain.UserPreferences_;
import io.github.bbortt.eldoria.domain.repository.UserPreferencesRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserPreferencesService {

    private final UserPreferencesRepository userPreferencesRepository;

    public UserPreferencesService(UserPreferencesRepository userPreferencesRepository) {
        this.userPreferencesRepository = userPreferencesRepository;
    }

    public UserPreferences loadUserPreferences() {
        var pageable = PageRequest.of(0, 1, Sort.by(UserPreferences_.VERSION).descending());
        var userPreferences = userPreferencesRepository.findAll(pageable);

        if (userPreferences.isEmpty()) {
            return userPreferencesRepository.save(new UserPreferences());
        }

        return userPreferences.getContent().getFirst();
    }

    @Transactional
    public void setTutorialFinished() {
        var userPreferences = loadUserPreferences();
        userPreferences.setPlayedTutorial(true);
        userPreferencesRepository.save(userPreferences);
    }
}
