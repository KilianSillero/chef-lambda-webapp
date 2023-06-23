import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Spinner, Badge } from 'reactstrap';


const CreateMacroRecipeForm = ({ askChat }) => {

  const [buttonDisable, setButtonDisable] = useState(false);

  const [selectedRestriccion, setSelectedRestriccion] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('una comida');
  const [selectedEstilo, setSelectedEstilo] = useState('espanola');


  const handleEstiloChange = (e) => {
    setSelectedEstilo(e.target.value);
  };
  const handleTipoChange = (e) => {
    setSelectedTipo(e.target.value);
  };
  const handleRestriccionChange = (e) => {
    setSelectedRestriccion(e.target.value);
  };
  const handleSubmit = () => {
    if (buttonDisable) {
      return;
    }
    setButtonDisable(true);

    const texto = `Creame una receta ${selectedRestriccion} para ${selectedTipo} estilo ${selectedEstilo}. Usa MARKDOWN al responder.`;
    console.log(texto);
    askChat(texto);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="estilo"><Badge
          color="primary"
          pill
        >
          1
        </Badge>¿Qué tipo de comida te apetece hoy?</Label>
        <Input
          type="select"
          name="estilo"
          id="estilo"
          value={selectedEstilo}
          onChange={handleEstiloChange}
        >
          <option value="asiatica">Asiática</option>
          <option value="italiana">Italiana</option>
          <option value="mexicana">Mexicana</option>
          <option value="mediterranea">Mediterránea</option>
          <option value="americana">Americana</option>
          <option value="francesa">Francesa</option>
          <option value="japonesa">Japonesa</option>
          <option value="india">India</option>
          <option value="espanola">Española</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="tipo"><Badge
          color="primary"
          pill
        >
          2
        </Badge>¿Para cuándo?</Label>
        <Input
          type="select"
          name="tipo"
          id="tipo"
          value={selectedTipo}
          onChange={handleTipoChange}
        >
          <option value="un desayuno">Desayuno</option>
          <option value="una comida">Comida</option>
          <option value="un postre">Postre</option>
          <option value="una merienda">Merienda</option>
          <option value="una cena">Cena</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="restriccion"><Badge
          color="primary"
          pill
        >
          3
        </Badge>Restricciones Alimenticias</Label>
        <Input
          type="select"
          name="restriccion"
          id="restriccion"
          value={selectedRestriccion}
          onChange={handleRestriccionChange}
        >
          <option value="">Sin restricción</option>
          <option value="vegana">Vegana</option>
          <option value="sin gluten">Sin Gluten</option>
          <option value="sin lactosa">Sin Lactosa</option>
          <option value="vegetariana">Vegetariana</option>
        </Input>
      </FormGroup>
      <Button block className="btn-round" color="primary" onClick={handleSubmit} disabled={buttonDisable}>{buttonDisable ?
        <>
          <Spinner size="sm">
            Loading...
          </Spinner>
          <span>
            {' '}Creando receta...
          </span>
        </>
        : 'Crear receta'}</Button>
    </Form>
  );
};

export default CreateMacroRecipeForm;