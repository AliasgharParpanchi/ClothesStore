import React from 'react'
import Navebar from '../components/Navebar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Announcement/ >
      <Navebar/>
      <Slider/>
      <Categories/> 
      <Products/>
      <Footer/>
    </div>
  )
}
