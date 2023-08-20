import * as fs from 'node:fs/promises';

export async function writeToFile(
  filePath: string,
  content: string,
  maxSize: number,
) {
  try {
    const stat = await fs.stat(filePath);
    const contentSize = new TextEncoder().encode(content).length;
    if (stat.size + contentSize > maxSize * 1024) {
      await fs.rename(filePath, `${filePath}.${Date.now()}.log`);
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading file: ${err}`);
      return;
    }
  }

  try {
    await fs.appendFile(filePath, content + '\n', {
      encoding: 'utf-8',
      mode: 0o777,
    });
  } catch (err) {
    console.error(`Error writing file: ${err}`);
  }
}
