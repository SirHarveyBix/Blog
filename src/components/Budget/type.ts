import { Session } from 'next-auth';
import { Key } from 'react';

export interface BudgetData {
  amount: number;
  author: Author[];
  id: Key | string;
  label: string;
  __typename: string;
}

export interface BudgetDataProps {
  data: BudgetData;
}
export interface Author {
  id: Key | string;
  __typename: string;
}

export interface SessionHook extends Status {
  data: {
    user: { [userElements: string]: string | Key };
    session: Session;
  } | null;

  expires?: Date | string;
}

interface Status {
  status?: string | null;
}
