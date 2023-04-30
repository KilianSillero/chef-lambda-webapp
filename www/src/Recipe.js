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
      
      <Jumbotron>
          <ShowRecipe recipeText={recipeText} parseRecipeText={parseRecipeText}/>
          
          <h2>Si te ha gustado la receta guardala!</h2>
          <Form inline>
            <FormGroup xs="8">
              <Label for="newRecipe" hidden>Recipe</Label>
              <Input type="text" name="recipe" id="newRecipe" value={recipeName} placeholder="nombre" />
            </FormGroup>
            <Button onClick={(e) => addRecipe(recipeText)} color="primary" className="ml-1">Guardar</Button>
          </Form>
      </Jumbotron>
    </div >
  );
}

export default Recipe;
