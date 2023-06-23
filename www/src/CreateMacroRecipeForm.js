import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Spinner, Badge } from 'reactstrap';


const CreateMacroRecipeForm = ({askChat}) => {

const [buttonDisable, setButtonDisable] = useState(false);
const [carbohidratos, setCarbohidratos] = useState(0);
const [proteina, setProteina] = useState(0);
const [grasas, setGrasas] = useState(0);
const [selectedRestriccion, setSelectedRestriccion] = useState('');


const handleCarbohidratosChange = (e) => {
setCarbohidratos(e.target.value);
};

const handleProteinaChange = (e) => {
setProteina(e.target.value);
};

const handleGrasasChange = (e) => {
setGrasas(e.target.value);
};

const handleRestriccionChange = (e) => {
setSelectedRestriccion(e.target.value);
};
const handleSubmit = () => {
if (buttonDisable) {
return;
}
setButtonDisable(true);

const texto = `Creame una receta ${selectedRestriccion} que tenga los siguientes macros: ${proteina} gramos de proteina,
${carbohidratos} gramos de carbohidratos, ${grasas} gramos de grasa. Usa MARKDOWN al responder.`;
console.log(texto);
askChat(texto);
};

return (
<Form>
  <FormGroup>
    <Label for="carbohidratos">
      <Badge color="primary" pill>
        1
      </Badge>Carbohidratos
    </Label>
    <Input type="number" name="carbohidratos" id="carbohidratos" value={carbohidratos} min="0"
      onChange={handleCarbohidratosChange} />
  </FormGroup>

  <FormGroup>
    <Label for="proteina">
      <Badge color="primary" pill>
        2
      </Badge>Proteínas
    </Label>
    <Input type="number" name="proteina" id="proteina" value={proteina} min="0" onChange={handleProteinaChange} />
  </FormGroup>

  <FormGroup>
    <Label for="grasas">
      <Badge color="primary" pill>
        3
      </Badge>Grasas
    </Label>
    <Input type="number" name="grasas" id="grasas" value={grasas} min="0" onChange={handleGrasasChange} />
  </FormGroup>

  <FormGroup>
    <Label for="restriccion">
      <Badge color="primary" pill>
        4
      </Badge>Restricciones Alimenticias
    </Label>
    <Input type="select" name="restriccion" id="restriccion" value={selectedRestriccion}
      onChange={handleRestriccionChange}>
    <option value="sin restriccion de alimentos">Sin restricción</option>
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
    : 'Crear receta'}
  </Button>
</Form>
);
};

export default CreateMacroRecipeForm;