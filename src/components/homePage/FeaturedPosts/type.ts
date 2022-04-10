import { Key, ReactNode } from 'react';

export interface Posts {
  posts: {
    filter: () => unknown;
    map(arg0: (post: Post) => JSX.Element): ReactNode;
  };
}

export interface Post extends Posts {
  post: Post;
  slug: string | Key;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  __typename?: string;
  isFeatured?: boolean;
}
