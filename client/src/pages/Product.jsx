import { useLocation } from 'react-router-dom'
import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Navebar from '../components/Navebar'
import Annoucement from '../components/Announcement'
import Footer from '../components/Footer'
import { Remove, Add, ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'
import { publicRequest } from '../requestMethods.js'
import { addCarts } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'


const Container = styled.div``;

const Wrapper = styled.div`
        padding: 50px;
        display: flex;
        direction: rtl;
`;

const ImgContainer = styled.div`
        flex: 1;

`;

const Image = styled.img`
        width: 100%;
        height: 90vh;
        object-fit: cover;
`;

const InfoContainer = styled.div`
        flex: 1;
        padding: 0px 50px;
        margin-top: 50px;
`;

const Title = styled.h1`
        font-weight: 200;
`;

const Decs = styled.p`
        margin: 20px 0px;

`;

const Price = styled.span`
        font-weight: 100;
        font-size: 40px;
`;

const FilterContainer = styled.div`
        width: 50%;
        margin: 30px 0px;
        display: flex;
        justify-content: space-between;
`;

const Filter = styled.div`
        display: flex;
        align-items: center;
        
`;

const FilterTitle = styled.span`
        font-size: 20px;
        font-weight: 200;
`;

const FilterColor = styled.div`
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${(props) => props.color};
        margin: 0px 5px;
        cursor: pointer;
`;

const FilterSize = styled.select`
        margin-right: 10px;
        padding: 5px;
`;

const FilterSizeOption = styled.option`
        
`;

const AddContainer = styled.div`
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;

`;

const AmountContainer = styled.div`
        display: flex;
        align-items: center;
        font-weight: 700;
        
`;

const Amount = styled.span`
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: 1px solid teal;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 5px;
`;

const Button = styled.button`
        padding: 15px;
        border: 2px solid teal;
        background-color: #00bf6f;
        color: white;
        cursor: pointer;
        font-weight: 500;

        &:hover{
            background-color: #ff4d54;
        }
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;



const ArrowContainer = styled.div`
  display: flex;
  position: absolute;

`;


export default function Product() {
        const location = useLocation();
        const id = location.pathname.split("/")[2];
        const [product, setProduct] = useState({});
        const [color, setSelectedColor] = useState("");
        const [size, setSelectedSize] = useState("");
        const [quantity, setQuantity] = useState(1);
        const [slideIndex, setSlideIndex] = useState(0);
        const dispatch = useDispatch();
        const colors = [];

        useEffect(() => {
                const getProduct = async () => {
                        try {
                                const res = await publicRequest.get(`products/find/${id}`);

                                await setProduct(res.data);
                                setSelectedSize(res.data.stock[0].size)
                                SetColors();
                                setSelectedColor(colors[0])
                        } catch (e) {

                        }
                }
                getProduct();
        }, [id]);



        const getSizesOfColor = (color, product) => {
                //let count = 0;
                const sizes = product.stock?.filter(item => item.color === color)
                        .map(item => {
                                return item.size;
                        });
                return sizes;
        }
        const SetColors = () => {
                for (let i = 0; i < product.stock?.length; i++) {
                        if (colors.indexOf(product.stock[i]?.color) == -1)
                                colors.push(product.stock[i]?.color);
                }
                getSizesOfColor(colors[0], product)
        };

        SetColors();
        const getQuantity = (color, size, product) => {
                const quantityProduct = product.stock?.filter(item => item.color == color && item.size == size)
                        .map(item => {
                                return item.quantity;
                        })
                return quantityProduct;
        }
        const handleQuantity = (type) => {
                if (type == 'increase') {
                        getQuantity(color, size, product) > quantity && setQuantity(quantity + 1);
                } else {

                        quantity > 1 && setQuantity(quantity - 1);
                }

        };

        const handelClickAdd = () => {
                //add cart
                //dispatch(addCart({...product, color, size, quantity}));
                if (localStorage.getItem('persist:root')) {
                        const parsedPersist = (JSON.parse(localStorage.getItem('persist:root')));
                        if (parsedPersist) {
                                const parsedusers = JSON.parse(parsedPersist.user)
                                if (parsedusers.currentUser != null) {
                                        const userId = parsedusers.currentUser._id;
                                        const cartFront = { ...product, color, size, quantity }
                                        const stock = product.stock?.filter(stock => stock.color == color && stock.size == size)
                                        const cartServer = { userId, product: [{ productId: product._id, stockId: stock[0]._id, quantity }] }
                                        addCarts(dispatch, cartServer, cartFront);
                                }
                        }
                }
        };



        const handleClick = (direction) => {
                if (direction === "left") {
                        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : product?.img.length - 1);
                } else {
                        setSlideIndex(slideIndex < product?.img.length - 1 ? slideIndex + 1 : 0);
                }
        };

        return (
                <Container onLoad={() => { setSelectedColor(colors[0]), getSizesOfColor(colors[0], product) }}>
                        <Annoucement />
                        <Navebar />
                        <Wrapper>
                                <ArrowContainer>
                                        <Arrow direction="right" onClick={() => handleClick("right")}>
                                                <ArrowRightOutlined />
                                        </Arrow>
                                        <Arrow direction="left" onClick={() => handleClick("left")}>
                                                <ArrowLeftOutlined />
                                        </Arrow>
                                </ArrowContainer>

                                <ImgContainer>
                                        {product.img &&
                                                <Image src={product.img[slideIndex]} alt="" />
                                        }
                                </ImgContainer>
                                <InfoContainer>
                                        <Title>{product.name}</Title>
                                        <Decs>{product.description}</Decs>
                                        <Price>{product.price}تومان</Price>

                                        <FilterContainer>
                                                <Filter >
                                                        <FilterTitle>رنگ:</FilterTitle>
                                                        {colors?.map(color => (
                                                                <FilterColor
                                                                        color={color}
                                                                        key={color}
                                                                        title={color}
                                                                        onClick={() => [setSelectedColor(color), setSelectedSize(getSizesOfColor(color, product)?.[0])]}
                                                                />
                                                        ))}
                                                </Filter>
                                                <Filter >
                                                        <FilterTitle>سایز:</FilterTitle>
                                                        <FilterSize onChange={(e) => setSelectedSize(e.target.value)}>
                                                                {setSelectedColor && (getSizesOfColor(color || colors[0], product)?.map(size =>
                                                                        <FilterSizeOption key={size} >{size}</FilterSizeOption>))}
                                                        </FilterSize>
                                                </Filter>
                                        </FilterContainer>
                                        <AddContainer>
                                                <AmountContainer>
                                                        <Add onClick={() => handleQuantity("increase")} />
                                                        <Amount>{quantity}</Amount>
                                                        <Remove onClick={() => handleQuantity("decrease")} />
                                                </AmountContainer>
                                                <Button onClick={() => handelClickAdd()}>افزودن به سبد خرید</Button>
                                        </AddContainer>
                                </InfoContainer>
                        </Wrapper>
                        <Footer />
                </Container>
        )
}
