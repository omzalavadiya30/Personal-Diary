import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import validateLogin from "./loginvalidate";
import { useState } from "react";
import Swal from "sweetalert2";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login= ({setLogin}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email:"",
    password:"",
  });

  const set = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const a = "personal-diary-tables"

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      if(validateLogin(form)){
        const q = query(collection(db, a), where("email", "==", form.email));
        const querySnapshot= await getDocs(q);
        if(querySnapshot.empty){
          Swal.fire({
            icon: "error",
            title: "Email is not exists",
            showConfirmButton: true,
            });
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          if (data.password===form.password) {
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                showConfirmButton: true,
              }).then(function() {
                localStorage.setItem('user',JSON.stringify(data))
                setLogin(data);
                navigate('/diary');
              });
            
          }else{
            Swal.fire({
              icon: "error",
              title: "Invalid Password",
              showConfirmButton: true,
            });
          }
        });

        setForm({
          email: "", password: ""
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
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
              <div className="border border-3 border-primary"></div>
              <Card>
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">Login</h2>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control type="email" name="email" value={form.email} onChange={(e)=>{ set(e)}} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                          >
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" name="password" value={form.password} onChange={(e)=>{ set(e)}} placeholder="Password" />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <p className="small">
                            <a className="text-primary" href="#!">
                              Forgot password?
                            </a>
                          </p>
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Don't have an account?{" "}
                          <a href="/sign-up" className="text-primary fw-bold">
                            Register
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
  );
}
export default Login;