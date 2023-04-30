import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Alert, Button } from 'reactstrap';
import axios from 'axios';
import Recipe from './Recipe'
import SavedRecipes from './SavedRecipes'

import CreateRecipeForm from './CreateRecipeForm'

import './App.css';

import config from './config';

function App() {
  const [alert, setAlert] = useState();
  const [alertStyle, setAlertStyle] = ('info');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertDismissable, setAlertDismissable] = useState(false);
  const [idToken, setIdToken] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipeText, setRecipeText] = useState('');

  useEffect(() => {
    getIdToken();
    if (idToken.length > 0) {
      getAllRecipes();
    }
  }, [idToken]);

  axios.interceptors.response.use(response => {
    console.log('Response was received');
    return response;
  }, error => {
    window.location.href = config.redirect_url;
    return Promise.reject(error);
  });

  function onDismiss() {
    setAlertVisible(false);
  }

  function updateAlert({ alert, style, visible, dismissable }) {
    setAlert(alert ? alert : '');
    setAlertStyle(style ? style : 'info');
    setAlertVisible(visible);
    setAlertDismissable(dismissable ? dismissable : null);
  }

  const clearCredentials = () => {
    window.location.href = config.redirect_url;
  }

  const getIdToken = () => {
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        setIdToken(keyVal[1]);
      }
    });
  };

  const getAllRecipes = async () => {
    const result = await axios({
      url: `${config.api_base_url}/item/`,
      headers: {
        Authorization: idToken
      }
    }).catch(error => {
      console.log(error);
    });

    console.log(result);

    if (result && result.status === 401) {
      clearCredentials();
    }
    else if (result && result.status === 200) {
      console.log(result.data.Items);
      setRecipes(result.data.Items);
    }
  };

  const addRecipe = async (recipeText) => {
    const newRecipeInput = document.getElementById('newRecipe');
    const item = newRecipeInput.value;
    console.log(item);
    if (!item || item === '') return;

    const newRecipe = {
      "item": item,
      "recipe": recipeText,
      "completed": false
    };

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/item/`,
      headers: {
        Authorization: idToken
      },
      data: newRecipe
    });

    if (result && result.status === 401) {
      clearCredentials();
    }
    else if (result && result.status === 200) {
      getAllRecipes();
      newRecipeInput.value = '';
    }
  }

  const deleteRecipe = async (indexToRemove, itemId) => {
    if (indexToRemove === null) return;
    if (itemId === null) return;

    const result = await axios({
      method: 'DELETE',
      url: `${config.api_base_url}/item/${itemId}`,
      headers: {
        Authorization: idToken
      }
    });

    if (result && result.status === 401) {
      clearCredentials();
    }
    else if (result && result.status === 200) {
      const newRecipes = recipes.filter((item, index) => index !== indexToRemove);
      setRecipes(newRecipes);
    }
  }

  const completeRecipe = async (itemId) => {
    if (itemId === null) return;

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/item/${itemId}/done`,
      headers: {
        Authorization: idToken
      }
    });

    if (result && result.status === 200) {
      getAllRecipes();
    }
  }

  const askChat = async (q) => {
    
    //PRRUEBA
    const textPrueba = "[\n  {\n    \"recipeName\": \"Fajitas de pollo con verduras y yogur\",\n    \"difficulty\": \"Intermedio\",\n    \"preparationTime\": 15,\n    \"ingredients\": [\"pollo\", \"fajitas\", \"verduras\", \"yogur\", \"sal\", \"pimienta\", \"ajo\", \"pimenton\", \"huevos\"],\n    \"kitchenToolsUsed\": [\"sartén\"],\n    \"instructions\": [\n      \"1. Cortar el pollo y las verduras en tiras delgadas.\",\n      \"2. En un sartén caliente, agregar un poco de aceite y dorar el pollo por unos minutos. Agregar las verduras y cocinar por 5 minutos hasta que estén suaves.\",\n      \"3. Agregar sal, pimienta, ajo y pimentón al gusto.\",\n      \"4. Cocinar las fajitas siguiendo las instrucciones del paquete.\",\n      \"5. En un sartén aparte, batir los huevos hasta que estén espumosos. Agregar sal y pimienta al gusto. Cocinar en un sartén caliente hasta que estén firmes.\",\n      \"6. Servir las fajitas con el pollo y las verduras encima, añadir los huevos revueltos y un poco de yogur.\"\n    ]\n  }\n]"

    setRecipeText(textPrueba)
    return
    
    const question = {
      "question": q
    };

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/gpt/`,
      headers: {
        Authorization: idToken
      },
      data: question
    });

    if (result && result.status === 401) {
      clearCredentials();
    }
    else if (result && result.status === 200) {
      console.log(result)
      const recipe = JSON.stringify(result.data)
      setRecipeText(recipe);
    }
  }
  
  function parseRecipeText(text) {
    // Divide el texto de la receta por saltos de línea para obtener cada línea por separado
    const json = JSON.parse(text);
    const objReceta = json[0]
    const recipeName = objReceta.recipeName;
    const ingredients = objReceta.ingredients;
    const tools = objReceta.kitchenToolsUsed;
    const time = objReceta.preparationTime;
    const difficulty = objReceta.difficulty;
    const instructions = objReceta.instructions;
  
    // Devuelve un objeto con las variables de la receta
    return {
      recipeName,
      ingredients,
      tools,
      time,
      difficulty,
      instructions,
    };
  }
  return (
    <div className="App">
      <Container>
        <Alert color={alertStyle} isOpen={alertVisible} toggle={alertDismissable ? onDismiss : null}>
          <p dangerouslySetInnerHTML={{ __html: alert }}></p>
        </Alert>
        <header>
          <Row>
            <Col md="10" className="logo">
              <h1>Chef AI</h1>
              <p>Infinitas recetas a tu alcance.</p>
            </Col>
            <Col md="2">
              <Button
                href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}
                color="primary"
                className="mt-5 float-right"
              >
                Log In
              </Button>
            </Col>
          </Row>
        </header>
        <Jumbotron>
          <Row>
            <Col md="12">
              {idToken.length > 0 || true ?
                (
                  <div>
                    <SavedRecipes recipes = { recipes } deleteRecipe = { deleteRecipe } completeRecipe = { completeRecipe } parseRecipeText={parseRecipeText}/>
                    <CreateRecipeForm askChat={askChat}/>
                    {recipeText ? <Recipe recipeText = { recipeText } addRecipe = { addRecipe } recipes = { recipes } deleteRecipe = { deleteRecipe } completeRecipe = { completeRecipe } parseRecipeText={parseRecipeText} /> : null}
                  </div>
                ) : (
                  <p>
                    Para usar esta herramienta necesitas iniciar sesión
                  </p>
                )
              }
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    </div >
  );
}

export default App;
