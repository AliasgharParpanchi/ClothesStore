import React from 'react'
import styled from 'styled-components'
//import { PureComponent } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis,
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';



const Container = styled.div`
           margin: 20px;
           padding: 20px;
           -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
           -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
           -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;

const Title = styled.h3`
            margin-bottom: 20px;
`;

export default function Chart({ title, data, dataKey, grid}) {

  return (
    <Container>
       <Title>{title}</Title>
       <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="black"/>
            <Line type="monotone" dataKey={dataKey} stroke="black"/>
            <Tooltip />
            {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5  5"/>}
          </LineChart>
       </ResponsiveContainer>
    </Container>
  )
}
