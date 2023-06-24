import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Jumbotron, Row, Col, Alert, Navbar, NavbarBrand, Nav, NavItem, UncontrolledCollapse, NavLink } from 'reactstrap';

import axios from 'axios';
import Recipe from './Recipe'
import SavedRecipes from './SavedRecipes'

import CreateRecipeForm from './CreateRecipeForm'
import CreateMacroRecipeForm from './CreateMacroRecipeForm'
import CreateStyleRecipeForm from './CreateStyleRecipeForm'
import LandingPage from './LandingPage'


import './App.css';

import config from './config';

function App() {
  const [idToken, setIdToken] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipeText, setRecipeText] = useState('');

  useEffect(() => {
    getIdToken();
    if (idToken.length > 0 && (window.location.pathname === "/saved-recipes" || window.location.pathname === "/saved-recipes/")) {
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


  const clearCredentials = () => {
    // Borrar la cookie que contiene el token
    document.cookie = "id_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = config.redirect_url;
  };

  const getIdToken = () => {
    // Buscar la cookie que contiene el token
    const name = "id_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    let idToken = null;
    cookieArray.forEach(cookie => {
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        idToken = cookie.substring(name.length, cookie.length);
      }
    });

    // Si la cookie existe, devolver el token
    if (idToken?.length > 0) {
      setIdToken(idToken);
      return idToken;
    }

    // Si la cookie no existe, obtener el token de la URL
    const hash = window.location.hash.substr(1);
    const objects = hash.split("&");
    objects.forEach(object => {
      const keyVal = object.split("=");
      if (keyVal[0] === "id_token") {
        idToken = keyVal[1];
        const expires = new Date();
        // Set the expiration time to one hour from now
        expires.setTime(expires.getTime() + (60 * 60 * 1000));
        document.cookie = `id_token=${idToken};expires=${expires.toUTCString()};path=/`;
        setIdToken(idToken);
      }
    });

    return idToken;
  };


  const getAllRecipes = async () => {
    if (idToken.length > 0) {
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
      "favorite": false
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
      //getAllRecipes();
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

  const favRecipe = async (itemId, itemFavorite) => {
    if (itemId === null) return;

    const favOrUnfav = itemFavorite ? "unfav" : "fav";

    const result = await axios({
      method: 'POST',
      url: `${config.api_base_url}/item/${itemId}/${favOrUnfav}`,
      headers: {
        Authorization: idToken
      }
    });

    if (result && result.status === 200) {
      //getAllRecipes();
    }
  }

  const askChat = async (q) => {

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
      const recipe = result.data.body
      setRecipeText(recipe);
    }
  }
  const [bodyClick, setBodyClick] = useState(false);
  return (
    <Router>
      <div className="App">

        {bodyClick ? (
          <div
            id="bodyClick"
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setBodyClick(false);
            }}
          />
        ) : null}
        <Navbar color="primary" light expand="lg">
          <Container>
            <NavbarBrand href="/">🍲 NutriChef</NavbarBrand>
            <button
              className="navbar-toggler"
              id="navbarNav"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setBodyClick(true);
              }}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbarNav">
              <Nav className="ml-auto" navbar>
              {idToken.length === 0 ? (
              
                <NavItem>
                  <NavLink href={`https://${config.cognito_hosted_domain}/login?response_type=token&client_id=${config.aws_user_pools_web_client_id}&redirect_uri=${config.redirect_url}`}>
                    Iniciar Sesión
                  </NavLink>
                </NavItem>
                ) : null}
                {idToken.length > 0 ? (
                  <>
                    <NavItem>
                      <NavLink href="/saved-recipes">Mis Recetas 📔</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/macros">Macros 💪</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/style">Estilo 🍣</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/ingredients">Despensa 🥫</NavLink>
                    </NavItem>
                  </>
                ) : null}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
        <Container>
          <Jumbotron className='mt-2'>
            <Row>
              <Col md="12">
                {idToken.length > 0 ? (
                  <Switch>
                    <Route
                      exact
                      path="/"
                      component={() => (
                        <div>
                          <LandingPage logged={true} />
                        </div>
                      )}
                    />
                    <Route
                      exact
                      path="/ingredients"
                      component={() => (
                        <div>
                          <CreateRecipeForm askChat={askChat} />
                          {recipeText ? (
                            <Recipe
                              recipeText={recipeText}
                              addRecipe={addRecipe}
                            />
                          ) : null}
                        </div>
                      )}
                    />
                    <Route
                      exact
                      path="/saved-recipes"
                      component={() => (
                        <SavedRecipes
                          getAllRecipes={getAllRecipes}
                          recipes={recipes}
                          deleteRecipe={deleteRecipe}
                          favRecipe={favRecipe}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/macros"
                      component={() => (
                        <div>
                          <CreateMacroRecipeForm askChat={askChat} />
                          {recipeText ? (
                            <Recipe
                              recipeText={recipeText}
                              addRecipe={addRecipe}
                            />
                          ) : null}
                        </div>
                      )}
                    />
                    <Route
                      exact
                      path="/style"
                      component={() => (
                        <div>
                          <CreateStyleRecipeForm askChat={askChat} />
                          {recipeText ? (
                            <Recipe
                              recipeText={recipeText}
                              addRecipe={addRecipe}
                            />
                          ) : null}
                        </div>
                      )}
                    />
                  </Switch>
                ) : (
                  <>
                    <Alert>Inicia sesión o crea una cuenta</Alert>

                    <LandingPage logged={false} />

                  </>
                )}
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    </Router>

  );
}

export default App;
