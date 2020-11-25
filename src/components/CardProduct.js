import React from "react";
import {Button, Card} from 'react-bootstrap';

function CardProduct(props) {
    const { id, name, description, image, price } = props;
    return (
        <div className="col mt-4">
            <Card className="h-100">
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                        <p>$ {price}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Button variant="success">Editar</Button>
                    <Button variant="outline-danger" onClick={() => props.handleDeleteProduct(id)}>Eliminar</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default CardProduct;
