import { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import ShowRecipe from './ShowRecipe'

function Recipe({ recipeText, addRecipe }) {

const [buttonText, setButtonText] = useState("Guardar");
const [buttonDisabled, setButtonDisabled] = useState(false);

function addRecipeClick(recipeText) {
  setButtonText("Guardado");
  setButtonDisabled(true);
  addRecipe(recipeText);
}

  return (
    <div className="Recipe">
      
          <ShowRecipe recipeText={recipeText}/>
          
          <h2>Si te ha gustado la receta guardala!</h2>
          <Form className="d-flex" inline>
            <FormGroup className="flex-fill">
            <Input
              type="text"
              name="recipe"
              id="newRecipe"
              placeholder="nombre de la receta"
              className="w-100"
            />
          </FormGroup>
          <Button
            onClick={(e) => addRecipeClick(recipeText)}
            color="primary"
            className="ml-1"
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        </Form>
    </div >
  );
}

export default Recipe;
