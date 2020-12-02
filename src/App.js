import React, { useState } from "react";
import {Navbar, Nav, Image, Form, Button} from "react-bootstrap";
import HomeView from "./views/HomeView";
import {RolView} from "./views/RolView";
import UserView from "./views/UserView";
import ProductView from "./views/ProductView";
import Admin from "./views/Admin";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Swal from 'sweetalert2';
import LogoApp from './assets/img/logolospacos.svg';
import LoginModal from './components/LoginModal';
import CreateUserModal from './components/CreateUserModal'
import Footer from "./components/footer";

function App() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    var userGet;
    const handleClose = () =>{
        setShow(false)
    }

    const handleClose2 = () =>{
        setShow2(false)
    }


    const handleOpenModal = () =>{
        setShow(true)
    }

    const handleOpenModal2 = () =>{
        setShow2(true)
    }

    const handleLogout =() =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ml-1',
              cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            allowOutsideClick: false,
            showCancelButton: true,
            title: 'Cerrar sesión',
            text: '¿Esta seguro de cerrar su sesión?',
            confirmButtonText: 'SI',
            cancelButtonText: 'Cancelar',
            icon: 'indo',
            reverseButtons: true 
            }).then((resp) => {
                if (resp.isConfirmed) {
                     //swalWithBootstrapButtons.close()
                    console.log(resp);
                    swalWithBootstrapButtons.fire( {   
                        allowOutsideClick: false,
                        title:'sesión cerrada', 
                        icon: 'success',
                        timer: 2500
                    }).then((resp) =>{
                        localStorage.clear();
                        window.location.pathname ='/';   
                    })                                    
                } else if (                               
                    resp.dismiss === Swal.DismissReason.cancel
                ){
                    swalWithBootstrapButtons.fire(
                        {   
                            title: 'la sesión no se ha cerrado',     
                            icon: 'info',
                        })
                }
        }) 
    }

    return (
        <div className="App">

            <Router>
                <Navbar className="fixed-top" bg="warning" variant="dark" expand="lg">
                    <Navbar.Brand>
                        <Image height={50}  src={LogoApp}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link className= "custom-Link" to="/">Home</Link>
                            <Link className= "custom-Link none" to="/rol">Roles</Link>
                            <Link className= "custom-Link none" to="/users">Usuarios</Link>
                            <Link className= "custom-Link none" to="/products">Productos</Link>
                            {
                                localStorage.getItem('token') &&
                                <Link className= "custom-Link" to="/admin">Administrador</Link>
                            }
                      </Nav>

                        <Nav className="ml-auto">
                            {
                            !localStorage.getItem('token') &&
                                <Nav.Link>
                                <Button variant="primary" onClick={handleOpenModal}>Login</Button>
                                </Nav.Link>
                            }

                        
                            {
                            !localStorage.getItem('token') &&
                                <Nav.Link>
                                <Button variant="success" onClick={handleOpenModal2}>Registro</Button>{' '}
                                </Nav.Link>
                            }                  
                            {
                               
                                localStorage.getItem('token') &&
                                <Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>Logout</Button>
                                </Nav.Link>
                            }
                       </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact={true} path="/" component={HomeView}/>
                    <Route path="/rol" component={RolView}/>
                    <Route path="/users" component={UserView}/>
                    <Route path="/products" component={ProductView}/>
                    <Route path="/admin" component={Admin}/>
                </Switch>
                {
                    show && <LoginModal show={show} handleClose= {handleClose}/>
                }
                {
                    show2 && <CreateUserModal show={show2} handleClose= {handleClose2}/>
                }
            </Router>

            <Footer/>

        </div>

    );
}

export default App;
