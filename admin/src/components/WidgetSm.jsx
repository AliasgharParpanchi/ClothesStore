import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { Create, Visibility} from '@mui/icons-material'
import {adminRequest} from './../requestMethods'
import { Link} from 'react-router-dom'

const Container = styled.div`
         flex: 1;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         padding: 20px;
         margin-left: 20px;
`;

const Title = styled.span`
         font-size: 32px;
         font-weight: 600;

`;

const List = styled.ul`
          margin: 0;
          padding: 0;
          list-style: none;
`;

const ListItem = styled.li`
           display: flex;
           align-items: center;
           justify-content: space-between;
           margin: 20px 0px;
`;

const Img = styled.img`
           width: 40px;
           height: 40px;
           border-radius: 50%;
           object-fit: cover;
`;

const User = styled.div`
            display: flex;
            flex-direction: column;
`;

const UserName = styled.span`
             font-weight: 600;

`;

const UserTitle = styled.span`
              font-weight: 300;
`;

const ButtonSm = styled.button`
               display: flex;
               align-items: center;
               border: none;
               border-radius: 10px;
               padding: 7px 10px;
               background-color: #eeeef7;
               color: #555;
               cursor: pointer;
`;

const IconButton = styled.div`
               font-size: 16px !important;
               margin-left: 5px;
`;
export default function WidgetSm() {
  const [users,setUsers] = useState([]);

  useEffect(() =>{
      const getUsers = async () =>{
        try{
          const res = await adminRequest.get("admin/findAll/?new=true");
          setUsers(res.data);
        }catch{

        }
      }
      getUsers();
  },[])
  return (
   <Container>
      <Title>کاربران جدید</Title>
      <List>
        {users.map(user =>(
        <ListItem key={user._id}>
          <Img src="https://th.bing.com/th/id/OIP.BoqJ8tKGpWzJm8UbfGVbOwHaHa?rs=1&pid=ImgDetMain" alt=''/>
          <User>
            <UserName>{user.userName}</UserName>
            <UserTitle>{user.name}</UserTitle>
          </User>
          <Link to={'/user/' + user._id}>
          <ButtonSm>
            <IconButton>
              <Visibility />
            </IconButton>
            نمایش
          </ButtonSm>
          </Link>
        </ListItem>
        ))}
      </List>
   </Container>
  )
}
