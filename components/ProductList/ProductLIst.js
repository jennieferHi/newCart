import React from 'react'
import data from '@/public/data'
import Card from '@/components/Card/Card'
import styled from 'styled-components'
const Container=styled.div`
display:flex;
flex-wrap:wrap; 
gap:2rem;
align-items:center; 
`
const ProductLIst = ({result}) => {
  return (
    <Container> 
    
    {result}

    </Container>
  )
}

export default ProductLIst
