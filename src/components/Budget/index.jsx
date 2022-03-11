import { useEffect, useState } from 'react';

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
const incomeData = [
  { id: 1, amout: 30, label: 'internet' },
  { id: 2, amout: 800, label: 'credit immo' },
  { id: 3, amout: 12, label: 'assurance' },
  { id: 4, amout: 55, label: 'assurance voiture' },
  { id: 5, amout: 12, label: 'telephone' },
];
function Budget() {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({ id: 0, amout: 0, label: '' });
  const [newLabel, setNewLabel] = useState(false);

  useEffect(() => {
    setData(incomeData);
  }, [data]);

  const handleNewLabel = (event) => {
    event.preventDefault();
    setNewLabel(true);
  };
  const handleAddedInput = (event) => {
    event.preventDefault();
    setNewLabel(false);
    // setData(data.push(inputData));
  };

  return (
    <>
      <Spacer />
      <Container>
        <ContentFrom>
          <Title>Budget</Title>
          {data.map((input) => (
            <Control key={input.id}>
              <Label htmlFor="amount">{input.label} </Label>
              <Input
                defaultValue={input.amout || 'Montant'}
                type="number"
                id="amout"
                onChange={(event) =>
                  setInputData({ ...data, id: input.id, amout: event.target.value })
                }
              />
            </Control>
          ))}
          {newLabel && (
            <NewLabelControl>
              <Label htmlFor="label" />
              <Input
                newInput
                placeholder="Nom du Label"
                type="text"
                id="label"
                onChange={(event) => setInputData({ ...data, amout: event.target.value })}
              />
              <Label htmlFor="amout" />
              <Input
                newInput
                placeholder="Montant"
                type="number"
                id="amout"
                onChange={(event) => setInputData({ ...data, amout: event.target.value })}
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
