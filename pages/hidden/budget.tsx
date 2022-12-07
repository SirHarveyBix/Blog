import { useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { FunctionComponent, useEffect, useState } from 'react';
import Budget from 'src/components/Budget';
import { GET_BUDGET } from 'src/graphql/query';

const BudgetPage: FunctionComponent<{ session: Session }> = ({ session }) => {
  const { loading, data } = useQuery(GET_BUDGET, {
    variables: { data: { id: session.user && session.user.id } },
  });
  const [budget, setBudget] = useState();

  useEffect(() => {
    if (!loading && data?.getAllBudget) setBudget(data.getAllBudget);
  }, [data, loading]);

  return <Budget data={ budget } loading={ loading } />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/hidden/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default BudgetPage;
