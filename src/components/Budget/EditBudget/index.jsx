import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { REMOVE_BUDGET_BY_ID, UPDATE_BUDGET } from '../../../graphql/query';
import { Control, EditButton, Input, Label, PlainText, PlainTextRow } from './style';

function EditBudget(props) {
  const { data } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [editedInput, setEditedInput] = useState({ label: null, amount: null });

  const [removeBudgetById] = useMutation(REMOVE_BUDGET_BY_ID, {
    onCompleted: () => setIsEditable(false),
    onError: (error) => console.error(error),
  });

  const [updateBudget] = useMutation(UPDATE_BUDGET, {
    onCompleted: () => setIsEditable(false),
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    setEditedInput({ ...editedInput, id: data.id });
  }, [isEditable]);

  const handleUpdate = () => {
    if (!editedInput.label && !editedInput.amount) setIsEditable(false);
    if (!editedInput.amount) setEditedInput({ ...editedInput, amount: Number(data.amount) });
    if (!editedInput.label) setEditedInput({ ...editedInput, label: data.label });
    if (editedInput.label && editedInput.amount && editedInput.id) {
      updateBudget({ variables: { data: editedInput } });
    }
  };

  return (
    <>
      {isEditable ? (
        <Control>
          <Label htmlFor="label" />
          <Input
            defaultValue={data.label}
            type="text"
            id="label"
            onChange={(event) => setEditedInput({ ...editedInput, label: event.target.value })}
          />
          <Label htmlFor="amount" />
          <Input
            isNumberInput
            defaultValue={data.amount}
            type="number"
            id="amount"
            onChange={(event) =>
              setEditedInput({ ...editedInput, amount: Number(event.target.value) })
            }
          />
          <EditButton
            width={17}
            height={37}
            src="/images/site/valid-Icon.png"
            onClick={handleUpdate}
          />
          <EditButton
            width={17}
            height={37}
            src="/images/site/delete-icon.png"
            onClick={() => removeBudgetById({ variables: { data: { id: data.id } } })}
          />
        </Control>
      ) : (
        <>
          <PlainTextRow>
            <PlainText>{data.label}</PlainText>
            <PlainText>{data.amount} €</PlainText>
            <EditButton
              width={17}
              height={27}
              src="/images/site/edit-icon.png"
              onClick={() => setIsEditable(!isEditable)}
            />
          </PlainTextRow>
        </>
      )}
    </>
  );
}

export default EditBudget;
