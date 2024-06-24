import React, { useState } from 'react';
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

const Category3 = ({ clearHandler,setColor }) => {
  const [selectedValue, setSelectedValue] = useState(""); // 添加 selectedValue 状态
  const handleInputChange = (event) => {
    setSelectedValue(event.target.value);  
    setColor(event.target.value)
  };

  return (
    <Container style={{ width: 'inherit' }}>
      <SidebarTitle>顏色</SidebarTitle>
      <Sidebar>
        <label className="sidebar-label-container" style={{ display: 'flex' }}>
        <Input
        handleChange={handleInputChange}
        selected={selectedValue === ''} 
        value=""
        name="test3"
        title="全部"
      /> 
        </label>
        <Input
          handleChange={handleInputChange}
          value="black"
          color="black"
          title="黑"
          name="test3"
          selected={selectedValue === "black"} // 设置选中状态
        />
        <Input
          handleChange={handleInputChange}
          value="white"
          color="white"
          title="white"
          name="test3"
          selected={selectedValue === "white"} // 设置选中状态
        />
        <Input
          handleChange={handleInputChange}
          value="red"
          title="red"
          name="test3"
          color="red"
          selected={selectedValue === "red"} // 设置选中状态
        />
        <Input
          handleChange={handleInputChange}
          value="green"
          title="green"
          color="green"
          name="test3"
          selected={selectedValue === "green"} // 设置选中状态
        />
        <Input
          handleChange={handleInputChange}
          value="yellow"
          title="yellow"
          color="yellow"
          name="test3"
          selected={selectedValue === "yellow"} // 设置选中状态
        />
        <Input
        handleChange={handleInputChange}
        value="blue"
        title="blue"
        color="blue"
        name="test3"
        selected={selectedValue === "blue"} // 设置选中状态
      />
      </Sidebar>
    </Container>
  );
};

export default Category3;
