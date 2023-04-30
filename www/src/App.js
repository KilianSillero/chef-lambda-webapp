import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Alert, Button } from 'reactstrap';
import axios from 'axios';
import Recipe from './Recipe'
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

  const addRecipe = async (event) => {
    const newRecipeInput = document.getElementById('newRecipe');
    const item = newRecipeInput.value;
    console.log(item);
    if (!item || item === '') return;

    const newRecipe = {
      "item": item,
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
    
    // //PRRUEBA
    // const textPrueba = "recipeName: Fajitas de pollo y verduras con yogurt\n\ningredients: \n- 1 pechuga de pollo\n- 1 paquete de fajitas de trigo\n- 1 taza de verduras mixtas (cebolla, tomate, pimiento)\n- 1/2 taza de yogur natural\n- Sal y pimienta al gusto\n- 1 diente de ajo picado\n- 1 pimiento rojo en tiras\n- 2 huevos\n\ntools: Sartén\n\ntime: 15 minutos\n\ndifficulty: Fácil\n\nInstrucciones:\n\n1. Cortar el pollo en tiras finas y sazonarlo con sal y pimienta. Reservar.\n2. Calentar la sartén a fuego medio y agregar las fajitas de trigo para que se calienten por ambos lados. Retirar de la sartén y reservar.\n3. En la misma sartén, agregar las tiras de pollo y cocinar por 5 minutos o hasta que estén doradas.\n4. Agregar las verduras picadas y el pimiento rojo en tiras y saltear durante 3-5 minutos.\n5. Batir los huevos en un recipiente aparte y agregarlos a la sartén con el pollo y las verduras. Revolver hasta que estén cocidos.\n6. Rellenar las fajitas calientes con la mezcla de pollo y verduras.\n7. Servir con una cucharada de yogur natural encima de las fajitas rellenas."

    // setRecipeText(textPrueba)
    // return
    
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
                className="mt-5 float-center"
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
                    <CreateRecipeForm askChat={askChat}/>
                    {recipeText ? <Recipe recipeText = { recipeText } addRecipe = { addRecipe } recipes = { recipes } deleteRecipe = { deleteRecipe } completeRecipe = { completeRecipe }/> : null}
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
