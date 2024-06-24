import React, { useEffect, useState } from 'react';
import Recommended from '@/components/Recommended/Recommended';
import styled from 'styled-components';
import Sidebar from '@/components/SideBar/Sidebar';
import { popularProducts as products } from "@/public/data";
import Card from '@/components/Card/Card';
import {filteredData} from "@/export/product"

const Container = styled.div`
  display: flex;
  width: 100vw;
`;

const RContainer = styled.div`
  margin-left: 30vw;
`;
const ProductList = styled.div`
display:flex;
flex-wrap:wrap; 
gap:2rem;
align-items:center; 
`;

const Product = () => {
    const [selectCategory, setSelectCategory] = useState("");
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(products);

    const handleInputChange = event => {
        setQuery(event.target.value);
    }
    const handleClick = event => {
        setSelectCategory(event.target.value);
        setQuery("");
    }

    const handleChange = (event) => {  
        setSelectCategory(event.target.value);
    };
    useEffect(() => {
        setResult(products);
    }, []);

    useEffect(() => { 
        setResult(filteredData(products, selectCategory, query));
    }, [query, selectCategory]);

    return (
        <Container>
            <Sidebar handleClothesChange={handleChange} />
            <RContainer style={{
                marginBottom: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <div element="ul">
                    <Recommended handleClick={handleClick} />
                    <ProductList>
                        {result.map(({ img, name, price, star, reviews, prevPrice }, i) => (
                            <div element="li" type="up" key={i}>
                                <Card
                                    key={i}
                                    img={img}
                                    name={name}
                                    star={star}
                                    reviews={reviews}
                                    prevPrice={prevPrice}
                                    price={price}
                                />
                            </div>
                        ))}
                    </ProductList>
                </div>
            </RContainer>
        </Container>
    )

}
export default Product;
