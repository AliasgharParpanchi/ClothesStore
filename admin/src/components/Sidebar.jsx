import React from 'react'
import styled from 'styled-components'
import { LineStyle, PermIdentity, Storefront } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Container = styled.div`
        flex: 1;
        height: calc(100vh - 50px);
        background-color: #ccccff;
        position: sticky;
        top: 50px;
        align-items: right;
        direction: rtl;
`
const Wrapper = styled.div`
        padding: 20px;
        color: #000066;
`
const Menu = styled.div`
        margin-bottom: 10px;

`
const Title = styled.h3`
        font-size: 13px;
        color: #ff1a1a;
`
const List = styled.ul`
        list-style: none;
        padding: 5px;
`
const ListItem = styled.li`
        padding: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 10px;
        &:hover {
          background-color: rgba(228, 228, 250);
        }
        &:active {
          background-color: rgba(228, 228, 255);
        }
        
`

const Icons = styled.i`
       margin-left: 5px;
       font-size: 20px;
`;

export default function Sidebar() {
  return (
    <Container>
      <Wrapper>
        <Menu>
          <Title>داشبورد</Title>
          <List>
            <Link to="/" style={{ textDecoration: 'none' , color: 'inhert'}}>
              <ListItem>
                <Icons>
                  <LineStyle />
                </Icons>
                خانه
              </ListItem>
            </Link>
          </List>
        </Menu>
        <Menu>
          <Title>مشتریان</Title>
          <List>
            <Link to="/Users" style={{ textDecoration: 'none' , color: 'inhert'}}>
              <ListItem >
                <Icons>
                  <PermIdentity />
                </Icons>
                لیست مشتریان
              </ListItem>
            </Link>
            <Title>محصولات</Title>
            <Link to="/products" style={{ textDecoration: 'none' , color: 'inhert'}}>
              <ListItem >
                <Icons>
                  <Storefront />
                </Icons>
                لیست محصولات
              </ListItem>
            </Link>
            <Link to="/newProduct" style={{ textDecoration: 'none' , color: 'inhert'}}>
              <ListItem >
                <Icons>
                  <Storefront />
                </Icons>
                محصولات جدید 
              </ListItem>
            </Link>
          </List>
          <Title>سفارشات</Title>
          <List>
          <Link to="/Orders" style={{ textDecoration: 'none' , color: 'inhert'}}>
              <ListItem >
                <Icons>
                  <PermIdentity />
                </Icons>
                لیست سفارشات
              </ListItem>
            </Link>
          </List>
        </Menu>
      </Wrapper>
    </Container>
  )
}
