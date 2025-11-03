import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import {adminRequest} from './../requestMethods'
import {convertToPersian} from './../ConvertDate.js'

const Container = styled.div`
         flex: 2;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         padding: 20px;
`;

const Title = styled.h3`
         font-size: 22px;
         font-weight: 600;
`;

const TableLg = styled.table`
         width: 100%;
         border-spacing: 20px;
`;

const TrLg = styled.tr``;

const ThLg = styled.th`
         text-align: right;
`;

const TdLgUser = styled.td`
         display: flex;
         align-items: center;
         font-weight: 600;
`;

const ImgProfile = styled.img`
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-left: 10px;
`;

const CustomerName = styled.span``;

const TdLgDate = styled.td`
          font-weight: 300;
`;

const TdLgAmount = styled.td`
          font-weight: 300;
`;

const TdLgStatus = styled.td``;

const Buttons = styled.button`
          padding: 5px 7px;
          border: none;
          border-radius: 10px;
          background-color: ${(props) => props.type == "تایید" ? "#e5faf2" : props.type == "رد شده" ? "#fff0f1" : "#ebf1fe"};
          color: ${(props) => props.type == "تایید" ? "#3bb077" : props.type == "رد شده" ? "#d95087" : "#2a7ade"};
`;

export default function WidgetLg() {
 
  const [Orders,setOrders] = useState([]);


  useEffect(() =>{
      const getOrders = async () =>{
        try{
          const res = await adminRequest.get("orders/?new=true");

          setOrders(res.data);
        }catch{

        }
      }
      getOrders();
      
  },[])


  const Button = ({type}) =>{
    return <Buttons type={type}>{type}</Buttons>
  }
  return (
   <Container>
      <Title>آخرین فروش</Title>
      <TableLg>
        <TrLg>
          <ThLg>مشتری</ThLg>
          <ThLg>تاریخ</ThLg>
          <ThLg>مقدار</ThLg>
          <ThLg>وضعیت</ThLg>
        </TrLg>
        {Orders.map(order =>(
        <TrLg key={order._id}>
          <TdLgUser>
            <CustomerName>{order.userDetails[0].name}</CustomerName>
          </TdLgUser>
          <TdLgDate>{convertToPersian(order.createdAt)}</TdLgDate>
          <TdLgAmount>{order.totalPrice} تومان</TdLgAmount>
          <TdLgStatus><Button type={order.status}/></TdLgStatus>
        </TrLg>
      ))}
      </TableLg>
   </Container>
  )
}
