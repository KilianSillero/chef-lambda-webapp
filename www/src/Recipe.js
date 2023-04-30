import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

import './Recipe.css';

function Recipe({ recipeText, recipes, addRecipe, deleteRecipe, completeRecipe }) {
  
  function parseRecipeText(text) {
    // Divide el texto de la receta por saltos de línea para obtener cada línea por separado
    const lines = text.split('\n');
  
    // Busca la línea que comienza con "Nombre de la receta:" y extrae el nombre de la receta
    const recipeName = lines.find((line) => line.startsWith('recipeName:')).split(':')[1].trim();
  
    // Busca la línea que comienza con "Ingredientes:" y extrae los ingredientes como una lista
    const ingredients = lines.find((line) => line.startsWith('ingredients:')).split(':')[1].split(',').map((ingredient) => ingredient.trim());
  
    // Busca la línea que comienza con "Herramientas de cocina:" y extrae las herramientas como una lista
    const tools = lines.find((line) => line.startsWith('tools:')).split(':')[1].split(',').map((tool) => tool.trim());
  
    // Busca la línea que comienza con "Tiempo de cocción:" y extrae el tiempo de cocción
    const time = lines.find((line) => line.startsWith('time:')).split(':')[1].trim();
  
    // Busca la línea que comienza con "Dificultad de ejecución:" y extrae la dificultad
    const difficulty = lines.find((line) => line.startsWith('difficulty:')).split(':')[1].trim();
    
    const instructions = lines.find((line) => line.startsWith('instructions:')).split(':')[1].trim();
  
    // Devuelve un objeto con las variables de la receta
    return {
      recipeName,
      ingredients,
      tools,
      time,
      difficulty,
    };
  }

  const [filter, setFilter] = useState('all');
  const { recipeName, ingredients, tools, time, difficulty, instructions } = parseRecipeText(recipeText);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="Recipe">
      
      <Row>
        <Col xs="12" className="mt-1 mb-1">
          <h1>Receta</h1>
          <h2>{recipeName}</h2>
          <h3>Ingredientes:</h3>
          <ul>
            {ingredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
          <h3>Herramientas de cocina:</h3>
          <ul>
            {tools.map((tool, i) => (
              <li key={i}>{tool}</li>
            ))}
          </ul>
          <h3>Tiempo de cocción:</h3>
          <p>{time}</p>
          <h3>Dificultad de ejecución:</h3>
          <p>{difficulty}</p>
          <h3>Pasos a seguir:</h3>
          <p>{instructions}</p>
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="mt-1 mb-1">
          <Form inline>
            <FormGroup>
              <Label for="newRecipe" hidden>Recipe</Label>
              <Input type="text" name="recipe" id="newRecipe" placeholder="new item" />
            </FormGroup>
            <Button onClick={addRecipe} color="primary" className="ml-1">Add</Button>
          </Form>
        </Col>
        <Col xs="12" className="mt-1 mb-1">
          <ButtonGroup>
            <Button onClick={(e) => changeFilter('all')} color={(filter === 'all') ? 'primary' : 'secondary'}>All</Button>
            <Button onClick={(e) => changeFilter('complete')} color={(filter === 'complete') ? 'primary' : 'secondary'}>Complete</Button>
            <Button onClick={(e) => changeFilter('incomplete')} color={(filter === 'incomplete') ? 'primary' : 'secondary'}>Incomplete</Button>
          </ButtonGroup>
        </Col>
        <Col xs="12" className="mt-1 mb-1">
          <ul className="list-group">
            {recipes.filter(item => ((filter === 'all') || (filter === 'complete' && item.completed) || (filter === 'incomplete' && !item.completed))).map((item, index) => (
              <li className="list-group-item" key={item.id}>
                <Row>
                  <Col xs="7" sm="8" className={item.completed ? 'completed' : ''}>
                    {item.item}
                  </Col>
                  <Col xs="5" sm="4">
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => deleteRecipe(index, item.id)} color="danger" size="sm" className="float-right recipeButton" title="Delete Recipe">
                      <span className="oi oi-delete"></span>
                    </Button>
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => completeRecipe(item.id)} outline={!item.completed} disabled={item.completed} color="success" size="sm" className="float-right recipeButton" title="Complete Recipe">
                      <span className="oi oi-check"></span>
                    </Button>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div >
  );
}

export default Recipe;
