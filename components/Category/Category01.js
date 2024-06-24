import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../Input/Input';

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
`;

const SidebarTitle = styled.h2`
  font-size: 25px;
  font-weight: normal;
  margin-bottom: 5px;
`;

const Sidebar = styled.div`
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
`;

const Category = ({clearHandler ,setCategory}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleInputChange = (event) => {
    setSelectedValue(event.target.value); 
    setCategory(event.target.value)
  };
  const clearInputChange = (event) => {
    setSelectedValue(event.target.value);
    clearHandler(event);
  };
  return (
    <Container style={{ width: 'inherit' }}>
  
      <SidebarTitle>分類</SidebarTitle>
      <Sidebar>
        <label style={{ display: 'flex' }} className="sidebar-label-container">
          <Input
          handleChange={handleInputChange} 
            selected={selectedValue === ''}
            value=""
            name="test"
            title="全部"
          />
        </label>
        <Input
        handleChange={handleInputChange} 
          selected={selectedValue === 'clothing'}
          value="clothing"
          title="服飾"
          name="test"
        />
        <Input
        handleChange={handleInputChange} 
          selected={selectedValue === 'sock'}
          value="sock"
          title="襪子"
          name="test"
        />
        <Input
        handleChange={handleInputChange} 
          selected={selectedValue === 'shoe'}
          value="shoe"
          title="鞋"
          name="test"
        />
        <Input
        handleChange={handleInputChange} 
          selected={selectedValue === 'hat'}
          value="hat"
          title="帽子"
          name="test"
        />
      </Sidebar>
    </Container>
  );
};

export default Category;
