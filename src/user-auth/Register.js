import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import validateSignUp from './Registervalidate';
import Swal from 'sweetalert2';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Register= () => {
    const [form, setForm] = useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
    });

    const set = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      if(validateSignUp(form)){
        const docRef = await addDoc(collection(db, "personal-diary-tables"), {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        });
        
        Swal.fire({
          icon:'success',
          title: 'Registration successful',
          showConfirmButton: true,
        }).then(function() {
          console.log("Document written with ID: ", docRef.id);
          window.location.href="/sign-in";
        });
        setForm({
          name: "", email: "", password: "", confirmPassword: ""
        });
      }
    } catch (e) {
        console.error("Error adding document: ", e);
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          showConfirmButton: true,
        });
      }
  }


  return (
    <div>
      <Container fluid style={{backgroundImage: "url(https://images.unsplash.com/photo-1522836924445-4478bdeb860c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D&w=1000&q=80)"}}>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
              <Card className="shadow px-4">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">Register</h2>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">
                            Name
                          </Form.Label>
                          <Form.Control type="text" name='name' value={form.name} onChange={(e)=>{ set(e)}} placeholder="Enter Name"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control type="email" name="email" value={form.email} onChange={(e)=>{ set(e)}} placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                          >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" value={form.password} onChange={(e)=>{ set(e)}} placeholder="Password"/>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                          >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={(e)=>{ set(e)}} placeholder="Password"/>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                          >
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit" >
                            Register
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                        Already have an account??{" "}
                          <a href="/sign-in" className="text-primary fw-bold">
                            Login
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}
export default Register;