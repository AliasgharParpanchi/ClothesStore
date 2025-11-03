import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Chart from '../components/Chart'
import { Publish } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { adminRequest } from './../requestMethods';
import { updateProduct } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const Container = styled.div`
          flex: 4;
          direction: rtl;
          padding: 20px;
`;
const TitleContainer = styled.div`
          display: flex;
          justify-content: space-between;
`;
const Title = styled.h1``;
const AddButton = styled.button`
         width: 90px;
         border: none;
         padding: 5px;
         background-color: teal;
         color: white;
         border-radius: 5px;
         font-size: 16px;
         cursor: pointer;
`;
const Top = styled.div`
         display: flex;
`;
const Bottom = styled.div`
          flex: 1;
          padding: 20px;
          margin: 20px;
          -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
          -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
          -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const TopRight = styled.div`
         flex: 1;
`;
const TopLeft = styled.div`
         flex: 1;
         padding: 20px;
         margin: 20px;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const InfoTop = styled.div`
         display: flex;
         align-items: center;
`;
const InfoBottom = styled.div`
         margin-top: 10px;
`;
const InfoIMG = styled.img`
         width: 40px;
         height: 40px;
         border-radius: 50%;
         object-fit: cover;
         margin-left: 15px;
`;
const Name = styled.span`
         font-weight: 600;

`;
const InfoItem = styled.div`
         width: 150px;
         display: flex;
         justify-content: space-between;
`;
const InfoKey = styled.span``;
const InfoValue = styled.span``;
const PopStockButton = styled.button``;
const Form = styled.form`
         display: flex;
         justify-content: space-between;
`;
const FormRight = styled.div`
         display: flex;
         flex-direction: column;

`;
const FormLeft = styled.div`
         display: flex;
         flex-direction: column;
         justify-content: space-around;
`;
const Label = styled.label`
         margin-bottom: 10px;
         color: gray;
`;
const Input = styled.input`
         margin-bottom: 10px;
         border:none;
         padding: 5px;
         border-bottom: 1px solid gray;
`;
const StockButton = styled.button`
        width: 20px;
`;
const StockDiv = styled.div`
        display: flex;
        alignItems: center;
`;
const InputStock = styled.div``;
const SelectSize = styled.select`
         margin-bottom: 10px;
`;
const OptionSize = styled.option``;
const SelectColor = styled.select`
         margin-bottom: 10px;
`;
const OptionColor = styled.option``;
const ActiveCheckBox = styled.input``;
const PopupModal = styled.div`
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
`;
const PopupContent = styled.div`
          background-color: white;
          padding: 20px;
          border-radius: 5px;
`;
const PopupTitle = styled.h2``;
const StocList = styled.ul`
          list-style-type: none;
`;
const StockIl = styled.li``;
const Upload = styled.div`
          display: flex;
          align-items: center;
`;
const UploadIMG = styled.img`
         width: 100px;
         height: 100px;
         border-radius: 10px;
         obeject-fit: cover;
         margin-right: 20px;
`;
const Submit = styled.button`
         border: none;
         padding: 5px;
         border-radius: 5px;
         background-color: darkblue;
         color: white;
         font-weight: 600;
         cursor: pointer;
`;



const ImageContainerStyles = styled.div`
    display: flex;
    alignItems: center;
    marginBottom: 10px;
  `;

const ImageStyles = styled.img`
    max-width: 100px;
    max-height: 100px;
    marginRight: 10px;
  `;

export default function Product() {

    const location = useLocation()
    const productId = location.pathname.split("/")[2];
    const product = useSelector(state => state.product.products.find(product => product._id === productId))


    const [inputs, setInputs] = useState({});
    const [stockItems, setStockItems] = useState(product.stock);
    const [pState, setPState] = useState([]);
    const [cat, setCat] = useState([]);
    const [showStockPopup, setShowStockPopup] = useState(false);
    const [showPhotoModal, setPhotoShowModal] = useState(false);
    const [img, setImages] = useState(() =>
        product.img.map((image) => ({
            perview: image,
            raw: image
        }))
    );
    const [isActive, setIsActive] = useState(product.Active || true);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleAddStock = (e) => {
        const newStockItem = [{
            color: 'red',
            size: 'XS',
            quantity: 1,
        }];


        setStockItems([...stockItems, newStockItem]);
        e.preventDefault();
    }
    const handleRemoveLastStock = (e) => {
        setStockItems(stockItems.slice(0, -1));
        e.preventDefault();
    };

    const handleStockChange = (index, field, value) => {
        const updatedStockItems = [...stockItems];
        updatedStockItems[index][field] = value;
        setStockItems(updatedStockItems);
    };

    const handleShowPopup = () => {
        setShowStockPopup(true);
    };

    const handleClosePopup = () => {
        setShowStockPopup(false);
    };

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }
    const handleCat = (e) => {
        setCat(e.target.value.split(","));
      }


    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        img.forEach((image, index) => {
            formData.append('img', image.raw);
        });
        formData.append('category', cat);
        formData.append('stock', JSON.stringify(stockItems));
        formData.append('id', productId);
        for (let key in inputs) {
            formData.append(key, inputs[key]);
        }
        const product = {...inputs,  _id :productId , cat, stock: {stockItems}}
        updateProduct(productId, formData, dispatch, product);
    };




    const toggleModal = () => {
        setPhotoShowModal(!showPhotoModal);
    };

    const addImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        if (event.target.files[0].size > 0) {
            setImages([...img, {
                perview: URL.createObjectURL(event.target.files[0]),
                raw: event.target.files[0],
            }])
        }
    };

    const removeImage = (index) => {
        const newImages = [...img];
        newImages.splice(index, 1);
        setImages(newImages);
    }



    const primaryColors = [
        { label: 'قرمز', value: 'red' },
        { label: 'آبی', value: 'blue' },
        { label: 'زرد', value: 'yellow' },
        { label: 'سبز', value: 'green' },
        { label: 'مشکی', value: 'black' },
        { label: 'سفید', value: 'white' },
        { label: 'صورتی', value: 'pink' },
        { label: 'بنفش', value: 'purple' },
    ];

    const MONTHS = useMemo(
        () => [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"
        ],
        []
    );


    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await adminRequest.get("orders/income/?pid=" + productId);
                const list = res.data.sort((a, b) => a._id - b._id);
                list.map((item) =>
                    setPState((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch { }
        };
        getStats();
    }, [MONTHS]);
    

    return (
        <Container>
            <TitleContainer>
                <Title>محصول</Title>
                <Link to="/newProduct/">
                    <AddButton>محصول جدید</AddButton>
                </Link>
            </TitleContainer>
            <Top>
                <TopRight>
                    <Chart data={pState} dataKey="Sales" title="آمار فروش هر کالا" />
                </TopRight>
                <TopLeft>
                    <InfoTop>
                        <InfoIMG src={product.img[0]} alt="" />
                        <Name>{product.name}</Name>
                    </InfoTop>
                    <InfoBottom>
                        <InfoItem>
                            <InfoKey>شناسه کالا:</InfoKey>
                            <InfoValue>{product._id}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>توضیحات :</InfoKey>
                            <InfoValue>{product.description}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoKey>موجودی:</InfoKey>
                            <PopStockButton onClick={handleShowPopup}>مشاهده موجودی</PopStockButton>
                            {showStockPopup && (
                                <PopupModal>
                                    <PopupContent>
                                        <PopupTitle>موجودی</PopupTitle>
                                        {product.stock.map((item, index) => (
                                            <StocList key={index}>
                                                <StockIl>رنگ: {(primaryColors.map((color) => (color.value == item.color) ? color.label : '')) || item.color}, سایز: {item.size}, تعداد: {item.quantity}</StockIl>
                                            </StocList>
                                        ))}
                                        <button onClick={handleClosePopup}>بستن</button>
                                    </PopupContent>
                                </PopupModal>
                            )}
                        </InfoItem>
                    </InfoBottom>
                </TopLeft>
            </Top>
            <Bottom>
                <Form >
                    <FormRight>
                        <Label>نام کالا:</Label>
                        <Input type="text" placeholder={product.name} name='name' onChange={handleChange} />
                        <Label>توضیحات :</Label>
                        <Input type="text" placeholder={product.description} name='description' onChange={handleChange} />
                        <Label>طبقه بندی</Label>
                        <Input type='text' placeholder={product.category} name='category' onChange={handleCat} />
                        <Label>قیمت:</Label>
                        <Input type='number' placeholder={product.price} name='price' onChange={handleChange} />
                        <StockDiv>
                            <Label>موجودی:</Label>
                            <StockButton onClick={handleAddStock} style={{ width: "20px" }}>+</StockButton>
                            <StockButton onClick={handleRemoveLastStock} style={{ width: "20px" }}>-</StockButton>
                        </StockDiv>
                        {stockItems.map((stockItem, index) => (
                            <InputStock key={index}>
                                <Label>رنگ:</Label>
                                <SelectColor
                                    defaultValue={stockItem.color}
                                    onChange={(e) => handleStockChange(index, 'color', e.target.value)}
                                >
                                    {primaryColors.map((color) => (
                                        <OptionColor key={color.value} defaultValue={color.value}>
                                            {color.label}
                                        </OptionColor>
                                    ))}
                                </SelectColor>
                                <Label>اندازه:</Label>
                                <SelectSize defaultValue={stockItem.size} onChange={(e) => handleStockChange(index, 'size', e.target.value)}>
                                    <OptionSize value="XS">XSmall</OptionSize>
                                    <OptionSize value="S">Small</OptionSize>
                                    <OptionSize value="M">Medium</OptionSize>
                                    <OptionSize value="L">Large</OptionSize>
                                    <OptionSize value="XL">XLarge</OptionSize>
                                    <OptionSize value="XXL">XXLarge</OptionSize>
                                    <OptionSize value="XXXL">XXXLarge</OptionSize>
                                </SelectSize>
                                <Label>تعداد:</Label>
                                <Input
                                    type="number"
                                    placeholder="تعداد"
                                    defaultValue={stockItem.quantity}
                                    onChange={(e) =>
                                        handleStockChange(index, 'quantity', e.target.value)} />
                            </InputStock>
                        ))}

                        <Label>فعال:
                            <ActiveCheckBox type="checkbox" defaultChecked="true" name="Active" style={{ width: "20px" }} onChange={handleChange} checked={isActive}
                                onClick={() => setIsActive(!isActive)} value={isActive} />
                        </Label>
                    </FormRight>
                    <FormLeft>
                        <Upload>
                            <button type='button' onClick={toggleModal}>
                                <Publish/>
                            </button>
                            {showPhotoModal && (
                                <PopupModal>
                                    <PopupContent>
                                        <button type='button' onClick={toggleModal}>بستن</button>
                                        <button type='button' onClick={addImage}>افزودن عکس</button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        {img.map((image, index) => (
                                            <ImageContainerStyles key={index} >
                                                <ImageStyles src={image.perview} alt={`عکس ${index}`} />
                                                <button type='button' onClick={() => removeImage(index)}>حذف</button>
                                            </ImageContainerStyles>
                                        ))}
                                    </PopupContent>
                                </PopupModal>
                            )}
                        </Upload>
                        <Submit onClick={handleSubmit}>ذخیره کردن</Submit>
                    </FormLeft>
                </Form>
            </Bottom>
        </Container>
    )
}
