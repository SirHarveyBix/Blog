import { useState } from 'react';

import { Control, EditButton, Input, Label, PlainText, PlainTextRow } from './style';
function EditBudget(props) {
  const { input, setInputData, data } = props;
  const [isEditable, setIsEditable] = useState(false);

  return (
    <>
      {isEditable ? (
        <Control key={input.id}>
          <Label htmlFor="label" />
          <Input
            defaultValue={input.label}
            type="text"
            id="label"
            onChange={(event) => setInputData({ ...data, id: input.id, label: event.target.value })}
          />
          <Label htmlFor="amount" />
          <Input
            isNumberInput
            defaultValue={input.amount}
            type="number"
            id="amount"
            onChange={(event) =>
              setInputData({ ...data, id: input.id, amount: event.target.value })
            }
          />
          <EditButton
            width={17}
            height={37}
            src="/images/site/valid-Icon.png"
            onClick={() => setIsEditable(!isEditable)}
          />
          <EditButton
            width={17}
            height={37}
            src="/images/site/delete-icon.png"
            onClick={() => setIsEditable(!isEditable)}
          />
        </Control>
      ) : (
        <PlainTextRow key={input.id}>
          <PlainText>{input.label}</PlainText>
          <PlainText>{input.amount} </PlainText>
          <EditButton
            width={17}
            height={27}
            src="/images/site/edit-icon.png"
            onClick={() => setIsEditable(!isEditable)}
          />
        </PlainTextRow>
      )}
    </>
  );
}

export default EditBudget;
