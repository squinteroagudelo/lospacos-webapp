import React, {useState} from 'react';
import {Modal, Button, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap';

function EditProductModal(props){
    // props
    const {show, handleClose } = props;
    // estados
    const [id, setId] = useState(props.product.id);
    const [name, setName] = useState(props.product.name);
    const [description, setDescription] = useState(props.product.description);
    const [image, setImage] = useState(props.product.image);
    const [price, setPrice] = useState(props.product.price);
    const [quantity, setQuantity] = useState(props.product.quantity);

         //   setId(props.product.id ? props.product.id: null),
     /*   setName(props.product.name),
        setDescription(props.product.description),
        setImage(props.product.image),
        setPrice(props.product.price),
        setQuantity(props.product.quantity),*/
   
const handleOnChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    switch(name) {
        case "id":
            setId(value ? value : null);
            break;
        case "name":
            setName(value ? value : null);
            break;
        case "description":
            setDescription(value ? value : null);
            break;
        case "image":
            setImage(value ? value : null);
            break;
        case "price":
            setPrice(value ? value : null);
            break;
        case "quantity":
            setQuantity(value ? value : null);
            break;
        default:
            break;
    }
}
    return(


        <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>

                    <FormLabel>
                            Id Codigo de Barras
                        </FormLabel>
                        <FormControl 
                            name="id"
                            onChange={handleOnChange}
                            value={id ? id : ""}/>
                            

                        <FormLabel>
                            Nombre Del Producto
                        </FormLabel>
                        <FormControl 
                            name="name"
                            onChange={handleOnChange}
                            value={name ? name : ""}/>

                        <FormLabel>
                            Descripción
                        </FormLabel>
                        <FormControl 
                            name="description"
                            onChange={handleOnChange}
                            value={description ? description : ""}/>

                        <FormLabel>
                            Imagen URL
                        </FormLabel>
                        <FormControl 
                            name="image"
                            onChange={handleOnChange}
                            value={image ? image : ""}/>

                        <FormLabel>
                            Precio individual de cada producto
                        </FormLabel>
                        <FormControl 
                            name="price"
                            onChange={handleOnChange}
                            value={price ? price : ""}/>
                        <FormLabel>
                            Cantidad de productos
                        </FormLabel>
                        <FormControl
                            name= "quantity"
                            onChange={handleOnChange}
                            value={quantity ? quantity : ""}/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close</Button>
                <Button 
                    variant="success"   
                    onClick={() => props.handleEditProduct(
                        id,
                        {
                        id,
                        name,
                        description,
                        image,
                        price,
                        quantity
                        },
                        props.product.handleGetProducts
                    )}
                    disabled={!id || !name || !image || !price || !quantity}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditProductModal