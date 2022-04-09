import { Key, ReactNode } from 'react';

export interface Post {
  posts: {
    slug: Key | string;
    title: string;
    image: string;
    excerpt: string;
    date: string;
    __typename: string;
    isFeatured: boolean;
    filter: any;
    map(arg0: (post: any) => JSX.Element): ReactNode;
  };
}
