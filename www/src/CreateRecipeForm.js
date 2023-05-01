import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider);

const CreateRecipeForm = ({askChat}) => {
  
  const [buttonDisable, setButtonDisable] = useState(false);
  const [ingredientes, setIngredientes] = useState('');
  const [tiempo, setTiempo] = useState(15);
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
    if (buttonDisable) {
        return;
    }
    setButtonDisable(true);
    
    const utensiliosText = utensilios.join(', ');
    const dificultadText = dificultades.join(', ');
    const tiempoText = `${tiempo} minutos`;
//Tarea: Crea una receta de comida siguiendo estrictamente estas reglas: 1- Ingredientes disponibles: Mantequilla, leche. 2- Herramientas de cocina disponibles: horno, microondas, licuadora, freidora de aire, estufa. 3- Tiempo de cocción: Menos de 15 minutos. 4- Dificultad de ejecución: Fácil. 5- Uso de ingredientes: Puedes usar CUALQUIER ingrediente disponible a tu discreción. NO USES NINGÚN INGREDIENTE QUE NO SEA PARA COCINAR. 6- Muestra las unidades utilizando tanto el sistema métrico como el imperial. Responde con key:value donde las keys seran: recipeName, ingredients, tools, time, difficulty, instructions
    //const texto = `Crea una receta con los siguientes ingredientes: ${ingredientes}. Puedes usar los siguientes utensilios: ${utensiliosText}. La dificultad debe ser ${dificultadText} y tardar en hacerse ${tiempoText}.`;
    const texto = `Tarea: Crea una receta de comida siguiendo estrictamente estas reglas: 1- Ingredientes disponibles: ${ingredientes}. 2- Herramientas de cocina disponibles: ${utensiliosText}. 3- Tiempo de cocción: ${tiempoText}. 4- Dificultad de ejecución: ${dificultadText}. 5- Uso de ingredientes: Puedes usar CUALQUIER ingrediente disponible a tu discreción, no hace falta que sean todos. Usa MARKDOWN al responder.`;
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
          step={10}
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
  <Button onClick={handleSubmit} disabled={buttonDisable}>{buttonDisable ? 'Creando receta...' : 'Crear receta'}</Button>
</Form>
);
};

export default CreateRecipeForm;