import { Instagram, WhatsApp, Telegram, Room, Phone, Email } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"


const Container = styled.div`
        display: flex;
        
`

const Left = styled.div`
        
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 2opx;
`

const Logo = styled.h1`
         margin-right: 300px;
`

const ContactItem = styled.p`
        direction: rtl;
        text-align: right;
        margin: 20px 0px;

`
const Desc = styled.p`
        direction: rtl;
        text-align: left;
        margin: 20px 0px;

`

const SocialContainer = styled.div`
         display: flex;
`

const SocialIcon = styled.div`
         width: 40px;
         height: 40px;
         border-radius: 50%;
         color: white;
         background-color: #${props => props.color};
         display: flex;
         align-items: center;
         justify-content: center;
         margin-right: 15px;
         cursor: pointer;
`
const Center = styled.div`
        flex: 1;
        padding: 20px;
        text-align: center;
`
const Title = styled.h3`
         margin-bottom: 30px;
         text-align: center;
         direction: rtl;
`

const List = styled.ul`
        margin: 0;
        padding: 0;
        list-style: none;
        text-align: unset;
        direction: rtl;
        display: flex;
        flex-wrap: wrap;

`

const ListItem = styled.li`
         width: 50%;
         margin-bottom: 10px;
`

const Right = styled.div`
        flex: 1;
        padding: 20px;
`

export default function Footer() {
        return (
                <Container>
                        <Left>
                                <Logo>Clothes</Logo>

                                <SocialContainer>
                                        <SocialIcon color="739DFF">
                                                <Telegram />
                                        </SocialIcon>
                                        <SocialIcon color="5784AA">
                                                <Instagram />
                                        </SocialIcon>
                                        <SocialIcon color="2AC450">
                                                <WhatsApp />
                                        </SocialIcon>
                                </SocialContainer>
                                <Desc>
                                        خرید های راحت
                                </Desc>
                        </Left>
                        <Center>
                                <Title>لینک های مفید</Title>
                                <List>
                                        <ListItem>
                                                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                                                        خانه
                                                </Link>
                                        </ListItem>
                                        <ListItem>
                                                <Link to="/CartItem" style={{ textDecoration: 'none', color: 'black' }}>
                                                        سبد خرید
                                                </Link>
                                        </ListItem>
                                        <ListItem>
                                                <Link to={`/products/مردانه`} style={{ textDecoration: 'none', color: 'black' }}>
                                                        مد مردانه
                                                </Link>
                                        </ListItem>
                                        <ListItem>
                                                <Link to={`/products/زنانه`} style={{ textDecoration: 'none', color: 'black' }}>
                                                        مد زنانه
                                                </Link>
                                        </ListItem>
                                        <ListItem>اکانت من</ListItem>
                                        <ListItem>درباره ما</ListItem>
                                </List>
                        </Center>
                        <Right>
                                <ContactItem>

                                        **اطلاعات تماس**
                                </ContactItem>

                                <ContactItem>
                                        <Room />
                                        آدرس: تهران، خیابان ولیعصر، پلاک 123
                                </ContactItem>
                                <ContactItem>
                                        <Phone />
                                        شماره تلفن: 021-12345678
                                </ContactItem>
                                <ContactItem>
                                        <Email />
                                        ایمیل: info@example.com

                                </ContactItem>
                        </Right>
                </Container>
        )
}
