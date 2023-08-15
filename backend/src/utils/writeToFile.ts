import fs from 'fs';

export function writeToFile(filePath, content, maxSize) {
  fs.readFile(filePath, 'utf8', (err, existingContent) => {
    if (err && err.code !== 'ENOENT') {
      console.error(`Error reading file: ${err}`);
      return;
    }

    let modifiedContent = existingContent || '';
    const totalContent = modifiedContent + content;

    if (totalContent.length > maxSize) {
      const contentToKeep = totalContent.slice(-maxSize);
      modifiedContent = contentToKeep;
    } else {
      modifiedContent = totalContent;
    }

    fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
      }
    });
  });
}
