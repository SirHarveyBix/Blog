import { useQuery } from '@apollo/client';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Budget from '/src/components/Budget';

import { GET_BUDGET } from '../../src/graphql/query';

function BudgetPage(props) {
  const { session } = props;
  const { loading, error, data } = useQuery(GET_BUDGET, {
    variables: { data: session?.user },
    pollInterval: 800,
    notifyOnNetworkStatusChange: true,
  });
  const [budget, setBudget] = useState();

  useEffect(() => {
    if (!loading && data.getAllBudget) setBudget(data?.getAllBudget);
  }, [data]);

  return <Budget data={budget} loading={loading} />;
}

export async function getServerSideProps(context) {
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
