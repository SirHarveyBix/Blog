import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { CREATE_BUDGET_LINE } from '../../graphql/query';
import EditBudget from './EditBudget';
import {
  Button,
  Container,
  ContentFrom,
  Input,
  Label,
  NewLabelControl,
  Spacer,
  Title,
  ValidButton,
} from './style';

function Budget(props) {
  const { data, loading } = props;
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState({ amount: 0, label: '', author: [session?.user] });
  const [newLabel, setNewLabel] = useState(false);

  const [createBudgetLine] = useMutation(CREATE_BUDGET_LINE, {
    onCompleted: () => setNewLabel(false),
    onError: (error) => console.error(error),
  });

  const handleNewLabel = (event) => {
    event.preventDefault();
    setNewLabel(true);
  };

  const handleAddedInput = () => {
    if (session && status === 'authenticated') {
      if (!inputData.amount || !inputData.label) {
        // TODO : add notification error
        setNewLabel(false);
        return;
      }
      createBudgetLine({ variables: { data: inputData } });
    }
  };

  return (
    <>
      <Spacer />
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
          {newLabel && (
            <NewLabelControl>
              <Label htmlFor="label" />
              <Input
                newInput
                placeholder="Nom du Label"
                type="text"
                id="label"
                onChange={(event) => setInputData({ ...inputData, label: event.target.value })}
              />
              <Label htmlFor="amount" />
              <Input
                newInput
                placeholder="Montant"
                type="number"
                id="amount"
                onChange={(event) =>
                  setInputData({ ...inputData, amount: Number(event.target.value) })
                }
              />
              <ValidButton
                width={40}
                height={40}
                src="/images/site/valid-Icon.png"
                onClick={handleAddedInput}
              />
            </NewLabelControl>
          )}
          <Button onClick={handleNewLabel}>ajouter un label</Button>
        </ContentFrom>
      </Container>
    </>
  );
}
export default Budget;
