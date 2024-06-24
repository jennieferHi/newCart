 
import styled from 'styled-components'
import Input from '../Input/Input';
import React, { useState } from 'react';
const Container=styled.div` 
margin-top:10px; 
width:100%;
`
const SidebarTitle = styled.h2`
font-size:25px;

font-weight:normal;
margin-bottom:5px;
`;
const Sidebar = styled.div` 
border-top:1px solid grey;
border-bottom:1px solid grey;
width:100%; 
height:100%;
border-right:2px soild #e214212;
display:flex;
flex-direction:column; 
`
const Category2 = ({setPrice}) => {
    const [selectedValue, setSelectedValue] = useState('');

  const handleInputChange = (event) => {   
    setSelectedValue(event.target.value);
    setPrice(event.target.value)
  };

    return (
        <Container style={{ width: 'inherit' }}>
        <SidebarTitle>價錢</SidebarTitle>
        <Sidebar>
          <label style={{ display: 'flex' }} className="sidebar-label-container">
            <Input
              handleChange={handleInputChange}
              selected={selectedValue === ''}
              value=""
              name="test2"
              title="全部"
            />
          </label>
          <Input
            handleChange={handleInputChange}
            selected={selectedValue === 'price1'}
            value="price1"
            title="$1-50"
            name="test2"
          />
          <Input
            handleChange={handleInputChange}
            selected={selectedValue === 'price2'}
            value="price2"
            title="$51-100"
            name="test2"
          />
          <Input
            handleChange={handleInputChange}
            selected={selectedValue === 'price3'}
            value="price3"
            title="$101-150"
            name="test2"
          />
          <Input
            handleChange={handleInputChange}
            selected={selectedValue === 'price4'}
            value="price4"
            title="超過150"
            name="test2"
          />
        </Sidebar>
      </Container>
    );
  };
  
 
export default Category2
