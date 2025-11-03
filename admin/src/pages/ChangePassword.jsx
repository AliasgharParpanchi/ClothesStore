import React, { useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdmin } from '../redux/apiCalls';
import { logOut } from '../redux/adminRedux';
import { Link } from "react-router-dom";


const Container = styled.div`
         flex: 4;
         direction: rtl;
         padding-right: 20px;
`;
const Title = styled.h1``;
const AdminForm = styled.form`
         display: flex;
         flex-wrap: wrap;
`;
const Item = styled.div`
         width: 400px;
         display: flex;
         flex-direction: column;
         margin-top: 10px;
         margin-left: 20px;
`;
const LableForm = styled.label`
         margin-bottom: 8px;
         font-size: 18px;
         font-weight: 600;
         color: blak;
`;
const InputForm = styled.input`
         height: 18px;
         padding: 10px;
         border: 1px solid gray;
         border-radius: 5px;
`;
const CreateButton = styled.button`
         width: 200px;
         border: none;
         background-color: darkblue;
         color: white;
         padding: 7px 10px;
         font-weight: 600;
         border-radius: 10px;
         margin-top: 30px;
         cursor: pointer;
`;

const ErrorMessage = styled.span`
      background-color: red;
      color: white;
`;

export default function updateAdminPage() {

  const [inputs, setInputs] = useState({});
  const { isFetching, error, messageError } = useSelector((state)=> state.admin)


  const parsedPersist = (JSON.parse(localStorage.getItem('persist:root')));
  const parsedAdmin = JSON.parse(parsedPersist.admin)
  const IdAdmin = parsedAdmin.currentAdmin._id;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev => {
        return { ...prev, [e.target.name]: e.target.value }
    });
}

const existAccount = () => {
  dispatch(logOut());
}

const handleClick = (e) => {
                
  e.preventDefault();
  updateAdmin(IdAdmin, dispatch, inputs);
  
}

  return (
    <Container>
     <Title>ویرایش مدیر</Title>
     <AdminForm>
     {error &&<ErrorMessage>{messageError}</ErrorMessage>}
      <Item>
        <LableForm>نام کاربری</LableForm>
        <InputForm type="text" name="AdminName" placeholder="admin" onChange={handleChange} />
      </Item>
      <Item>
        <LableForm>رمز عبور</LableForm>
        <InputForm type="password" name="password" placeholder="password" onChange={handleChange} />
      </Item>
      <CreateButton onClick={handleClick} disabled={isFetching} >ویرایش</CreateButton>
     </AdminForm>
     <Link to='/' onClick={existAccount}>خروج از حساب کاربری</Link>
    </Container>
  )
}