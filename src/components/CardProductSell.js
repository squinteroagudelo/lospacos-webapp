import React from "react";
import {Button, Card} from 'react-bootstrap';

function CardProductSell(props) {
    const {name, description, image, price} = props;
    return (
        <div className="col mt-5">
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
                    <Button className= "ml-2 mr-2" variant="success">Agregar al carrito </Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default CardProductSell;
