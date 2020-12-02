import React, {useState, useEffect} from "react";
import {Button, Card, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
function CardProductSell(props) {
    const {name, description, image, price} = props;
    const[quantityProducts, setQuantityProducts] = useState(1);
    const[totalPurchase, setTotalPurchase] = useState(1);

    const[errorQuantityProducts, setErrorQuantityProducts] = useState(null);

    const handleOnChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        switch(name) {
            case "quantityProducts":
                setQuantityProducts(value ? value : null);
                break;
            default:
                break;
        }
    }

    useEffect(() =>{
        if(quantityProducts> 0){
            var priceTotalProdut=(props.price * quantityProducts)
            setTotalPurchase(priceTotalProdut);
            setErrorQuantityProducts(null)
            return;
        }else{
            setQuantityProducts(null);
            setErrorQuantityProducts('La cantidad debe ser mayor  o igual a uno');
            
        }
  
    }, [quantityProducts])

    const handleProductSell = (props, quantityProducts) =>{
        console.log(quantityProducts)
        console.log(props)
        console.log(totalPurchase);
    }

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
                    <Form>
                        <FormGroup>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantityProducts"
                                onChange={handleOnChange}
                                value={quantityProducts ? quantityProducts : ""} />
                                <span className="text-danger">{errorQuantityProducts}</span> 
                        </FormGroup>
                    </Form>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                    <Button className= "ml-2 mr-2" variant="success"  onClick={() => handleProductSell(props,quantityProducts)}>Agregar al carrito </Button>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default CardProductSell;
