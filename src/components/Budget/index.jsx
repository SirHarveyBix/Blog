import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { CREATE_BUDGET_LINE } from '../../graphql/query';
import {
  Button,
  Container,
  ContentFrom,
  Control,
  Input,
  Label,
  NewLabelControl,
  Spacer,
  Title,
} from './style';

function Budget(props) {
  const { data, loading } = props;
  const { data: session, status } = useSession();
  const [inputData, setInputData] = useState({ amount: 0, label: '' });
  const [newLabel, setNewLabel] = useState(false);

  const [createBudgetLine] = useMutation(CREATE_BUDGET_LINE, {
    onCompleted: () => setNewLabel(false),
    onError: (error) => console.error(error),
  });

  const handleNewLabel = (event) => {
    event.preventDefault();
    setNewLabel(true);
  };

  const handleAddedInput = (event) => {
    event.preventDefault();
    if (session && status === 'authenticated') {
      setInputData({ ...inputData, author: [session?.user] });
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
            <></>
          ) : (
            data?.map((input) => (
              <Control key={input.id}>
                <Label htmlFor="amount">{input.label} </Label>
                <Input
                  defaultValue={input.amount || 'Montant'}
                  type="number"
                  id="amount"
                  onChange={(event) =>
                    setInputData({ ...data, id: input.id, amount: event.target.value })
                  }
                />
              </Control>
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
              <Button newInput onClick={handleAddedInput}>
                ok
              </Button>
            </NewLabelControl>
          )}
          <Button onClick={handleNewLabel}>ajouter un label</Button>
        </ContentFrom>
      </Container>
    </>
  );
}
export default Budget;
