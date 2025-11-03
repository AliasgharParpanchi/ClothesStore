import React, { useState } from 'react'
import styled from 'styled-components'
import Navebar from '../components/Navebar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'


const Container = styled.div`
         
`;

const Title = styled.h1`
         margin: 20px;
         text-align: center;
`;

const FilterContainer = styled.div`
         display: flex;
         direction: rtl;
         justify-content: space-between;
         
`;

const Filter = styled.div`
          margin: 20px;
`;

const FilterText = styled.span`
           font-size: 20px;
           font-weight: 600;
           margin-right: 20px;
`;

const Select = styled.select`
            padding: 10px;
            margin-right: 20px;
`;

const Option = styled.option`
            
`;

export default function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  };
  
  return (
    <Container>
       <Announcement/>
       <Navebar/>
       <Title>{cat}</Title>
       <FilterContainer>
        <Filter>
            <FilterText>فیلتر محصولات:</FilterText>
            <Select name="color" onChange={handleFilters}>
                <Option disabled>
                  رنگ 
                </Option>
                <Option>سفید</Option>
                <Option>مشکی</Option>
                <Option>قرمز</Option>
                <Option>آبی</Option>
                <Option>زرد</Option>
                <Option>سبز</Option>
            </Select >
            <Select name="size" onChange={handleFilters}>
                <Option disabled>
                  سایز 
                </Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>
            </Select>
        </Filter>
        <Filter>
            <FilterText>نمایش محصولات:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
                <Option value="newst">جدیدترین</Option>
                <Option value="asc">ارزان ترین</Option>
                <Option value="desc">گران ترین</Option>
            </Select>
        </Filter>
       </FilterContainer>
       <Products cat={cat} filters={filters} sort={sort}/>
       <Footer/>
    </Container>
  )
}
