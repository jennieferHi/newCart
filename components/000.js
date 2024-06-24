import React from 'react'
import styled from "styled-components";

const Container=styled.div`
height:30px;
background-color:teal;
color:white;
display:flex;
align-items:center;

`
const Announcement = () => {
  return (
    <Container>
      最新消息      </Container>
  )
}


export default Announcement
