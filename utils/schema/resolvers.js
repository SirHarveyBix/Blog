import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (postIdentifier) => {
  const postSlug = postIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDirectory, `${postSlug}.md`);

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const postData = { slug: postSlug, ...data, content };

  return postData;
};

export const resolvers = {
  Query: {
    getPost(_parent, { data: { slug } }) {
      const postSlug = slug.replace(/\.md$/, '');

      const filePath = path.join(postsDirectory, `${postSlug}.md`);

      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const { data, content } = matter(fileContent);
      const postData = { slug: postSlug, ...data, content };

      return postData;
    },

    getAllPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });
      return allPosts;
    },

    getFeaturedPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });
      const sortedPosts = allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
      const featuredPosts = sortedPosts.filter((post) => post.isFeatured);

      return featuredPosts;
    },
  },
};
export default resolvers;
