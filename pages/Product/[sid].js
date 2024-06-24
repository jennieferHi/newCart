
import styled from "styled-components";
import Link from "next/link";
// import Footer from "../components/Footer"; 
import Newsletter from "@/components/Newsletter";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image'
import { popularProducts } from "@/public/data"
import { useBuy } from "@/hooks/use-buy"
import { useAuth } from "@/hooks/use-auth";
const Container = styled.div`border-top:30px red solid;`;
const Wrapper = styled.div`  
    border: 1px solid #80808014;
    width: 85vw;
    min-height:400px;
    height: 50vh;
    padding: 8px;
    display: flex;
    box-shadow: 10px 10px 22px 5px grey;
    margin: auto; 
    margin-top:20px;
   @media (max-width: 1000px) {
    flex-direction: column;
    padding:0 30px 20px 30px;
      height: auto;
    }
`;
const ImgContainer = styled.div` 
    display: flex;
padding-top:30px;
  flex: 1;
  border-right:1px solid grey;
   @media (max-width: 1000px) {
border:0;
        margin: auto;
    }
`;
const InfoContainer = styled.div`

padding-top:30px;
flex: 1.3;
  padding: 0px 50px; 
  margin: auto;
  @media (max-width: 450px) {
       padding: 0; 
  margin: 0;
    }
`;
const Title = styled.h3`
padding-top:30px;
  font-weight: 200;
    @media (max-width: 800px) {
 text-align:center;
    }
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between; 

`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.p(({ color, selected }) => ({
  backgroundColor: color,
  width: "100px",
  height: "100px",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: selected ? "3px solid red" : "0",
  margin: " 0px 5px",
  cursor: " pointer"
}));
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
      @media (max-width:1100px) {  
    width: 100%;  
  }
    @media(max-width:450px){
    width:auto
    }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;

`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [add, setAdd] = useState(1);
  const [color, setColor] = useState("black");
  const [size, setSize] = useState("XS");
  const { addProductHandler, product } = useBuy();

  const { auth } = useAuth();
  useEffect(() => {
    if (!router.isReady) return;

    const sid = router.query.sid;
    const res = popularProducts.filter((v) => sid == v.id);
    setData(res[0]);
  }, [router])
  const buyHandler = () => {
    // console.log({...data,color,size,add})
    console.log(auth)
    if (auth) {
      addProductHandler({ ...data, color, size, add: parseInt(add) });
    } else {
      router.push("/Login")
    }
  }
  return (
    <Container className="sid"> 
    <h1 style={{textAlign:"center",margin:"15px 0 30px 0"}}>product</h1>
      <Wrapper>
        <ImgContainer>
          <img
            src={data.src}
            width={500}
            height={300}
            className="imgAuto"
            alt="圖片"
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{data.name}</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Price>${data.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" selected={color == "black" ? true : false} onClick={() => color != "black" ? setColor("black") : ""} />
              <FilterColor color="darkblue" selected={color == "darkblue" ? true : false} onClick={() => color != "darkblue" ? setColor("darkblue") : ""} />
              <FilterColor color="gray" selected={color == "gray" ? true : false} onClick={() => color != "gray" ? setColor("gray") : ""} />

            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize style={{ "cursor": "pointer" }}>
                <FilterSizeOption onClick={() => color != "XS" ? setSize("XS") : ""} >XS</FilterSizeOption>
                <FilterSizeOption onClick={() => color != "S" ? setSize("S") : ""} >S</FilterSizeOption>
                <FilterSizeOption onClick={() => color != "M" ? setSize("M") : ""} >M</FilterSizeOption>
                <FilterSizeOption onClick={() => color != "L" ? setSize("L") : ""} >L</FilterSizeOption>
                <FilterSizeOption onClick={() => color != "XL" ? setSize("XL") : ""} >XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <span className="icon" style={{ "cursor": "pointer" }} onClick={() => setAdd(add + 1)}>+</span>
              <Amount>{add}</Amount>
              <span className="icon" style={{ "cursor": "pointer" }} onClick={() => { if (add >= 2) setAdd(add - 1) }}>-</span>
            </AmountContainer>
            <Button  onClick={buyHandler}>加入購物車</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <Link href="/" style={{ margin: "20px", fontSize: "12px" }}><button>回上一頁</button></Link>
    </div>
    </Container>
  );
};

export default Product;