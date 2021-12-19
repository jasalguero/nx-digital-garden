import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { join } from 'path';
import { readdirSync } from 'fs';
import { getParsedFileContent, renderMarkdown } from '@jasalguero/markdown';
import { MDXRemote } from 'next-mdx-remote';
import { Youtube, CustomLink } from '@jasalguero/shared/mdx-elements';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

// list of all the customized elements for mdx content
const mdxElements = {
  Youtube,
  a: CustomLink
};

const ARTICLES_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr />
      <MDXRemote {...html} components={mdxElements} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // 1. parse the content of markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContent(
    params.slug,
    ARTICLES_PATH
  );

  // 2. convert markdown => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const articlePaths = readdirSync(ARTICLES_PATH)
    .map((i) => i.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths: articlePaths,
    fallback: false,
  };
};

export default Article;
