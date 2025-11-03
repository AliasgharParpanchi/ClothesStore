import React from 'react'
import styled from 'styled-components'
import { useState} from 'react'
import { login } from '../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux'


const Container = styled.div`
      
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
        &:disabled{
                color: green;
                cursor: not-allowed;
        }
`;

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
`

export default function Login() {
        const [userName, setUserName] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const { isFetching, error, messageError } = useSelector((state)=> state.admin)
        
        const handleClick = (e) => {
                
                e.preventDefault();
                login(dispatch, {userName, password})
                
        }
  return (
    <Container>
      <Wrapper>
        <Title>ورود کاربر</Title>
        <Form>
          {error &&<ErrorMessage>{messageError}</ErrorMessage>}
          <Input placeholder="نام مدیر"  onChange={(e)=>setUserName(e.target.value)}/>
          <br/>
          <Input placeholder="رمز عبور" type='password' onChange={(e)=>setPassword(e.target.value)}/> 
          <Button onClick={handleClick} disabled={isFetching}>ورود</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}
