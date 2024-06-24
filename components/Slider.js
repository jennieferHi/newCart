import React, { useState } from 'react'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import styled from "styled-components";
import { sliderItems } from "@/public/data.js"
import Link from 'next/link'
<TiArrowRightOutline />
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden; 
    @media (max-width: 1200px) {
    height: 50vh;
    }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -100}vw);

  `;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
    @media (max-width: 1200px) {
      height:50vh
    }
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
        @media (max-width: 1200px) { 
            display: flex; 
    justify-content: flex-end;
    align-items: center;
  }
`;

const Image = styled.img`
  width:100%;
  height:100%;
        @media (max-width: 1200px) {
 width:380px; 
 height:auto;
  }
         @media (max-width: 900px) {
 width:280px; 
 height:auto;
  }
      @media (max-width: 600px) {
 width:180px; 
 height:auto;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
      @media (max-width: 600px) {
flex: 2;
        padding: 10px;
  }    
`;

const Title = styled.h1`
  font-size: 70px;
    @media (max-width: 900px) {
  font-size:50px;
  }
    @media (max-width: 600px) {
  font-size:18px;
  }

`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
      @media (max-width: 900px) {
  font-size:18px;
  }
      @media (max-width: 700px) {
  font-size:16px;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

// `left:${props=>props.direction==="left"&& "10px"};
// right:${props=>props.direction==="right"&& "10px"};
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <TiArrowLeftOutline />
      </Arrow>
      <Wrapper slideindex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link href="/Product" className="Nav-link">
              <Button>SHOW NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <TiArrowRightOutline />
      </Arrow>
    </Container>
  )
}

export default Slider
