import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
      height: 30px;
      background-color: teal;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 50px;
`

export default function Annoucement() {
    return (
      <div>
        <Container>
             استثنائی خرید کنید
        </Container>
      </div>
    )
  }