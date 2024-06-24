import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Category1 from '@/components/Category/Category01'
import Category2 from '@/components/Category/Category02'
import Category3 from '@/components/Category/Category03'
const LContainer = styled.div`  
font-size:20px;
line-height:1.3;
position: relative;
`
const Fixed = styled.div`
padding:1rem;
width: 30vw;
position:fixed;  
height:100%;
display:flex;
overflow-y:auto; 
left:0;
`;
const Content = styled.div`
width:100%;
 `
const Sidebar = ({ handleChange, clearHandler,selectCategory, setSelectCategory }) => {
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [color, setColor] = useState("")
    const [select0, setSelect] = useState({category:"",price:"",color:""})
    useEffect(() => {   
        setSelect({category, price, color}); 
        setSelectCategory({category, price, color})
    }, [category, price, color,setSelectCategory])
    return (
        <>
            <LContainer>
                <Fixed> 
                    <Content>
                        <Category1 setCategory={setCategory} clearHandler={clearHandler}></Category1>
                        <Category2 setPrice={setPrice} clearHandler={handleChange}></Category2>
                        <Category3 setColor={setColor} clearHandler={handleChange}></Category3>
                    </Content>
                </Fixed>
            </LContainer>
        </>
    )
}

export default Sidebar
