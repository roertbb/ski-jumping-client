import React, { Component } from 'react';
import { Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';
import Tournament from './pages/tournament/TournamentPage';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Tournament />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
