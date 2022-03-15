import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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

const postsResolver = {
  Query: {
    getAllPosts() {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });
      return allPosts;
    },
    searchQuery(_parent, { filter: { input } }) {
      const postFiles = getPostsFiles();
      const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
      });

      const requestedPosts = allPosts.filter((post) => JSON.stringify(post).includes(input));
      return requestedPosts;
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
    getPostDetails(_parent, { data: { slug } }) {
      const filePath = path.join(postsDirectory, `${slug}.md`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const postSlug = slug.replace(/\.md$/, '');
      const { data, content } = matter(fileContent);
      const postData = { slug: postSlug, ...data, content };

      return postData;
    },
  },
};
export default postsResolver;
