import { CalendarToday, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { convertToPersian } from './../ConvertDate.js'
import { adminRequest } from "../requestMethods";


const Container = styled.div`
         flex: 4;
         padding: 20px;
         direction: rtl;
`;
const TitleContainer = styled.div`
         display: flex;
         align-items: center;
         justify-content: space-between;
`;
const Title = styled.h1``;

const WidgetContainer = styled.div`
         display: flex;
         margin-top: 20px;
`;
const ShowUser = styled.div`
         flex: 1;
         padding: 20px;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         margin-left: 20px;
`;
const Orders = styled.div`
         flex: 2;
         padding: 20px;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const ShowTop = styled.div`
         display: flex;
         align-items: center;
`;
const ShowBottom = styled.div`
         margin-top: 20px;
`;
const ShowIMG = styled.img`
         width: 40px;
         height: 40px;
         border-radius: 50%;
         object-fit: cover;
`;
const ShowTopTitle = styled.div`
         display: flex;
         flex-direction: column;
         margin-right: 20px;
`;
const ShowUserName = styled.span`
        font-weight: 600;
`;
const ShowTitle = styled.span`
        font-size: 14px !important;
        font-weight: 600;
        color: rgb(175, 170, 170);
`;
const ShowInfo = styled.div`
        dispaly: flex;
        align-items: center;
        margin: 20px 0px;
        color: #444;
`;
const ShowIcon = styled.div`
        font-size: 16px !important;
`;
const ShowInfoTitle = styled.span`
        margin-right: 10px;

`;
const Order = styled.div`
        display: flex;
`;
const OrderShow = styled.div`
        flex: 1;
        justify-content: space-between;
`;


export default function User() {
        const [orders, setOrders] = useState([]);

        const location = useLocation()
        const userId = location.pathname.split("/")[2];
        const user = useSelector(state => state.user.Users.find(user => user._id === userId))

        useEffect(() => {
                const getOrders = async () => {
                        try {
                                const res = await adminRequest.get(`orders/find/${user._id}`);
                                setOrders(res.data);
                        } catch {

                        }
                }
                getOrders();
        }, [])
        
        return (
                <Container>
                        <TitleContainer>
                                <Title>اطلاعات کاربر </Title>
                        </TitleContainer>
                        <WidgetContainer>
                                <ShowUser>
                                        <ShowTop>

                                                <ShowTopTitle>
                                                        <ShowUserName>{user.userName}</ShowUserName>
                                                </ShowTopTitle>
                                        </ShowTop>
                                        <ShowBottom>
                                                <ShowTitle>توضیحات حساب</ShowTitle>
                                                <ShowInfo>
                                                        <ShowIcon>
                                                                <PermIdentity />
                                                                <ShowInfoTitle>{user.name}</ShowInfoTitle>
                                                        </ShowIcon>
                                                </ShowInfo>
                                                <ShowInfo>
                                                        <ShowIcon>
                                                                <CalendarToday />
                                                                <ShowInfoTitle>{convertToPersian(user.createdAt)}</ShowInfoTitle>
                                                        </ShowIcon>
                                                </ShowInfo>
                                                <ShowTitle>اطلاعات تماس</ShowTitle>
                                                <ShowInfo>
                                                        <ShowIcon>
                                                                <PhoneAndroid />
                                                                <ShowInfoTitle dir="ltr">{user.phone}</ShowInfoTitle>
                                                        </ShowIcon>
                                                </ShowInfo>
                                                <ShowInfo>
                                                        <ShowIcon>
                                                                <MailOutline />
                                                                <ShowInfoTitle>{user.email}</ShowInfoTitle>
                                                        </ShowIcon>
                                                </ShowInfo>
                                        </ShowBottom>
                                </ShowUser>
                                <Orders>
                                        <ShowTop>

                                                <ShowTopTitle>
                                                        <ShowUserName>اطلاعات سفارشات کاربر</ShowUserName>
                                                </ShowTopTitle>
                                        </ShowTop>
                                        {orders?.map((order, index) => (
                                                <Order key={index}>

                                                        <ShowInfo>
                                                                <ShowIcon>
                                                                        <ShowInfoTitle>شناسه:</ShowInfoTitle>
                                                                        <ShowInfoTitle>{order._id}</ShowInfoTitle>
                                                                </ShowIcon>
                                                        </ShowInfo>
                                                        <ShowInfo>
                                                                <ShowIcon>
                                                                        <ShowInfoTitle>قیمت:</ShowInfoTitle>
                                                                        <ShowInfoTitle>{order.totalPrice}</ShowInfoTitle>
                                                                </ShowIcon>
                                                        </ShowInfo>
                                                        <ShowInfo>
                                                                <ShowIcon>
                                                                        <ShowInfoTitle>وضعیت:</ShowInfoTitle>
                                                                        <ShowInfoTitle>{order.status}</ShowInfoTitle>
                                                                </ShowIcon>
                                                        </ShowInfo>

                                                </Order>
                                        ))}
                                </Orders>
                        </WidgetContainer>
                </Container>
        )
}
