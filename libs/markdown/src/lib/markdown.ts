import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';

export const getParsedFileContent = (filename: string, path: string) => {
  const fileName = join(path, `${filename}.mdx`);
  const fileContent = readFileSync(fileName);
  const { data, content } = matter(fileContent);

  return {
    frontMatter: data,
    content,
  };
};

export const renderMarkdown = (markdownContent: string) => {
  return serialize(markdownContent || '');
};
