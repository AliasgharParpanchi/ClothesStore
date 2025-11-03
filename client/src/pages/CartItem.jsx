import React from 'react'
import styled from 'styled-components'
import Navebar from '../components/Navebar';
import Annoucement from '../components/Announcement';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteCarts, addOrder } from '../redux/apiCalls';




const Container = styled.div`
           
`;
const Wrapper = styled.div`
        direction: rtl;
`;
const Title = styled.h1`
        font-weight: 300;
        text-align: center;   
`;
const Top = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
`;
const TopButton = styled.button`
        padding: 10px;
        font-weight: 600;
        cursor: pointer;
        border: ${(props) => props.type === "filled" && "none"};
        background-color: ${(props) =>
                props.type === "filled" ? "black" : "transparent"};
        color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`

`;
const TopText = styled.span`
        text-decoration: underline;
        cursor: pointer;
        margin: 0px 10px;
`;
const Bottom = styled.div`
        display: flex;
        justify-content: space-between;
`;
const Info = styled.div`
        flex: 3;
        direction: rtl;
        margin-right: 20px;
`;
const Product = styled.div`
        display: flex;
        justify-content: space-between;
`;
const ProductDetail = styled.div`
        flex: 2;
        display: flex;
`;
const Image = styled.img`
        width: 200px;
`;
const Details = styled.div`
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
`;
const ProductName = styled.span`
        
`;
const ProductColor = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
        
`;
const PriceDetail = styled.div`
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
`;
const ProductAmountContainer = styled.div`
        display: flex;
        align-items: center;
`;
const ProductAmount = styled.div`
        font-size: 24px;
        margin: 5px;
`;
const ProductPrice = styled.div`
        font-size: 30px;
        font-weight: 200;
`;
const Hr = styled.hr`
        background-color: #eee;
        border: none;
        height: 1px;
`;
const Summary = styled.div`
        flex: 1;
        border: 0.5px solid lightgray;
        border-radius: 10px;
        padding: 20px;
        height: 50vh;
`;
const SummaryTitle = styled.h1`
        font-weight: 200;
`;
const SummaryItem = styled.div`
        margin: 30px 0px;
        display: flex;
        justify-content: space-between;
`;
const SummaryItemText = styled.span`
        
`;
const SummaryItemPrice = styled.span`
        
`;
const SummaryButton = styled.button`
        width: 100%;
        padding: 10px;
        background-color: lightgray;
        font-weight: 600;
`;

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
`;

export default function CartItem() {
        const cart = useSelector(state => state.cart);
        const userId = useSelector((state) => state.user.currentUser._id);
        const { error, messageError } = useSelector((state)=> state.order);

        const dispatch = useDispatch();
        const handleDelete = () => {
                deleteCarts(dispatch);
        }

        const handleAddOrder = () => {
               const products = [];
               let productId;
               let stockId;
               let quantity;

               for (let i = 0; i < cart.Carts[0].products.length; i++) {
                productId = cart.Carts[0].products[i]._id;
                stockId = cart.Carts[0].products[i].stock.filter(stock => stock.color == cart.Carts[0].products[i].color 
                                                 && stock.size == cart.Carts[0].products[i].size)[0]._id;
                quantity = cart.Carts[0].products[i].quantity;
                products.push({productId, stockId, quantity})
               }
               addOrder(dispatch, {userId , products, totalPrice : cart.Carts[0].total})
        }

        return (
                <Container>
                        <Annoucement />
                        <Navebar />
                        <Wrapper>
                                <Title>اطلاعات سبد خرید</Title>
                                <Top>
                                        <TopButton onClick={handleAddOrder}>ادامه خرید</TopButton>
                                        {error &&<ErrorMessage>{messageError}</ErrorMessage>}
                                        <TopTexts>
                                                <Link to="/CartItem">
                                                        <TopText>سبد خرید</TopText>
                                                </Link>
                                                <Link to="/">
                                                        <TopText>لیست محصولات</TopText>
                                                </Link>
                                        </TopTexts>
                                        <TopButton type="filled" onClick={handleDelete}>حذف سبد خرید</TopButton>
                                </Top>
                                <Bottom>
                                        <Info>
                                                {cart?.Carts[0]?.products.map((product, index) => (
                                                        <Product>
                                                                <ProductDetail>
                                                                        <Image src={product.img[0]} />
                                                                        <Details>
                                                                                <ProductName><b>محصول:</b>{product.name}</ProductName>
                                                                                <ProductColor color={product.color} />
                                                                                <ProductSize><b>سایز:</b> {product.size}</ProductSize>
                                                                        </Details>
                                                                </ProductDetail>
                                                                <PriceDetail>
                                                                        <ProductAmountContainer>
                                                                                <ProductAmount>{product.quantity}</ProductAmount>
                                                                        </ProductAmountContainer>
                                                                        <ProductPrice>{product.price * product.quantity}تومان</ProductPrice>
                                                                </PriceDetail>
                                                        </Product>
                                                ))}
                                                <Hr />

                                        </Info>
                                        <Summary>
                                                <SummaryTitle>مبلغ قابل پرداخت</SummaryTitle>
                                                <SummaryItem>
                                                        <SummaryItemText type="total">جمع کل</SummaryItemText>
                                                        <SummaryItemPrice>{cart.Carts[0]?.total}تومان</SummaryItemPrice>
                                                </SummaryItem>
                                                <SummaryButton>محاسبه</SummaryButton>
                                        </Summary>

                                </Bottom>
                        </Wrapper>
                        <Footer />
                </Container>
        )
}
