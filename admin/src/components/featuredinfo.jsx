import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {adminRequest} from './../requestMethods'

const Container = styled.div`
            width: 100%;
            display: flex;
            justify-content: sapace-between;
`;
const Item = styled.div`
            flex: 1;
            margin: 0px 20px;
            padding: 30px;
            border-radius:10px;
            cursor: pointer;
            box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
            -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
            -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const Title = styled.span`
            font-size: 20px; 
`;
const MoneyContainer = styled.div`
            margin: 10px 0px;
            display: flex;
            align-items: center;
`;
const Money = styled.span`
            font-size: 30px;
            font-weight: 600;
`;
const Sub = styled.span`
           font-size: 15px;
           color: gray;
`;


export default function featuredinfo() {
  const [income, setIncome] =useState([]);



  useEffect(() => {
    const getincome = async()=> {
       try {
        const res = await adminRequest.get("orders/income");
        setIncome(res.data);
       }catch{

       }
    }
    getincome(income);
  },[])

  return (
    <Container>

        <Item>
            <Title>درآمد</Title>
            <MoneyContainer>
                <Money>{income[1]?.total} هزار تومان</Money>
            </MoneyContainer>
            <Sub>از 30 روز گذشته</Sub>
        </Item>
    </Container>
  )
}
