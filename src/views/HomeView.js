import React, {useState, useEffect} from "react";
import ProductService from "../services/ProductService";
import {Container, Carousel} from "react-bootstrap";
import CardProductSell from "../components/CardProductSell";

import Swal from "sweetalert2";

const HomeView = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        handleGetProducts();
    }, []);

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


    const hanleCarusel = () =>{
 
    }

    const handleDeleteProduct = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })
          
        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro de eliminar este producto?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            confirmButtonColor: '#28a745',
            cancelButtonText: 'No, cancelar',
            cancelButtonColor: '#dc3545',
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
                        confirmButtonColor: '#28a745',
                        timer: 2500
                     }).then(resp =>{
                        handleGetProducts()
                     })
                    //handleGetProducts()
                }, (err) => {
                    swalWithBootstrapButtons.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'No se a podido eliminar el Producto',
                        confirmButtonColor: '#28a745'
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
                    confirmButtonColor: '#28a745'
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
                            return <CardProductSell
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



    return (
        <div>
            <div>
                <Carousel className = "mt-5 ">
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src="https://www.alfabetajuega.com/wp-content/uploads/2020/10/Boruto-acaba-de-revelar-la-forma-mas-poderosa-de-Naruto-hasta-la-fecha-1-780x405.jpg"
                    alt="First slide"
                    height={550}                       
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className = "mt-4">
                    <img
                    className="d-block w-100"
                    src="https://cdn2.imagentv.com/sites/www.imagentv.com/files/images/2020/07/odt-048-web-naruto.jpg"
                    alt="Third slide"
                    height={550}
                    />
                
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className = "mt-4">
                    <img
                    className="d-block w-100"
                    src="https://as.com/meristation/imagenes/2020/11/25/noticias/1606298659_237590_1606300705_noticia_normal.jpg"
                    alt="Third slide"
                    height={550}
                    />
                
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
            <div>
                <Container>
                {
                    handleRenderProducts()
                }
                </Container>
            </div>
        </div>
    );
}

export default HomeView;
