import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { getTutorialConversation } from './tutorial.conversation';

describe('Tutorial', () => {
  const publicDir = join(process.cwd(), 'public');

  const fileExists = (filePath: string): boolean => {
    return existsSync(filePath);
  };

  describe('getTutorialConversation', () => {
    let originalEnv;

    beforeEach(() => {
      originalEnv = process.env;
    });

    test('all background images exist in public folder', () => {
      Object.values(getTutorialConversation()).forEach(conversation => {
        if (conversation.backgroundImage) {
          const imagePath = join(publicDir, conversation.backgroundImage);
          expect(fileExists(imagePath)).toBeTruthy();
          if (!fileExists(imagePath)) {
            console.error(`Image not found: ${conversation.backgroundImage}`);
          }
        }
      });
    });

    test('all background images have the correct basePath prefix', () => {
      const mockBasePath = '/mock-base-path';
      process.env.NEXT_PUBLIC_ELDORIA_BASE_PATH = mockBasePath;

      Object.values(getTutorialConversation()).forEach(conversation => {
        if (conversation.backgroundImage) {
          expect(conversation.backgroundImage.startsWith(mockBasePath)).toBeTruthy();
        }
      });
    });

    test('all character conversations have an NPC linked', () => {
      let npcCount = 0;

      Object.values(getTutorialConversation()).forEach(conversation => {
        if (conversation.character) {
          npcCount += 1;
        }
      });

      expect(npcCount).toEqual(5);
    });

    afterEach(() => {
      process.env = originalEnv;
    });
  });
});
