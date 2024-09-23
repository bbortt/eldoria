const { readdir, readFile, writeFile } = require('node:fs');
const { extname, join } = require('node:path');

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const basePath = process.env.NEXT_PUBLIC_ELDORIA_BASE_PATH;

const updateCssUrls = filePath => {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    let changesMade = false;
    const updatedContent = data.replace(/url\(((?!${basePath}).)*?\)/g, match => {
      // If the URL already starts with basePath, return it unchanged
      if (match.startsWith(`url(${basePath}`)) {
        return match;
      }
      // Otherwise, prepend the basePath
      changesMade = true;
      return `url(${basePath}${match.slice(4)}`;
    });

    if (changesMade) {
      writeFile(filePath, updatedContent, 'utf8', err => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
        } else {
          console.log(`Updated ${filePath}`);
        }
      });
    } else {
      console.log(`No changes needed for ${filePath}`);
    }
  });
};

const walkDir = dir => {
  readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const filePath = join(dir, file.name);

      if (file.isDirectory()) {
        walkDir(filePath);
      } else if (extname(file.name) === '.css') {
        updateCssUrls(filePath);
      }
    });
  });
};

// Only proceed if NEXT_PUBLIC_ELDORIA_BASE_PATH is set
if (basePath) {
  // Start processing from the 'out' directory
  walkDir(join(process.cwd(), 'out'));
} else {
  console.log(`Skipped css URL expansion (NEXT_PUBLIC_ELDORIA_BASE_PATH not set)`);
}
