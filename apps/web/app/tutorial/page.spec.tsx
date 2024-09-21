import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { tutorialConversation } from './page';

describe('Tutorial', () => {
  const publicDir = join(process.cwd(), 'public');

  const fileExists = (filePath: string): boolean => {
    return existsSync(filePath);
  };

  describe('Conversation', () => {
    test('all background images exist in public folder', () => {
      Object.values(tutorialConversation).forEach(conversation => {
        if (conversation.backgroundImage) {
          const imagePath = join(publicDir, conversation.backgroundImage);
          expect(fileExists(imagePath)).toBe(true);
          if (!fileExists(imagePath)) {
            console.error(`Image not found: ${conversation.backgroundImage}`);
          }
        }
      });
    });
  });
});
