import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col, Jumbotron, Modal , ModalHeader, ModalBody} from 'reactstrap';
import ShowRecipe from './ShowRecipe'

import './SavedRecipes.css';

function SavedRecipes({ getAllRecipes, recipes, deleteRecipe, favRecipe, parseRecipeText }) {


    const [modal, setModal] = useState(false);
    const [recipeText, serRecipeText] = useState("");
    const toggle = () => setModal(!modal);


    const [filter, setFilter] = useState('all');

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    };

    const seeRecipe = (recipeText) => {
        serRecipeText(recipeText);
        toggle();
    };
    useEffect(() => {
      getAllRecipes();
    }, []);

    return (
        <div className="SavedRecipes">
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Receta</ModalHeader>
        <ModalBody>
           <ShowRecipe recipeText={recipeText}/>

        </ModalBody>
      </Modal>
      
      <Row>
        <Col xs="12" className="mt-1 mb-1">
          <ButtonGroup>
            <Button onClick={(e) => changeFilter('all')} color={(filter === 'all') ? 'primary' : 'secondary'}>Todas</Button>
            <Button onClick={(e) => changeFilter('favorite')} color={(filter === 'favorite') ? 'primary' : 'secondary'}>Favoritas</Button>
          </ButtonGroup>
        </Col>
        
        <Col xs="12" className="mt-1 mb-1">
          <ul className="list-group">
            {recipes.filter(item => ((filter === 'all') || (filter === 'favorite' && item.favorite))).map((item, index) => (

              <li className="list-group-item" key={item.id}>
                <Row>
                  <Col xs="7" sm="8" className={item.favorite ? 'favorite' : ''}>
                    {item.item}
                  </Col>
                  <Col xs="5" sm="4">
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => deleteRecipe(index, item.id)} color="danger" size="sm" className="float-right recipeButton" title="Borrar Receta">
                      <span className="oi oi-delete"></span>
                    </Button>
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => favRecipe(item.id, item.favorite)} outline={!item.favorite} color="success" size="sm" className="float-right recipeButton" title="Favoritas">
                      <span className="oi oi-star"></span>
                    </Button>
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => seeRecipe(item.recipe)} color="info" size="sm" className="float-right recipeButton" title="Ver receta">
                      <span className="oi oi-eye"></span>
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

export default SavedRecipes;
