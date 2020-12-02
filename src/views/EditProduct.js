import React, { useState } from "react";
import {Button, Container, Navbar, Form} from 'react-bootstrap';
import EditProductModal from '../components/EditProductModal';
import ProductService from '../services/ProductService';
import Swal from 'sweetalert2';

export const EditProduct = (props) => {
  //  const [show, setShow] = useState(false);
    const { id, name, description, image, price, quatity } = props;

    const handleEditProduct = async (idEdit,product,handleGetProducts) =>{

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
                                allowOutsideClick: false,
                                title: '¿Quieres Editar El producto?',
                                showCancelButton: true,
                                confirmButtonText: 'Editar',
                                cancelButtonText: 'No Editar',
                                icon: 'question',
                                reverseButtons: true 
                              
                              }).then((result) => {
                                if (result.isConfirmed) {
                                   

                                    ProductService.Edit(idEdit,product)
                                    .then((resp) =>{
                                        swalWithBootstrapButtons.close()
                                        console.log(resp);
                                        swalWithBootstrapButtons.fire( {   
                                            allowOutsideClick: false,
                                            title:'Editado exitosamente', 
                                            icon: 'success',
                                            timer: 2500
                                        }).then(resp =>{
                                                handleGetProducts()
                                             })
                                            props.handleClose();
                                        
                                    }, (error) =>{
                                        swalWithBootstrapButtons.close()
                                        console.log(error);
                                        swalWithBootstrapButtons.fire({
                                            allowOutsideClick: false,
                                            title: 'Error',
                                            icon: 'error',
                                            text: 'Se presentó un error al Editar el producto',
                                            timer: 2500
                                        }) 
                                        props.handleClose();
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
//className="App mt-5"
/*<Button onClick={handleOpenModal} variant="warning" className = "mt-5 ml-4" >Crear Producto</Button>*/
return (
    <Container>
        {
            (props.show) && 
                <EditProductModal
                product= {props.product}
                show={props.show}
                handleClose={props.handleClose}
                handleEditProduct = {handleEditProduct}/>  
        }
    </Container>
)
}

export default EditProduct;
