import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { REMOVE_BUDGET, UPDATE_BUDGET } from '../../../graphql/query';
import { Control, EditButton, Input, Label, PlainText, PlainTextRow } from './style';

function EditBudget(props) {
  const { data } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [editedInput, setEditedInput] = useState({ label: null, amount: null });

  const [removeBudget] = useMutation(REMOVE_BUDGET, { onCompleted: () => setIsEditable(false) });
  const [updateBudget] = useMutation(UPDATE_BUDGET, { onCompleted: () => setIsEditable(false) });

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
      {!isEditable ? (
        <>
          <PlainTextRow>
            <PlainText>{data.label}</PlainText>
            <PlainText>{data.amount} €</PlainText>
            <EditButton
              layout="fixed"
              width={33}
              height={33}
              src="/images/site/edit-icon.png"
              onClick={() => setIsEditable(!isEditable)}
            />
          </PlainTextRow>
        </>
      ) : (
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
            width={40}
            height={40}
            src="/images/site/valid-Icon.png"
            onClick={handleUpdate}
          />
          <EditButton
            width={26}
            height={34}
            src="/images/site/delete-icon.png"
            onClick={() => removeBudget({ variables: { data: { id: data.id } } })}
          />
        </Control>
      )}
    </>
  );
}

export default EditBudget;
