import React, { useEffect, useState,useMemo  } from 'react';
import Recommended from '@/components/Recommended/Recommended';
import styled from 'styled-components';
import Sidebar from '@/components/SideBar/Sidebar';
import { popularProducts as products } from "@/public/data";
import Card from '@/components/Card/Card';
import {filteredData} from "@/export/product"
import {useBuy} from "@/hooks/use-buy";
import { useAuth } from "@/hooks/use-auth";
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
    const { auth } = useAuth();
    const { addProductHandler, product } = useBuy();
    const [selectCategory, setSelectCategory] = useState({category:"",price:"",color:""}); 
    const [query, setQuery] = useState("");
    // const [result, setResult] = useState(products);
    // 處理搜索框的輸入變化
    // const handleInputChange = (event) => {
    //     setQuery(event.target.value);
    // };
       // 點擊推薦選項時的處理函數
       const handleClick = (event) => { 
     if(selectCategory.category!=event){
        setSelectCategory({...selectCategory,category:event})
     }
        // setSelectCategory(event.target.value);
        // setQuery("");
    };
    // 側邊欄中選項改變時的處理函數
    const handleChange = (event) => {
        // 使用展開運算符更新選擇的類別
        setSelectCategory({ ...selectCategory, [event.target.name]: event.target.value });
    };

    // 初始加載或選擇條件變化時更新顯示的產品列表
    const result = useMemo(() => filteredData(products, selectCategory), [products, selectCategory]);
//    購買
    const buyHandler = (i) => {
        // console.log({...data,color,size,add})
        console.log(result[i])
  
        if (auth) { 
          addProductHandler({ ...result[i], add:1 });
        } else {
          router.push("/Login")
        }
      }
   
    return (
        <Container> 
            <Sidebar handleClothesChange={handleChange} selectCategory={selectCategory}  setSelectCategory={setSelectCategory}  />
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
                        {result.map(({ img, name, price, star, reviews, prevPrice ,id}, i) => (
                            <div element="li" type="up" key={i} onClick={()=>buyHandler(i)}>
                                <Card
                                    key={i}
                                    img={img}
                                    name={name}
                                    star={star}
                                    reviews={reviews}
                                    prevPrice={prevPrice}
                                    price={price} 
                                    id={id}
                              
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
