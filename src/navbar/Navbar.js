import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './Navbar.css';

const DiaryNavbar = ({setLogin}) => {

  const localuser = JSON.parse(localStorage.getItem("user"));

  const handlelogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setLogin(localStorage.clear());
        window.location.href = '/sign-in';
      }
    });
  }

  return (
    <Navbar className='nav bg-warning' collapseOnSelect  expand="sm"  variant="dark">
      <Container fluid>
        <Navbar.Brand className="title" href="/diary"><h4>Personal Diary</h4></Navbar.Brand>
        <h5 className='name'>Welcome {localuser.name}</h5>
        <Button className='navbtn' variant="primary" onClick={handlelogout} >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default DiaryNavbar;
