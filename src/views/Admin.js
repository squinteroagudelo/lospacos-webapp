import React, {useState, useEffect} from "react";
import ProductService from "../services/ProductService";
import CardProduct from "../components/CardProduct";
import {Button, Container, Navbar, Form} from 'react-bootstrap';
import CreateProductModal from '../components/CreateProductModal';
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import HomeView from "./HomeView";
const Admin = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        handleGetProducts();
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () =>{
        setShow(false)
    }

    const handleOpenModal = ()=>{
        setShow(true)
    }

    
    const handleSaveProduct = async (product) =>{
        
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Por favor espere...',
        })

        Swal.showLoading();

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ml-1',
              cancelButton: 'btn btn-danger mr-1'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
            title: '¿Quieres guardar El producto?',
            text: "¡No podrás revertir esto!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'No Guardar',
            reverseButtons: true
     
          }).then((result) => {
            if (result.isConfirmed) {
             
                ProductService.create(product)
                .then((resp) =>{
                  
                    console.log(resp)
                    swalWithBootstrapButtons.fire({
                        allowOutsideClick: false,
                        title:'¡Guardado!',
                        text:'Guardado exitosamente',
                        icon:'success',
                        timer: 2500
                     }).then(resp =>{
                        handleGetProducts()
                     })
                     handleClose();
                }, (err) => {
                    swalWithBootstrapButtons.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'Se presentó un error al guardar el producto',
                    });
                    console.log(err)
                });            
            } else if (
         
              result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                {   title: 'Los Cambios no se an guardado',     
                    icon: 'info',
                })
            }
          })                         
    }

    const handleGetProducts = async () => {
        try{
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Por favor espere...',
                timer: 1000
            })
    
            Swal.showLoading();
            const resp = await ProductService.get();
            setProducts(resp.data);
           // Swal.close()
        }catch(err){
            console.log(err);
            Swal.close()
            Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                title: 'Oops...',
                text: 'Se a presentado un error a la hora de listar los productos', 
            })
        }
    }

    const handleDeleteProduct = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success mr-1',
              cancelButton: 'btn btn-danger ml-1'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro de eliminar este producto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar',
            reverseButtons: false
     
          }).then((result) => {
            if (result.isConfirmed) {
             
                ProductService.delete(id).then(resp => {
                  
                    console.log(resp)
                    swalWithBootstrapButtons.fire({
                        allowOutsideClick: false,
                        title:'¡Eliminado!',
                        text:'Producto eliminado exitosamente',
                        icon:'success',
                        timer: 2500
                     }).then(resp =>{
                        handleGetProducts()
                     })

                }, (err) => {
                    swalWithBootstrapButtons.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'No se a podido eliminar el Producto',
                    });
                    console.log(err)
                });
              
              
            } else if (
         
              result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                {   title:'Cancelado',
                    text:'La eliminación del producto ha sido cancelada :)',
                    icon:'error',
                })
            }
          })   
    }

  
    const handleRenderProducts = () => {
        if (!products || products.length === 0) {
            return <div>No existen productos.</div>
        }

        const columns = 4;
        let rows = Math.floor(products.length / columns);

        // console.log(rows)

        const resto = products.length % columns;

        // console.log(resto)

        if (resto !== 0) {
            rows += 1;
        }

        // console.log(rows)

        const arrayRows = [...Array(rows)]

        // console.log(arrayRows)

        return arrayRows.map((row, index) => {
            return (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-5" key={index}>
                    {
                        products.slice(
                            index === 0 ? index : index * columns,
                            index === 0 ? columns : index * columns + columns
                        ).map((product, index) => {
                            return <CardProduct
                                key={index}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                                quantity={product.quantity}
                                handleDeleteProduct={handleDeleteProduct}
                                handleGetProducts={handleGetProducts}
                            />
                        })
                    }
                </div>
            );
        });
    }

    const verification = () =>{
            if (localStorage.getItem('token')) {

            }else {
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Se a presentado un error Porfabor ingrese con su cuenta',
                }).then(() => {
                    window.location.pathname = '/';
                    <Router>
                        <Switch>
                            <Route exact={true} path="/" component={HomeView} />
                            <Route path="/admin" component={Admin} />
                        </Switch>
                    </Router>
    
                })
            }
    }

    return (

        verification(),
            <div className="mt-5">
                <div className="mt-5 section1 text-center">

                    <Button onClick={handleOpenModal} variant="success" className="mt-5 ml-4 mr-4 w-75 section1 text-center" size="lg">Crear Producto</Button>
                    {
                        show &&
                        <CreateProductModal
                            show={show}
                            handleClose={handleClose}
                            handleSaveProduct={handleSaveProduct} />
                    }
                </div>
                <Container>
                    {
                        handleRenderProducts()
                    }
                </Container>
            </div>

    );   
}

export default Admin;
