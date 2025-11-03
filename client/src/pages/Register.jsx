import React, { useState } from 'react'
import styled from 'styled-components'
import { register } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

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
        flex-wrap: wrap;
`;
const Title = styled.h1`
        font-size: 24px;
        font-weight: 300;
`;
const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 20px 10px 0px 0px;
        padding: 10px;
`;
const Button = styled.button`
        width: 25%;
        border: none;
        padding: 10px 20px;
        background-color: teal;
        color: white;
        cursor: pointer;
`;

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
      width: 100%;
`

export default function Register() {


        const [inputs, setInputs] = useState({
                name: '',
                phone: '',
                email: '',
                userName: '',
                password: '',
                passwordR: ''
        });
        const [errors, setErrors] = useState({});
        const [messageErrorPassword, setMessageErrorPassword] = useState("");

        const dispatch = useDispatch();
        const { isFetching, error, messageError } = useSelector((state) => state.user)

        const handleChange = (e) => {
                if (e.target.name == 'phone') {
                        let value = e.target.value;

                        // حذف همه کاراکترهای غیر عددی
                        value = value.replace(/\D/g, '');

                        // اطمینان از اینکه شماره با 09 شروع می‌شود
                        if (value[0] != '0' && value.length == 1) {
                                value = '';
                        }
                        if (value[1] != '9' && value.length == 2) {
                                value = value[0];
                        }

                        // محدود کردن طول به 11 رقم
                        value = value.slice(0, 11);

                        setInputs(prev => ({
                                ...prev,
                                [e.target.name]: value
                        }));
                } else {
                        // برای سایر فیلدها، رفتار قبلی را حفظ می‌کنیم
                        setInputs(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value
                        }));
                }
        };

        const validateInputs = () => {
                const newErrors = {};
                if (!inputs.name.trim()) newErrors.name = true;
                if (!inputs.phone.trim()) newErrors.phone = true;
                if (!inputs.userName.trim()) newErrors.userName = true;
                if (!inputs.password.trim()) newErrors.password = true;
                if (!inputs.passwordR.trim()) newErrors.passwordR = true;
                setErrors(newErrors);
                return Object.keys(newErrors).length === 0;
        };

        const validPasswords = () => {
                if (inputs.password == inputs.passwordR){
                        return true;
                }else{
                        setMessageErrorPassword('رمزهای عبور مطابقت ندارند');
                        return false;
                }
        }

        const handleClick = (e) => {

                e.preventDefault();
                if(validateInputs())
                        if(validPasswords())
                                register(dispatch, { name: inputs.name, password: inputs.password, phone: inputs.phone, email: inputs.email, userName: inputs.userName})
                

        }

        return (
                <Container>
                        <Wrapper>
                                <Title>ثبت نام</Title>
                                <Form>
                                        {(error && <ErrorMessage>{messageError}</ErrorMessage>) || (messageErrorPassword != '' &&<ErrorMessage>{messageErrorPassword}</ErrorMessage>)}
                                        <Input placeholder="نام و نام خانوادگی" name='name' onChange={handleChange} style={{ borderColor: errors.name ? 'red' : undefined }} />
                                        <Input type='email' placeholder="ایمیل" name='email' />
                                        <Input type='tel' placeholder="شماره تلفن" style={{ direction: 'rtl', borderColor: errors.phone ? 'red' : undefined }} name='phone' value={inputs.phone} onChange={handleChange} />
                                        <Input placeholder="نام کاربری" name='userName' onChange={handleChange} style={{ borderColor: errors.userName ? 'red' : undefined }} />
                                        <Input type='password' placeholder="رمز عبور" name='password' onChange={handleChange} style={{ borderColor: errors.password ? 'red' : undefined }} />
                                        <Input type='password' placeholder="تکرار رمز عبور" name='passwordR' onChange={handleChange} style={{ borderColor: errors.passwordR ? 'red' : undefined }} />
                                        <Button onClick={handleClick} disabled={isFetching}>ثبت نام</Button>
                                </Form>
                        </Wrapper>
                </Container>
        )
}