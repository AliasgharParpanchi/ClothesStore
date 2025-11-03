import React, { useState } from 'react'
import styled from 'styled-components'
import Navebar from '../components/Navebar';
import Annoucement from '../components/Announcement';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { update, deleteAccount } from '../redux/apiCalls';
import { logout } from '../redux/userRedux';
import { Link } from "react-router-dom";


const Container = styled.div`
        width: 98.5vw;
        height: 90vh;
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

const Filed = styled.div`
        display: flex;
        width: 90%;
`;

const Text = styled.h5`
        margin-top: 20px;
        width: 90px;
        margin-left: 0;
`;
const Input = styled.input`
        flex: 1;
        min-width: 25%;
        margin: 5px 0;
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
`;



export default function Account() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const [inputs, setInputs] = useState({ ...user.currentUser, phone: user.currentUser.phone.toString() })
    const [passwordR, setPasswordR] = useState()
    const [errors, setErrors] = useState({});
    const [messageErrorPassword, setMessageErrorPassword] = useState("");


    const handleChange = (e) => {
        if (e.target.name == "passwordR") {
            setPasswordR(e.target.value)
        } else if (e.target.name == 'phone') {
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
            setInputs({ ...inputs, [e.target.name]: e.target.value })
        }
    }

    const validateInputs = () => {
        const newErrors = {};
        if (!inputs.name.trim()) newErrors.name = true;
        if (!inputs.phone.trim()) newErrors.phone = true;
        if (!inputs.userName.trim()) newErrors.userName = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validPasswords = () => {
        if ((inputs.password == passwordR) || (typeof inputs.password == 'undefined' && typeof passwordR == 'undefined')) {
            return true;
        } else {
            setMessageErrorPassword('رمزهای عبور مطابقت ندارند');
            return false;
        }
    }

    const handleClick = (e) => {

        e.preventDefault();

        if (validateInputs())
            if (validPasswords())
                update(dispatch, { name: inputs.name, password: inputs.password, phone: inputs.phone, email: inputs.email, userName: inputs.userName }, user.currentUser._id)


    }

    const existAccount = () => {
        dispatch(logout());
    }

    const accountDelete = () => {
        deleteAccount(user.currentUser._id, dispatch)
    }

    return (
        <>
            <Annoucement />
            <Navebar />
            <Container>
                <Wrapper>
                    <Title> مشخصات {user.currentUser.name}</Title>
                    <Form>
                        {(user.error && <ErrorMessage>{user.messageError}</ErrorMessage>) || (messageErrorPassword != '' && <ErrorMessage>{messageErrorPassword}</ErrorMessage>)}
                        <Filed>
                            <Text>نام و نام خانوادگی:</Text>
                            <Input type="text" name="name" value={inputs.name} onChange={handleChange} style={{ borderColor: errors.name ? 'red' : undefined }}/>
                            <Text>نام کاربری:</Text>
                            <Input type="text" name="userName" value={inputs.userName} onChange={handleChange} style={{ borderColor: errors.userName ? 'red' : undefined }}/>
                        </Filed>
                        <Filed>
                            <Text>ایمیل:</Text>
                            <Input type="text" name="email" value={inputs.email} onChange={handleChange} />
                            <Text>شماره تلفن:</Text>
                            <Input type="text" name="phone" value={inputs.phone} onChange={handleChange} style={{ borderColor: errors.phone ? 'red' : undefined }}/>
                        </Filed>
                        <Filed>
                            <Text>رمز عبور:</Text>
                            <Input type="password" name="password" value={inputs.password} onChange={handleChange} />
                            <Text>تکرار رمز عبور:</Text>
                            <Input type="password" name="passwordR" value={passwordR} onChange={handleChange} />
                        </Filed>
                        <Button onClick={handleClick} disabled={user.isFetching}>بروزرسانی</Button>
                    </Form>
                    <Link to='/' onClick={existAccount}>خروج از حساب کاربری</Link>
                    <br />
                    <Link to='/' onClick={accountDelete}> حذف حساب کاربری</Link>
                </Wrapper>
            </Container>
            <Footer />
        </>
    )
}