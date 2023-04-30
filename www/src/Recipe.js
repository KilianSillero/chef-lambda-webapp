import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col, Jumbotron } from 'reactstrap';
import ShowRecipe from './ShowRecipe'

import './Recipe.css';

function Recipe({ recipeText, addRecipe, parseRecipeText }) {

  const [filter, setFilter] = useState('all');
  const { recipeName, ingredients, tools, time, difficulty, instructions } = parseRecipeText(recipeText);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="Recipe">
      
          <ShowRecipe recipeText={recipeText} parseRecipeText={parseRecipeText}/>
          
          <h2>Si te ha gustado la receta guardala!</h2>
          <Form className="d-flex" inline>
            <FormGroup className="flex-fill">
            <Input
              type="text"
              name="recipe"
              id="newRecipe"
              defaultValue={recipeName}
              placeholder="nombre de la receta"
              className="w-100"
            />
          </FormGroup>
          <Button
            onClick={(e) => addRecipe(recipeText)}
            color="primary"
            className="ml-1"
          >
            Guardar
          </Button>
        </Form>
    </div >
  );
}

export default Recipe;
