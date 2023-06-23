import React from 'react';
import {Row, Col, Card, CardBody, CardTitle, CardText, Button, Container } from 'reactstrap';

const LandingPage = ({logged}) => {
return (
<Container>
  <h2 className="mt-0 text-center">
    ¡Disfruta de comidas saludables y deliciosas, y haz que cocinar sea una experiencia divertida y emocionante!
  </h2>

  <Card className="my-3">
    <CardBody>
      <Row>
        <Col>
        <CardTitle tag="h2">Macros</CardTitle>
        <CardText>
          ¡Planifica tus comidas de manera inteligente y saludable considerando los macronutrientes que necesitas para
          alcanzar tus objetivos de fitness! Explora una amplia variedad de recetas que se ajusten a tus preferencias
          dietéticas y estilo de vida, ¡y descubre nuevas opciones deliciosas para tus comidas diarias!
        </CardText>
        </Col>
        <Col xs="12 text-center" md="auto">
        <span className="emote ">💪</span>
        </Col>
      </Row>
      {logged ?
      <Button className="btn-round" color="primary" block href="/macros">Receta macronutrientes</Button>
      : null}
    </CardBody>
  </Card>
  <Card className="my-3">
    <CardBody>
      <Row>
        <Col>
        <CardTitle tag="h2">Estilo</CardTitle>
        <CardText>
          En nuestra plataforma encontrarás un sinfín de recetas adaptadas a tus gustos y necesidades, ¡y siempre
          tendrás la libertad de elegir! ¿Te provoca algo dulce? ¿Un platillo principal? ¿Algo completamente diferente?
          ¡No hay problema! Además, puedes especificar tus restricciones alimentarias, como la intolerancia a la lactosa
          o al gluten, para que te presentemos opciones que sean perfectas para ti.
        </CardText>
        </Col>
        <Col xs="12 text-center" md="auto">
        <span className="emote ">🍣</span>
        </Col>
      </Row>
      {logged ?
      <Button className="btn-round" color="primary" block href="/style">Receta estilo</Button>
      : null}
    </CardBody>
  </Card>

  <Card className="my-3">
    <CardBody>
      <Row>
        <Col>
        <CardTitle tag="h2">Despensa</CardTitle>
        <CardText>
          Y para esos días en que no sabes qué cocinar, ¡nuestro creador de recetas te ayudará a encontrar el plato
          perfecto! Simplemente ingresa los ingredientes que tienes en casa, elige el nivel de dificultad y tiempo de
          preparación que te convenga, ¡y deja que la magia suceda en tu cocina!

        </CardText>
        </Col>
        <Col xs="12 text-center" md="auto">
        <span className="emote ">🥫</span>
        </Col>
      </Row>
      {logged ?
      <Button className="btn-round" color="primary" block href="/ingredients">Receta despensa</Button>
      : null}
    </CardBody>
  </Card>
</Container>
);
};

export default LandingPage;