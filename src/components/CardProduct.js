import React, {useState, useEffect} from "react";
import {Button, Card} from 'react-bootstrap';
//import EditProductModal from '../components/EditProductModal';
import EditProduct from '../views/EditProduct';

function CardProduct(props) {
    const [show, setShow] = useState(false);
    const { id, name, description, image, price, quatity } = props;


    const handleClose = () =>{
           
        setShow(false)
    }

    const handleOpenModal = ()=>{
        setShow(true)
    }

    return (
        <div className="col mt-2">
            <Card className="h-100">
                <Card.Img height={250} variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                        <p>$ {price}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Button variant="success"  onClick={handleOpenModal}>Editar </Button>
                    {
                        show &&
                        <EditProduct
                            product= {props}
                            show={show}
                            handleClose={handleClose}
                            handleOpenModal={handleOpenModal}/>
                    }
                    <Button variant="outline-danger" onClick={() => props.handleDeleteProduct(id)}>Eliminar</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default CardProduct;
