import React from 'react'
import styled from 'styled-components'
import { FaCartShopping } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/router';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  width:35vw; 
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative; 
  &:hover ${Info}{
    opacity: 1;
  }
    @media (max-width: 600px) {
    min-width: 200px; 
        width: 35vw;
    height: 200px;
      } 
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
 width:auto;
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product = ({ item,key0="" }) => {
 const router=useRouter()
  return (
    <Container> 
      <Circle />  
      <Image src={item.img} />
      <Info>
        <Icon onClick={()=>router.push(`/Product/${item.id}`)}>
          <FaCartShopping /> 
        </Icon>
        <Icon onClick={()=>router.push(`/Product/${item.id}`)}>
        <CiSearch />
      </Icon>
      </Info>
    </Container>
  )
}

export default Product
