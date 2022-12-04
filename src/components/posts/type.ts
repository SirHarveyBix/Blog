import { Key } from 'react';

export interface Post {
  slug: string | Key;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  __typename?: string;
  isFeatured?: boolean;
}
