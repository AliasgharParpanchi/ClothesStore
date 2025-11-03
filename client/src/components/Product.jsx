import {  SearchOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Info = styled.div`
            opacity: 0;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.2);
            z-index: 3;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s ease;
            cursor: pointer;
`

const Container = styled.div`
          flex: 1;
          margin: 5px;
          min-width: 280px;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5fbfd;
          position: relative;
          &:hover ${Info}{
            opacity: 1;
          }
            

`

const Circle = styled.div`
            width: 200px;  
            height: 200px;
            border-radius: 50%;
            background-color: white;
            position: absolute;
`

const Image = styled.img`
            height: 75%;
            z-index: 2;

`






const Icon = styled.div`
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px;
            right: 0;
            transition: all 0.5s ease;
            &:hover {
                background-color: #e9f5f5;
                transform: scale(1.1);
            }
`
export default function Product({item}) {
  return (
    <Container>
          <Circle/>
          <Image src={item.img[0]}/>
          <Info>
            <Link to={`/product/${item._id}`}>
            <Icon>
                <SearchOutlined/>
            </Icon>
            </Link>
          </Info>
    </Container>
  )
}
