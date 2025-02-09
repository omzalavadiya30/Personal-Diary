import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import './Errorpage.css';

export const Errorpage = () => {
    return(
    <Container fluid className="not-found-page" style={{backgroundColor:"lightgreen", justifyContent: "center"}}>
    <Row className="justify-content-center align-items-center">
      <Col md={6} className="text-center">
        <Card style={{margin: "200px 60px 200px 60px", justifyContent: "center", alignContent: "center"}}>
          <Card.Body>
            <h1 className="display-4">404</h1>
            <h2 className="mb-4">Oops! Page Not Found</h2>
            <p className="lead">The page you are looking for could not be found.</p>
            <Button variant="primary" href='/diary'>Go back to Home</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
    );
}