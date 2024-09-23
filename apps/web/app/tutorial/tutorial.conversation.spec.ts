import { existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Tutorial', () => {
  const publicDir = join(process.cwd(), 'public');

  const fileExists = (filePath: string): boolean => {
    return existsSync(filePath);
  };

  describe('Conversation', () => {
    let originalEnv;

    beforeEach(() => {
      originalEnv = process.env;
    });

    test('all background images exist in public folder', () => {
      const tutorialConversation = require('./tutorial.conversation');

      Object.values(tutorialConversation).forEach(conversation => {
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

      const tutorialConversation = require('./tutorial.conversation');

      Object.values(tutorialConversation).forEach(conversation => {
        if (conversation.backgroundImage) {
          expect(conversation.backgroundImage.startsWith(mockBasePath)).toBeTruthy();
        }
      });
    });

    beforeEach(() => {
      process.env = originalEnv;
    });
  });
});
