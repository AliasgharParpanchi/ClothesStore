import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { userRequest } from "../requestMethods";




const Container = styled.div`
        width: 100vw;
        height: 100vh;
        background-color: lightblue;
        background-size: cover;
        direction: rtl;
        display: flex;
        align-items: center;
        justify-content: center;
`;
const Wrapper = styled.div`
        width: 40%;
        padding: 20px;
        background-color: white;
`;
const Form = styled.form`
        display: flex;
        flex-direction: column;
`;
const Title = styled.h1`
        font-size: 24px;
        font-weight: 300;
`;
const Filed = styled.div`
        display: flex;
`
const Text = styled.h5`
        margin-top: 20px;
        width: 70px;
`;
const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 10px 0;
        padding: 10px;
`;
const Button = styled.button`
        width: 25%;
        border: none;
        padding: 10px 20px;
        background-color: teal;
        color: white;
        cursor: pointer;
        margin-bottom: 10px;
        margin-right: 60px;
        &:disabled{
                color: green;
                cursor: not-allowed;
        }
`;
const PriceAndButton = styled.div``;
const TotalPrice = styled.span`
       font-size: 20px;
       font-weight: bold;
`;

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
`;


export default function Payment() {
    const cart = useSelector(state => state.cart);
    const orderID = useSelector((state) => state.order.id);
    const [cardNO, setCardNO] = useState("");
    const [cardDateM, setCardDateM] = useState("");
    const [cardDateY, setCardDateY] = useState("");
    const [cardCVV2, setCardCVV2] = useState("");
    const [password, setPassword] = useState("");
    const [messageError, setMessageError] = useState("");
  

    useEffect(() => {
        // فرمت کردن شماره کارت
        const formatted = cardNO.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') ?? '';
        if (formatted !== cardNO) {
            setCardNO(formatted);
        }
    }, [cardNO]);

    const handleCardNO = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        if (input.length <= 16) {
            setCardNO(input);
        }
    }

    const handlecardDate = (type, value) => {

        if (type == 'month') {
            const inputMonth = value.replace(/\D/g, '');
            if (inputMonth.length <= 2 && inputMonth <= 12) {
                setCardDateM(inputMonth);
            }
        } else {
            const inputYear = value.replace(/\D/g, '');
            if (inputYear.length <= 2) {
                setCardDateY(inputYear);
            }
        }


    }

    const handleCVV2 = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        if (input.length <= 4) {
            setCardCVV2(input);
        }
    }



    const handleClick = (e) => {

        e.preventDefault();

        if (cardNO == '' || cardNO.length < 16) {
            document.getElementById('cardNO').style.borderColor = 'red';
        } else if (cardDateM == '' || cardDateM.length < 2) {
            document.getElementById('month').style.borderColor = 'red';
            document.getElementById('cardNO').style.borderColor = 'black';
        } else if (cardDateY == '' || cardDateY.length < 2) {
            document.getElementById('year').style.borderColor = 'red';
            document.getElementById('month').style.borderColor = 'black';
            document.getElementById('cardNO').style.borderColor = 'black';
        } else if (cardCVV2 == '' || cardCVV2.length < 3) {
            document.getElementById('cardCVV2').style.borderColor = 'red';
            document.getElementById('year').style.borderColor = 'black';
            document.getElementById('month').style.borderColor = 'black';
            document.getElementById('cardNO').style.borderColor = 'black';
        } else if (password == '') {
            document.getElementById('password').style.borderColor = 'red';
            document.getElementById('cardCVV2').style.borderColor = 'black';
            document.getElementById('year').style.borderColor = 'black';
            document.getElementById('month').style.borderColor = 'black';
            document.getElementById('cardNO').style.borderColor = 'black';
        } else {
            document.getElementById('password').style.borderColor = 'black';
            document.getElementById('cardCVV2').style.borderColor = 'black';
            document.getElementById('year').style.borderColor = 'black';
            document.getElementById('month').style.borderColor = 'black';
            document.getElementById('cardNO').style.borderColor = 'black';

            const payment = { cardNumber: cardNO, price: cart.Carts[0]?.total, status: 'paid' };
            //const res = await userRequest.post("payment/add/652c3b40fa2fb41e39316c46", payment );
            sendRequest(payment)   
        }

    }
    
    const sendRequest = async(payment) => {

        const res = await userRequest.post(`payment/add/${orderID}`, payment );
        if (res.status == 200 || res.status == 201){
            window.location.replace('/address')
        }else {
            setMessageError('خطا با پشتیبانی تماس بگیرید')
        }
    }
    return (
        <Container>
            <Wrapper>
                <Title>پرداخت</Title>
                {messageError != '' &&<ErrorMessage>{messageError}</ErrorMessage>}
                <Form>
                    <Filed>
                        <Text>شماره کارت:</Text>
                        <Input id='cardNO' placeholder='6037xxxxxxxx9090' value={cardNO} onChange={handleCardNO} style={{ direction: 'ltr' }} />
                    </Filed>
                    <Filed>
                        <Text>تاریخ انقضا:</Text>
                        <Input id='month' value={cardDateM} placeholder='ماه' style={{ minWidth: '35%', marginLeft: '2px', direction: 'ltr' }} onChange={(e) => handlecardDate('month', e.target.value)} />
                        <Input id='year' value={cardDateY} placeholder='سال' style={{ minWidth: '35%', marginRight: '2px', direction: 'ltr' }} onChange={(e) => handlecardDate('year', e.target.value)} />
                    </Filed>
                    <Filed>
                        <Text>CVV2:</Text>
                        <Input id='cardCVV2' type='password' value={cardCVV2} placeholder='6666' onChange={handleCVV2} style={{ direction: 'ltr' }} />
                    </Filed>
                    <Filed>
                        <Text>رمز دوم:</Text>
                        <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ direction: 'ltr' }} />
                    </Filed>
                    <PriceAndButton>
                        <Button onClick={handleClick} >پرداخت</Button>
                        <TotalPrice>مبلغ پرداختی: {cart.Carts[0]?.total} تومان</TotalPrice>
                    </PriceAndButton>
                </Form>
            </Wrapper>
        </Container>
    )
}