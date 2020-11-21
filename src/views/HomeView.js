import React, {useState, useEffect} from "react";
import ProductService from "../services/ProductService";
import {Row, Col, Container, CardDeck} from "react-bootstrap";
import CardProduct from "../components/CardProduct";

const HomeView = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        handleGetProducts()
    }, []);

    const handleGetProducts = async () => {
        try {
            const response = await ProductService.get();
            setProducts(response.data);
        } catch (err) {
            console.log(err);
        }
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
                <CardDeck>
                    {
                        products.slice(
                            index === 0 ? index : index * columns,
                            index === 0 ? columns : index * columns + columns
                        ).map((product, index) => {
                            return <CardProduct
                                name={product.name}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                            />
                        })
                    }
                </CardDeck>
            )
        })
    }

    return (
        <Container>
            {
                handleRenderProducts()
            }
        </Container>
    )

}

export default HomeView;
