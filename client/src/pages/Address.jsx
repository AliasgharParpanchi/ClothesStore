import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { userRequest } from "../requestMethods"
import { deleteOrder } from '../redux/orderRedux'

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
        margin-left: 0;
`;
const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 10px 0;
        padding: 10px;
`;
const Textarea = styled.textarea`
        flex: 1;
        min-width: 40%;
        margin: 10px 0;
        padding: 10px;
`
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

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
`;

export default function Address() {

    const [inputs, setInputs] = useState({
        city: '',
        zipCode: '',
        address: '',
        state: ''
    });
    const [errors, setErrors] = useState({});
    const [messageError, setMessageError] = useState("");
    const orderID = useSelector((state) => state.order.id);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        if (e.target.name === 'zipCode') {
            // حذف همه کاراکترهای غیر عددی
            const numericValue = e.target.value.replace(/\D/g, '');

            // محدود کردن طول به 10 رقم
            const truncatedValue = numericValue.slice(0, 10);

            setInputs(prev => ({
                ...prev,
                [e.target.name]: truncatedValue
            }));
        } else {
            setInputs(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }
    }

    const validateInputs = () => {
        const newErrors = {};
        if (!inputs.city.trim()) newErrors.city = true;
        if (!inputs.zipCode.trim()) newErrors.zipCode = true;
        if (!inputs.address.trim()) newErrors.address = true;
        if (!inputs.state.trim()) newErrors.state = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClick = (e) => {

        e.preventDefault();
        if(validateInputs())
            sendRequest()
    }
    const sendRequest = async() => {

        const res = await userRequest.post(`shoppingInfo/add/${orderID}`, inputs ); 
        if (res.status == 200 || res.status == 201){
            dispatch(deleteOrder());
            window.location.replace('/');
        }else {
            setMessageError('خطا با پشتیبانی تماس بگیرید')
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>مشخصات آدرس</Title>
                {messageError != '' &&<ErrorMessage>{messageError}</ErrorMessage>}
                <Form>
                    <Filed>
                        <Text>شهر:</Text>
                        <Input name='city' placeholder='تهران' style={{ minWidth: '30%', marginLeft: '15px', borderColor: errors.city ? 'red' : undefined }} onChange={handleChange} />
                        <Text>کدپستی:</Text>
                        <Input name='zipCode' value={inputs.zipCode} placeholder='78664646' style={{ minWidth: '30%', marginLeft: '2px', borderColor: errors.zipCode ? 'red' : undefined }} onChange={handleChange} />
                    </Filed>
                    <Filed>
                        <Text>آدرس:</Text>
                        <Textarea name='address' placeholder='بلوار دانش...' onChange={handleChange} style={{ borderColor: errors.address ? 'red' : undefined }}></Textarea>
                    </Filed>
                    <Filed>
                        <Text>شماره پلاک:</Text>
                        <Input name='state' placeholder='111' onChange={handleChange} style={{ borderColor: errors.state ? 'red' : undefined }} />
                    </Filed>
                    <Button onClick={handleClick}>ثبت</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}