import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider);

const CreateRecipeForm = ({askChat}) => {
  const [ingredientes, setIngredientes] = useState('');
  const [tiempo, setTiempo] = useState(10);
  const [utensilios, setUtensilios] = useState([]);
  const [dificultades, setDificultad] = useState([]);

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
    const dificultad = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setDificultad([...dificultades, dificultad]);
    } else {
      setDificultad(dificultades.filter((d) => d !== dificultad));
    }
  };
  const handleSubmit = () => {
    const utensiliosText = utensilios.join(', ');
    const dificultadText = dificultades.join(', ');
    const tiempoText = `${tiempo} minutos`;
    const texto = `Crea una receta con los siguientes ingredientes: ${ingredientes}. Puedes usar los siguientes utensilios: ${utensiliosText}. La dificultad debe ser ${dificultadText} y tardar en hacerse ${tiempoText}.`;
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
          min={0}
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
            id="batidora"
            label="Batidora"
            value="batidora"
            checked={utensilios.includes('batidora')}
            onChange={handleUtensiliosChange}
            inline
          />
        </div>
      </FormGroup>
      <FormGroup>
        <Label>Dificultad</Label>
        <div>
          <CustomInput
            type="checkbox"
            id="facil"
            label="Fácil"
            value="facil"
            checked={dificultades.includes('facil')}
            onChange={handleDificultadChange}
          />
          <CustomInput
            type="checkbox"
            id="intermedio"
            label="Intermedio"
            value="intermedio"
            checked={dificultades.includes('intermedio')}
            onChange={handleDificultadChange}
          />
          <CustomInput
            type="checkbox"
            id="dificil"
            label="Difícil"
            value="dificil"
            checked={dificultades.includes('dificil')}
            onChange={handleDificultadChange}
      />
    </div>
  </FormGroup>
  <Button onClick={handleSubmit}>Crear receta</Button>
</Form>
);
};

export default CreateRecipeForm;