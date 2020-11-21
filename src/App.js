import React from "react";
import {Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import HomeView from "./views/HomeView";
import {RolView} from "./views/RolView";
import UserView from "./views/UserView";
import ProductView from "./views/ProductView";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

function App() {
    return (
        <div className="App">

            <Router>
                <Navbar bg="danger" variant="dark" expand="lg">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Link to="/">Home</Link>
                            <Link to="/rol">Roles</Link>
                            <Link to="/users">Usuarios</Link>
                            <Link to="/products">Productos</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Switch>
                    <Route exact={true} path="/" component={HomeView}/>
                    <Route path="/rol" component={RolView}/>
                    <Route path="/users" component={UserView}/>
                    <Route path="/products" component={ProductView}/>
                </Switch>
            </Router>

        </div>
    );
}

export default App;
