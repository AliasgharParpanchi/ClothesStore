import { Badge } from '@mui/material'
import React, { useEffect } from 'react'
import { PersonOutline, ShoppingCartOutlined } from '@mui/icons-material'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { getCarts } from '../redux/apiCalls';

const Container = styled.div`
      height: 60px;
`

const Wrapper = styled.div`
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

`


const MenuItem = styled.div`
         font-size: 14px;
         cursor: pointer;
         margin-left: 10px;
`
const Left = styled.div`
      flex: 1;
      display: flex;
      align-items: center;
      
`
const Center = styled.div`
      flex: 1; 
      align-items: center;
`

const Logo = styled.h1`
        font-weight: bold;  
        text-align: center;
`

const Right = styled.div`
      flex: 1;
      display: flex;
      justify-content:flex-end;
      
`

export default function Navebar() {
      let Idusers;
      const dispatch = useDispatch();
      const user = useSelector((state) => state.user)

      useEffect(() => {

            if (user.currentUser != null) {
                  getCarts(dispatch, user.currentUser._id)
            }


      }, [dispatch])
      const Cart = useSelector(state => state.cart)
      return (
            <Container >
                  <Wrapper>
                        <Left>
                              <Link to="/cartItem" >
                                    <MenuItem>
                                          <Badge badgeContent={(Cart.Carts[0]?.quantity ? Cart.Carts[0]?.quantity : 0)} color="primary">
                                                <ShoppingCartOutlined />
                                          </Badge>
                                    </MenuItem>
                              </Link>
                        </Left>
                        <Center>
                              <Logo>Clothes</Logo>
                        </Center>
                        <Right>
                              {user.currentUser?._id ? (
                                    <Link to="/account" style={{ textDecoration: 'none' }} >
                                          <MenuItem>
                                                <PersonOutline />
                                          </MenuItem>
                                    </Link>
                              ) : (
                                    <>
                                          <Link to="/register" style={{ textDecoration: 'none' }}>
                                                <MenuItem>ثبت نام</MenuItem>
                                          </Link>
                                          <Link to="/login" style={{ textDecoration: 'none' }} >
                                                <MenuItem>ورود</MenuItem>
                                          </Link>
                                    </>
                              )}
                        </Right>
                  </Wrapper>

            </Container>
      )
}
