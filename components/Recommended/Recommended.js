import React from 'react'
import Button from '../Button/Button';
import styled from 'styled-components';
const Container=styled.div` 
    display: flex;
 
`;
const Title=styled.h2` 
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 40px;
`;
 
const RecommemedTiltle = ({handleClick}) => {
  return (
    <div>
    <Title>Recommended</Title>
    <Container>
      <Button onClickHandler={handleClick} value="" title="全部商品" />
      <Button onClickHandler={handleClick} value="clothing" title="服飾" />
      <Button onClickHandler={handleClick} value="sock" title="襪子" />
      <Button onClickHandler={handleClick} value="shoe" title="鞋子" />
      <Button onClickHandler={handleClick} value="hat" title="帽子" />
    </Container>
  </div>
  )
}

export default RecommemedTiltle
