import React, { useState } from 'react';
import { Button, ButtonGroup, Form, FormGroup, Input, Label, Row, Col, Jumbotron, Modal , ModalHeader, ModalBody} from 'reactstrap';
import ShowRecipe from './ShowRecipe'

import './SavedRecipes.css';

function SavedRecipes({ recipes, deleteRecipe, completeRecipe, parseRecipeText }) {


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

    return (
        <div className="SavedRecipes">
      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Receta</ModalHeader>
        <ModalBody>
           <ShowRecipe recipeText={recipeText} parseRecipeText={parseRecipeText}/>

        </ModalBody>
      </Modal>
      
      <Row>
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
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => deleteRecipe(index, item.id)} color="danger" size="sm" className="float-right recipeButton" title="Borrar Receta">
                      <span className="oi oi-delete"></span>
                    </Button>
                    <Button data-index={index} data-item-id={item.id} onClick={(e) => completeRecipe(item.id)} outline={!item.completed} disabled={item.completed} color="success" size="sm" className="float-right recipeButton" title="Complete Recipe">
                      <span className="oi oi-check"></span>
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
