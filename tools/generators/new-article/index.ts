import {
  Tree,
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
} from '@nrwl/devkit';

interface NewArticleSchema {
  title: string;
  author: string;
  excerpt: string;
}

export default async function (tree: Tree, schema: NewArticleSchema) {
  //TODO: find how to access the folder using the environment variable
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    '_articles',
    {
      title: schema.title,
      author: "Jose Salguero",
      excerpt: schema.excerpt || '',
      normalizedTitle: names(schema.title).fileName,
      creationDate: new Date().toISOString()
    }
  );

  await formatFiles(tree);
}
