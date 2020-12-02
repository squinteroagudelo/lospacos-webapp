import React, {useState, useEffect} from "react";
import ProductService from "../services/ProductService";
import CardProduct from "../components/CardProduct";
import {Button, Container, Navbar, Form} from 'react-bootstrap';
import CreateProductModal from '../components/CreateProductModal';
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

const RouteVerification = () =>{
/*    if (localStorage.getItem('token')) {

    }else {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: 'Oops...',
            text: 'Se a presentado un error Porfabor ingrese con su cuenta',
        }).then(() => {
            window.location.pathname = '/';
        })
    }
    <Router>
    <Switch>
        <Route exact={true} path="/" component={HomeView} />
        <Route path="/admin" component={Admin} />
    </Switch>
</Router>*/
}


export default RouteVerification;