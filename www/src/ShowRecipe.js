import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col, Jumbotron } from 'reactstrap';
import ReactMarkdown from 'react-markdown'


function ShowRecipe({ recipeText }) {

  //const { recipeName, ingredients, tools, time, difficulty, instructions } = parseRecipeText(recipeText);

  return (
    <ReactMarkdown>{recipeText}</ReactMarkdown>
    // <div className="Recipe">
      
    //   <h2>{recipeName}</h2>
    //   <h3>Ingredientes:</h3>
    //   <ul>
    //     {ingredients.map((ingredient, i) => (
    //       <li key={i}>{ingredient}</li>
    //     ))}
    //   </ul>
    //   <h3>Herramientas de cocina:</h3>
    //   <ul>
    //     {tools.map((tool, i) => (
    //       <li key={i}>{tool}</li>
    //     ))}
    //   </ul>
    //   <h3>Cuanto se tarda:</h3>
    //   <p>{time} minutos</p>
    //   <h3>Dificultad de ejecución:</h3>
    //   <p>{difficulty}</p>
    //   <h3>Pasos a seguir:</h3>
    //     {instructions.map((instruction, i) => (
    //       <p key={i}>{instruction}</p>
    //     ))}
          
    // </div >
  );
}

export default ShowRecipe;
