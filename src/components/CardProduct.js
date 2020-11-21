import React from "react";
import {Button, Card} from 'react-bootstrap';

function CardProduct(props) {
    const { name, description, image, price } = props;
    return (
        <Card>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                    <p>$ {price}</p>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="success">Agregar</Button>
                <Button variant="outline-danger">Eliminar</Button>
            </Card.Footer>
        </Card>
    );
}

export default CardProduct;
