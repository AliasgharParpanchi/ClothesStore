import React from 'react'
import styled from 'styled-components'
import { Settings} from '@mui/icons-material'
import { Link } from 'react-router-dom'


const Container = styled.div`
      width: 100%;
      height: 50px;
      background-color: white;
      position: sticky;
      top: 0;
      z-index: 999;
`;

const Wrapper = styled.div`
      height: 100%;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
`;
const LeftIcon = styled.div`
      display: flex;
      align-items: center;
`
const Right = styled.div``
const Logo = styled.span`
       font-weight: bold;
       font-size: 30px;
       color: darkblue;
       cursor: pointer;
`
const IconsContainer = styled.div`
       position: relative;
       cursor: pointer;
       margin-left: 10px;
       color: #555;

`


const CenterImg = styled.div`
        display: flex;
        align-items: center;
`

const ProfileImg = styled.img`
       width: 40px;
       hieght: 40px;
       border-radius: 50%;
       cursor: pointer;
`

export default function TopBar() {
  return (
   <Container>
     <Wrapper>
       <LeftIcon>
         <IconsContainer>
         <ProfileImg src='/logo.svg' />
         </IconsContainer>
         <Link to={'/ChangePassword' }>
         <IconsContainer>
           <Settings />
         </IconsContainer>
         </Link>
       </LeftIcon>
       <CenterImg>

        
       </CenterImg>
       <Right>
         <Logo>
          clothesStore
         </Logo>
       </Right>
     </Wrapper>
   </Container>
  )
}
