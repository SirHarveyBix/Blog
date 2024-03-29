import { FunctionComponent } from 'react';

import { NotificationContextProvider } from '../context/NotificationContext';
import Notification from '../Notification/index';
import CreateLabel from './CreateLabel';
import EditBudget from './EditBudget';
import { Container, ContentFrom, Spacer, Title } from './style';
import { BudgetData } from './type';

const Budget: FunctionComponent<{ data?: BudgetData[]; loading: boolean }> = (props) => {
  const { data, loading } = props;

  return (
    <>
      <Spacer />
      <NotificationContextProvider value={null}>
        <Container>
          <ContentFrom>
            <Title>Budget</Title>
            {loading && !data ? (
              <p>Loading ..</p>
            ) : (
              data?.map((input) => (
                <div key={input.id}>
                  <EditBudget data={input} />
                </div>
              ))
            )}
            <CreateLabel />
          </ContentFrom>
        </Container>
        <Notification />
      </NotificationContextProvider>
    </>
  );
};
export default Budget;
