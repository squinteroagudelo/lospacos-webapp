import React, {useState, useEffect} from "react";
import ProductService from "../services/ProductService";
import {Container, Carousel} from "react-bootstrap";
import CardProductSell from "../components/CardProductSell";

import carouselImg1 from '../assets/img/1-800x330.png';
import carouselImg2 from '../assets/img/3-800x330.png';
import carouselImg4 from '../assets/img/banner-3.jpg';
import carouselImg5 from '../assets/img/Banner-5.png';
import carouselImg6 from '../assets/img/Banner-6.jpg';
import carouselImg7 from '../assets/img/Banner-Corona-800x330.png';
import carouselImg8 from '../assets/img/rsz_banner-2.jpg';


/* import img1 from '../assets/img/1.jpg';
import img2 from '../assets/img/2.jpg';
import img3 from '../assets/img/3.jpg';
import img4 from '../assets/img/4.jpg';
import img5 from '../assets/img/5.jpg';
import img6 from '../assets/img/6.jpg';
import img7 from '../assets/img/7.jpg';
import img8 from '../assets/img/4.jpg';
import img9 from '../assets/img/5.jpg';
import img10 from '../assets/img/6.jpg'; */

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

         /*
                https://minimercadolospacos.com/lp/wp-content/uploads/2020/08/Banner-5-600x213.png
                https://minimercadolospacos.com/lp/wp-content/uploads/2020/08/Banner-5-768x273.png
                https://minimercadolospacos.com/lp/wp-content/uploads/2020/08/Banner-5-300x106.png
                https://minimercadolospacos.com/lp/wp-content/uploads/2020/08/Banner-5.png
                */

    return (
        <div>
            <div>
                <Carousel className = "mt-5">
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg1}
                    alt="First slide"
                   // height={550}                       
                    />
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg2}
                    alt="Third slide"
                   // height={550}
                    />
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg4}
                    alt="Third slide"
                  //  height={550}
                    />
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg5}
                    alt="Third slide"
                  //  height={550}
                    />
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg6}
                    alt="Third slide"
                  //  height={550}
                    />           
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg7}
                    alt="Third slide"
                  //  height={550}
                    />
                </Carousel.Item>
                <Carousel.Item className = "mt-4"> 
                    <img
                    className="d-block w-100"
                    src={carouselImg8}
                    alt="Third slide"
                  //  height={550}
                    />           
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

            {/* <div>
            <Container>
            <Carousel>
                <Carousel.Item width="50px">
                    <img
                    className="d-block w-50"
                    src={img1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="w-50"
                    src={img2}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img3}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item  width="50px">
                    <img
                    className="w-50"
                    src={img4}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img5}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img6}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img7}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img8}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img9}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item width="50px">
                    <img
                    className="w-50"
                    src={img10}
                    alt="First slide"
                    />
                </Carousel.Item>
                </Carousel>
            </Container>
            </div> */}
        </div>
    );
}

export default HomeView;
