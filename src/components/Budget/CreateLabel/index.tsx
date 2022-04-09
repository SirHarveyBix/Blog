import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { FunctionComponent, useContext, useState } from 'react';
import { NotificationContextType } from 'src/components/context/type';

import { CREATE_BUDGET_LINE, GET_BUDGET } from '../../../graphql/query';
import { NotificationContext } from '../../context/NotificationContext';
import { SessionHook } from '../type';
import { Button, Container, Input, Label, ValidButton } from './style';

const CreateLabel: FunctionComponent = () => {
  const { data: session, status } = useSession() as SessionHook;
  const { setRequestStatus } = useContext(NotificationContext) as NotificationContextType;
  const [inputData, setInputData] = useState({
    amount: 0,
    label: '',
    author: [{ id: session?.user.id }],
  });
  const [newLabel, setNewLabel] = useState(false);
  const [createBudgetLine] = useMutation(CREATE_BUDGET_LINE, {
    refetchQueries: [{ query: GET_BUDGET, variables: { data: { id: session?.user.id } } }],
    onCompleted: () => setNewLabel(false),
  });

  const handleAddedInput = () => {
    if (session && status === 'authenticated') {
      if (!inputData.amount || !inputData.label) {
        setRequestStatus('missingField');
        setNewLabel(false);
        return;
      }
      createBudgetLine({ variables: { data: inputData } });
    }
  };

  return (
    <>
      {newLabel && (
        <Container>
          <Label htmlFor="label" />
          <Input
            placeholder="Nom du Label"
            type="text"
            id="label"
            onChange={(event) => setInputData({ ...inputData, label: String(event.target.value) })}
          />
          <Label htmlFor="amount" />
          <Input
            placeholder="Montant"
            type="number"
            id="amount"
            onChange={(event) => setInputData({ ...inputData, amount: Number(event.target.value) })}
          />
          <ValidButton
            width={40}
            height={40}
            src="/images/site/valid-Icon.png"
            onClick={handleAddedInput}
          />
        </Container>
      )}
      <Button onClick={(e) => (e.preventDefault(), setNewLabel(true))}>ajouter un label</Button>
    </>
  );
};

export default CreateLabel;
