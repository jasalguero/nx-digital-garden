import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

export const getParsedFileContent = (filename: string, path: string) => {
  const fileName = join(path, `${filename}.md`);
  const fileContent = readFileSync(fileName);
  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
};

export const renderMarkdown = () => {
  return 'markdown';
};
