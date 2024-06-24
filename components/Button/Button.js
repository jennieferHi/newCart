import { useState } from "react";
import styled from "styled-components";
const Button=styled.button`
border:1px solid grey;
margin:5px;
padding:5px;
background:transparent;
font-size:26px;
`

const Button2 = ({ onClickHandler, value, title }) => { 
  const handleChange = () => { 
    onClickHandler(value);
    // 調用父組件傳遞過來的回調函數，將值傳遞給父組件 
};
    return (
      <Button onClick={handleChange} value={value} className="btns">
        {title}
      </Button>
    );
  };
  
  export default Button2;