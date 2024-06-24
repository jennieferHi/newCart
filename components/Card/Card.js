import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import data from '@/public/data'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoBag } from "react-icons/io5";
const Container = styled.div`
width:200px;
height:380px;
border:1px solid grey;
padding:15px;
`
const Column = styled.div`
display:flex;
flex-direction:column; 
gap:5px;
`
const Between = styled.div`
display:flex;
justify-content: space-between;
`
const Image = styled.img`
width:100%;
height:200px;
object-fit:contain

`
const Title = styled.div`
margin-top:2rem;
font-size:20px;
font-weight:500;
`
const Icon = styled.div`
font-size:30px;
color:orange;
`
const Card = ({ img, name, star, price, reviews,id }) => {

    return (
        <Container>
            <Image src={img} alt='圖片' />
            <Column>
                <Title>{name}</Title>
                <h2>${price}</h2>
                <div>
                    <FaStar />
                    <FaStar />
                    <FaStar /><CiStar />
                </div>
                <Between>
                    <div>
                        <del>${reviews}</del>
                        <del>$ddd{id}</del>
                    </div>
                    <div>


                    </div>
                    <Link href={"/Product/"+id} className="md-close menuItem">
                        <Icon>
                            <IoBag />
                        </Icon>
                    </Link>
                </Between>
            </Column>

        </Container>
    )
}

export default Card
