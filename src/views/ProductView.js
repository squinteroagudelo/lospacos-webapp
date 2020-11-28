import React, { useState } from "react";
import {Button, Container, Navbar, Form} from 'react-bootstrap';
import CreateProductModal from '../components/CreateProductModal';
import ProductService from '../services/ProductService';
import Swal from 'sweetalert2';

export const ProductView = () => {
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
                            Swal.fire({
                                allowOutsideClick: false,
                                title: '¿Quieres guardar El producto?',
                                showDenyButton: true,
                                showCancelButton: false,
                                confirmButtonText: `Guardar`,
                                denyButtonText: `No Guardar`,
                                icon: 'question'
                              }).then((result) => {
                                if (result.isConfirmed) {
                                   

                                    ProductService.create(product)
                                    .then((resp) =>{
                                        Swal.close()
                                        console.log(resp);
                                        Swal.fire( {   
                                            allowOutsideClick: false,
                                            title:'Guardado exitosamente', 
                                            icon: 'success'})
                                        handleClose();
                                        
                                    }, (error) =>{
                                        Swal.close()
                                        console.log(error);
                                        Swal.fire({
                                            title: 'Error',
                                            icon: 'error',
                                            text: 'Se presentó un error al guardar el producto'
                                        })
                                    });
                                } else if (result.isDenied) {
                                    Swal.fire({ 
                                        allowOutsideClick: false,
                                        title: 'Los Cambios no se an guardado',
                                        icon: 'info'})                                
                                }
                              })
                      
    }
//className="App mt-5"
    return (
        <div className = "mt-5" >
        <Button onClick={handleOpenModal} variant="warning" className = "mt-5 ml-4" >Crear Producto</Button>
                    {
                        show &&
                        <CreateProductModal
                            show={show}
                            handleClose ={handleClose}
                            handleSaveProduct = {handleSaveProduct}/>
                        }
        </div>
    )
}

export default ProductView;
