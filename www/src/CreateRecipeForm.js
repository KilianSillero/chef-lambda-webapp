import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, CustomInput, Button, Spinner } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider);

const CreateRecipeForm = ({askChat}) => {
  
  const [buttonDisable, setButtonDisable] = useState(false);
  const [ingredientes, setIngredientes] = useState('');
  const [tiempo, setTiempo] = useState(15);
  const [utensilios, setUtensilios] = useState(["sarten", "olla", "microondas"]);
  const [selectedDificultad, setSelectedDificultad] = useState("facil");

  const handleIngredientesChange = (event) => {
    setIngredientes(event.target.value);
  };

  const handleTiempoChange = (value) => {
    setTiempo(value);
  };

  const handleUtensiliosChange = (event) => {
    const utensilio = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setUtensilios([...utensilios, utensilio]);
    } else {
      setUtensilios(utensilios.filter((u) => u !== utensilio));
    }
  };

  const handleDificultadChange = (event) => {
    setSelectedDificultad(event.target.value);
  };
  const handleSubmit = () => {
    if (buttonDisable) {
        return;
    }
    setButtonDisable(true);
    
    const utensiliosText = utensilios.join(', ');
    const tiempoText = `${tiempo} minutos`;
    const texto = `Teniendo en cuenta lo siguiente: Ingredientes disponibles: ${ingredientes}. 2- Herramientas de cocina disponibles: ${utensiliosText}. 3- Tiempo disponible: ${tiempoText}. 4- Dificultad de la receta: ${selectedDificultad}.
    Creame una receta, pero no uses ingredientes que no combinen bien entre ellos. Usa MARKDOWN al responder.`;
    console.log(texto);
    askChat(texto);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="ingredientes">Ingredientes</Label>
        <Input
          type="text"
          name="ingredientes"
          id="ingredientes"
          placeholder="Ej: Carne, verduras, pasta, etc."
          value={ingredientes}
          onChange={handleIngredientesChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="tiempo">Tiempo</Label>
        <SliderWithTooltip
          min={5}
          max={120}
          step={5}
          defaultValue={tiempo}
          onAfterChange={handleTiempoChange}
        />
        <p>Tiempo: {tiempo} minutos</p>
      </FormGroup>
      <FormGroup>
        <Label>Utensilios</Label>
        <div>
          <CustomInput
            type="checkbox"
            id="sarten"
            label="Sartén"
            value="sarten"
            checked={utensilios.includes('sarten')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="olla"
            label="Olla"
            value="olla"
            checked={utensilios.includes('olla')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="microondas"
            label="Microondas"
            value="microondas"
            checked={utensilios.includes('microondas')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="batidora"
            label="Batidora"
            value="batidora"
            checked={utensilios.includes('batidora')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="freidoraAire"
            label="Freidora de aire"
            value="freidora de aire"
            checked={utensilios.includes('freidora de aire')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="horno"
            label="Horno"
            value="horno"
            checked={utensilios.includes('horno')}
            onChange={handleUtensiliosChange}
            inline
          />
          <CustomInput
            type="checkbox"
            id="ollaPresion"
            label="Olla a presión"
            value="olla a presion"
            checked={utensilios.includes('olla a presion')}
            onChange={handleUtensiliosChange}
            inline
          />

        </div>
      </FormGroup>
      <FormGroup>
        <Label for="dificultad">Dificultad</Label>
        <Input type="select" name="dificultad" id="dificultad" value={selectedDificultad} onChange={handleDificultadChange}>
          <option value="">Seleccione una opción</option>
          <option value="facil">Fácil</option>
          <option value="intermedio">Intermedio</option>
          <option value="dificil">Difícil</option>
        </Input>
      </FormGroup>
    <Button onClick={handleSubmit} disabled={buttonDisable}>{buttonDisable ? 
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

export default CreateRecipeForm;