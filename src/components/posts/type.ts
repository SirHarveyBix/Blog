import { Key, MouseEvent, ReactNode } from 'react';

export interface Posts {
  posts: {
    //TODO remove any;
    filter: any;
    map(arg0: (post: Post) => JSX.Element): ReactNode;
  };
}

export interface Post extends Posts {
  slug: string | Key;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  __typename?: string;
  isFeatured?: boolean;
}
export interface PostProps {
  post: Post;
}

export interface OnClickRef extends MouseEvent {
  //TODO remove | any;
  target: HTMLImageElement | any;
}
