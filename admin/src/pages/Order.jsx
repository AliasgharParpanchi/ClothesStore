import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { convertToPersian } from './../ConvertDate.js'
import { updateOrder } from '../redux/apiCalls';



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
const Top = styled.div`
         display: flex;
`;
const Middle = styled.div`
         display: flex;
`;
const TitleSegment = styled.h3`
        margin-right: 10px;
`;

const OrderTop = styled.div`
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         flex: 1;
`;

const UserOrder = styled.div`
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         flex: 2;
`;
const InfoItemOrderTop = styled.div`
         width: 240px;
         display: flex;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
`;
const InfoItemUser = styled.div`
         width: 200px;
         display: flex;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
`;

const PaymentOrder = styled.div`
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         flex: 1;
`;
const ShoppingInfoOrder = styled.div`
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         flex: 2;
`;

const InfoItemPayment = styled.div`
         width: 200px;
         display: flex;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
`;
const InfoItemShoppinInfo = styled.div`
         width: 200px;
         display: flex;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
`;
const ProductOrder = styled.div`
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const InfoItemProducts = styled.div`
         width: 100%;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
`;
const InfoIMG = styled.img`
         width: 40px;
         height: 40px;
         border-radius: 50%;
         object-fit: cover;
         margin-left: 15px;
`;
const InfoKey = styled.span``;
const InfoValue = styled.span``;

const TopDataProduct = styled.div`
         justify-content: space-between;
         font-size: 20px;
`;
const BottomDataProduct = styled.div`
         justify-content: space-between;
         font-size: 18px;
         margin-right: 55px;
`;

const BottomOrder = styled.div`
         display: flex;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;

const InfoBottomOrder = styled.div`
         width: 100%;
         justify-content: space-between;
         margin-right: 10px;
         margin-bottom: 5px;
         font-size: 20px;
`;
const InfoBottomRightOrder = styled.div`
         width: 50%;
         justify-content: space-between;
         flex: 1;
`;
const InfoBottomLeftOrder = styled.div`
         width: 50%;
         justify-content: space-between;
         flex: 1;
         padding-top: 56px;
`;
const StatusSelect = styled.select``;
const StatusOption = styled.option``;

const DiveUpdate = styled.div`
         justify-content: space-between;
         flex: 1;
         padding-top: 78px;
`;

const Submit = styled.button`
         border: none;
         padding: 5px;
         border-radius: 5px;
         background-color: darkblue;
         color: white;
         font-weight: 600;
         cursor: pointer;
`;

export default function Order() {



        const location = useLocation()
        const orderId = location.pathname.split("/")[2];
        const order = useSelector(state => state.order.orders.find(order => order._id === orderId))

        const dispatch = useDispatch();

        const [status, setStatus] = useState(order.status);


        const primaryColors = [
                { label: 'قرمز', value: 'red' },
                { label: 'آبی', value: 'blue' },
                { label: 'زرد', value: 'yellow' },
                { label: 'سبز', value: 'green' },
                { label: 'مشکی', value: 'black' },
                { label: 'سفید', value: 'white' },
                { label: 'صورتی', value: 'pink' },
                { label: 'بنفش', value: 'purple' },
        ];

        const orderStatuses = [
                { value: 'پرداخت نشده', label: 'پرداخت نشده' },
                { value: 'ارسال شده', label: 'ارسال شده' },
                { value: 'در حال ارسال', label: 'در حال ارسال' },

        ];



        function getColorLabel(item) {
                // ابتدا رنگ مورد نظر را از stock پیدا می‌کنیم
                const selectedStock = item.productInfo.stock.find(stock => stock._id === item.stockId);

                if (!selectedStock) {
                        return 'نامشخص'; // اگر stock پیدا نشد
                }

                // حالا رنگ فارسی معادل را پیدا می‌کنیم
                const colorObject = primaryColors.find(color => color.value === selectedStock.color);

                return colorObject ? colorObject.label : 'نامشخص';
        };



        const handleStatusChange = (e) => {
                setStatus(e);
        }
        const handleSubmit = (e) => {
                e.preventDefault();
                const orderFront = { ...order, status: status};
                const products = [];
                for(let i = 0; i < order.products.length; i++) {
                        products.push({productId: order.products[i].productInfo._id, stockId: order.products[i].stockId, quantity:order.products[i].quantity});
                }
                const orderServer = {status: status, _id: order._id, userId: order.userDetails._id, 
                                     products: products, totalPrice: order.totalPrice, 
                                     shoppingInfoId: order.shoppinginfoDetails._id, paymentId: order.paymentInfo._id};
                updateOrder(order._id, orderServer, dispatch, orderFront);
        }
        return (
                <Container>
                        <TitleContainer>
                                <Title>ویرایش سفارش</Title>
                        </TitleContainer>
                        <Top>
                                <OrderTop>
                                        <TitleSegment>اطلاعات اولیه سفارش</TitleSegment>
                                        <InfoItemOrderTop>
                                                <InfoKey>شناسه :</InfoKey>
                                                <InfoValue>{order._id}</InfoValue>
                                        </InfoItemOrderTop>
                                        <InfoItemOrderTop>
                                                <InfoKey>تاریخ ثبت :</InfoKey>
                                                <InfoValue>{convertToPersian(order.createdAt)}</InfoValue>
                                        </InfoItemOrderTop>
                                        <InfoItemOrderTop>
                                                <InfoKey>تاریخ آخرین ویرایش :</InfoKey>
                                                <InfoValue>{convertToPersian(order.updatedAt)}</InfoValue>
                                        </InfoItemOrderTop>
                                </OrderTop>
                                <UserOrder>
                                        <TitleSegment>اطلاعات کاربر </TitleSegment>
                                        <InfoItemUser>
                                                <InfoKey>نام کاربر:</InfoKey>
                                                <InfoValue>{order.userDetails.name}</InfoValue>
                                        </InfoItemUser>
                                        <InfoItemUser>
                                                <InfoKey>ایمیل کاربر:</InfoKey>
                                                <InfoValue>{order.userDetails.email}</InfoValue>
                                        </InfoItemUser>
                                        <InfoItemUser>
                                                <InfoKey>شماره تلفن کاربر:</InfoKey>
                                                <InfoValue>{order.userDetails.phone}</InfoValue>
                                        </InfoItemUser>
                                </UserOrder>
                        </Top>
                        <Middle>
                                <PaymentOrder>
                                        <TitleSegment>اطلاعات پرداخت </TitleSegment>
                                        <InfoItemPayment>
                                                <InfoKey>وضعیت پرداخت :</InfoKey>
                                                <InfoValue>{order.paymentInfo.status}</InfoValue>
                                        </InfoItemPayment>
                                        <InfoItemPayment>
                                                <InfoKey>شماره کارت :</InfoKey>
                                                <InfoValue>{order.paymentInfo.cardNumber}</InfoValue>
                                        </InfoItemPayment>
                                        <InfoItemPayment>
                                                <InfoKey>تاریخ ثبت :</InfoKey>
                                                <InfoValue>{convertToPersian(order.paymentInfo.createdAt)}</InfoValue>
                                        </InfoItemPayment>
                                        <InfoItemPayment>
                                                <InfoKey>تاریخ ویرایش :</InfoKey>
                                                <InfoValue>{convertToPersian(order.paymentInfo.updatedAt)}</InfoValue>
                                        </InfoItemPayment>
                                </PaymentOrder>
                                <ShoppingInfoOrder>
                                        <TitleSegment>اطلاعات محل ارسال </TitleSegment>
                                        <InfoItemShoppinInfo>
                                                <InfoKey>شهر :</InfoKey>
                                                <InfoValue>{order.shoppinginfoDetails.city}</InfoValue>
                                        </InfoItemShoppinInfo>
                                        <InfoItemShoppinInfo>
                                                <InfoKey>آدرس :</InfoKey>
                                                <InfoValue>{order.shoppinginfoDetails.address}</InfoValue>
                                        </InfoItemShoppinInfo>
                                        <InfoItemShoppinInfo>
                                                <InfoKey>شماره پلاک :</InfoKey>
                                                <InfoValue>{order.shoppinginfoDetails.state}</InfoValue>
                                        </InfoItemShoppinInfo>
                                        <InfoItemShoppinInfo>
                                                <InfoKey>کدپستی :</InfoKey>
                                                <InfoValue>{order.shoppinginfoDetails.zipCode}</InfoValue>
                                        </InfoItemShoppinInfo>
                                </ShoppingInfoOrder>
                        </Middle>
                        <ProductOrder>
                                <TitleSegment>اطلاعات کالاهای انتخابی </TitleSegment>
                                {Array.isArray(order.products) && order.products.length > 0 ? (
                                        order.products?.map((item, index) => (
                                                <InfoItemProducts key={index}>
                                                        <TopDataProduct>
                                                                <InfoIMG src={item.productInfo.img[0]} alt={item.productInfo.description} />
                                                                <InfoKey>شناسه کالا: </InfoKey>
                                                                <InfoValue>{item.productInfo._id},</InfoValue>
                                                                <InfoKey>نام کالا: </InfoKey>
                                                                <InfoValue>{item.productInfo.name}</InfoValue>
                                                        </TopDataProduct>
                                                        <BottomDataProduct>
                                                                <InfoKey>رنگ: </InfoKey>
                                                                <InfoValue>{getColorLabel(item)},</InfoValue>
                                                                <InfoKey>سایز:</InfoKey>
                                                                <InfoValue>{item.productInfo.stock.filter((stock) => (stock._id == item.stockId))[0].size},</InfoValue>
                                                                <InfoKey>تعداد:</InfoKey>
                                                                <InfoValue>{item.quantity}</InfoValue>
                                                                <InfoKey>مبلغ:</InfoKey>
                                                                <InfoValue>{item.productInfo.price}تومان</InfoValue>
                                                        </BottomDataProduct>
                                                </InfoItemProducts>
                                        ))
                                ) :
                                        <InfoItemProducts>محصولی انتخاب نشده است</InfoItemProducts>
                                }
                        </ProductOrder>
                        <BottomOrder>
                                <InfoBottomRightOrder>
                                        <TitleSegment>اطلاعات سفارش</TitleSegment>
                                        <InfoBottomOrder>
                                                <InfoKey>وضعیت سفارش:</InfoKey>
                                                <InfoValue>{order.status}</InfoValue>
                                        </InfoBottomOrder>
                                        <InfoBottomOrder>
                                                <InfoKey>مبلغ کل:</InfoKey>
                                                <InfoValue>{order.totalPrice}تومان</InfoValue>
                                        </InfoBottomOrder>
                                </InfoBottomRightOrder>
                                <InfoBottomLeftOrder>
                                        <InfoBottomOrder>
                                                <InfoKey>
                                                        تغییر وضعیت سفارش:
                                                </InfoKey>
                                                <InfoValue>
                                                        <StatusSelect defaultValue={status} onChange={(e) => handleStatusChange(e.target.value)}>
                                                                {orderStatuses.map((st, index) =>
                                                                        <StatusOption key={index} Value={st.value}>
                                                                                {st.label}
                                                                        </StatusOption>
                                                                )}
                                                        </StatusSelect>
                                                </InfoValue>
                                        </InfoBottomOrder>
                                </InfoBottomLeftOrder>
                                <DiveUpdate>
                                  <Submit onClick={handleSubmit}>ذخیره کردن</Submit>
                                </DiveUpdate>
                        </BottomOrder>
                </Container >
        )
}
