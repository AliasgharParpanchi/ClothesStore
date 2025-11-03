import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Publish } from '@mui/icons-material';
import { addProduct } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';


const Container = styled.div`
         flex: 4;
         direction: rtl;
         margin: 10px;
         -box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -webkit-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
         -moz-box-shadow: 4px 7px 6px -1px rgba(0,0,0,0.62);
`;
const Wrapper = styled.div`
         padding: 30px;
`;
const Title = styled.h1``;
const ProductForm = styled.form`
         display: flex;
         flex-wrap: wrap;
`;
const Item = styled.div`
         width: 400px;
         display: flex;
         flex-direction: column;
         margin-top: 10px;
         margin-left: 20px;
`;
const LableForm = styled.label`
         margin-bottom: 8px;
         font-size: 18px;
         font-weight: 600;
         color: blak;
`;
const InputForm = styled.input`
         height: 18px;
         padding: 10px;
         border: 1px solid gray;
         border-radius: 5px;
`;
const CreateButton = styled.button`
         width: 200px;
         border: none;
         background-color: darkblue;
         color: white;
         padding: 7px 10px;
         font-weight: 600;
         border-radius: 10px;
         margin-top: 30px;
         cursor: pointer;
`;
const StockButton = styled.button``;
const ItemStock = styled.div``;
const InputStock = styled.div`
         flex: 2;
`;
const SelectSize = styled.select``;
const OptionSize = styled.option``;
const ActiveCheckBox = styled.input``;
const Upload = styled.div``;
const LableUpload = styled.label``;
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
const ImageContainerStyles = styled.div`
    display: flex;
    alignItems: center;
    marginBottom: 10px;
  `;

const ImageStyles = styled.img`
    max-width: 100px;
    max-height: 100px;
    margin-right: 10px;
  `;
  const SelectColor = styled.select`
         margin-bottom: 10px;
`;
const OptionColor = styled.option``;

export default function newProduct() {
  const [stockItems, setStockItems] = useState([]);
  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [img, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [showPhotoModal, setPhotoShowModal] = useState(false);
  const dispatch = useDispatch();


  const handleAddStock = (e) => {
    const newStockItem = {
      color: 'red',
      size: 'XS',
      quantity: 1,
    };


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

  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }
  const handleCat = (e) => {
    setCat(e.target.value.split("،"));
  }

  const handleClick = (e) => {
    e.preventDefault();
    let formData = new FormData();
    img.forEach((image, index) => {
      formData.append('img', image.raw);
    });
    formData.append('category', cat);
    formData.append('stock', JSON.stringify(stockItems));
    for (let key in inputs) {
      formData.append(key, inputs[key]);
    }
    addProduct(formData, dispatch);

  }

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
  return (
    <Container>
      <Wrapper>
        <Title>محصول جدید</Title>
        <ProductForm>
          <Item>
            <LableForm>نام کالا</LableForm>
            <InputForm name="name" type="text" placeholder="کت جین" onChange={handleChange} />
          </Item>
          <Item>
            <LableForm>توضیحات</LableForm>
            <InputForm name="description" type="text" placeholder="جنس ضخیم و فوق العاده" onChange={handleChange} />
          </Item>
          <Item>
            <LableForm>طبقه بندی</LableForm>
            <InputForm name="category" type="text" placeholder="مردانه" onChange={handleCat} />
          </Item>
          <Item>
            <LableForm>قیمت</LableForm>
            <InputForm name="price" type="number" placeholder="100000" onChange={handleChange} />
          </Item>
          <Item>
            <ItemStock>
              <LableForm> موجودی</LableForm>
              <StockButton onClick={handleAddStock} style={{ width: "20px" }}>+</StockButton>
              <StockButton onClick={handleRemoveLastStock} style={{ width: "20px" }}>-</StockButton>
            </ItemStock>
            {stockItems.map((stockItem, index) => (
              <InputStock key={index}>
                <LableForm>رنگ:</LableForm>
                <SelectColor
                  value={stockItem.color}
                  onChange={(e) => handleStockChange(index, 'color', e.target.value)}
                >
                  {primaryColors.map((color) => (
                    <OptionColor key={color.value} value={color.value}>
                      {color.label}
                    </OptionColor>
                  ))}
                </SelectColor>
                <LableForm>اندازه:</LableForm>
                <SelectSize onChange={(e) => handleStockChange(index, 'size', e.target.value)}>
                  <OptionSize value="XS">XSmall</OptionSize>
                  <OptionSize value="S">Small</OptionSize>
                  <OptionSize value="M">Medium</OptionSize>
                  <OptionSize value="L">Large</OptionSize>
                  <OptionSize value="XL">XLarge</OptionSize>
                  <OptionSize value="XXL">XXLarge</OptionSize>
                  <OptionSize value="XXXL">XXXLarge</OptionSize>
                </SelectSize>
                <LableForm>تعداد:</LableForm>
                <InputForm
                  type="number"
                  placeholder="تعداد"
                  value={stockItem.quantity}
                  onChange={(e) =>
                    handleStockChange(index, 'quantity', Number(e.target.value))} style={{ width: "55px" }} />
              </InputStock>
            ))}
          </Item>
          <Item>
            <Upload>
              <LableUpload onClick={toggleModal}>
                <Publish />
              </LableUpload>
              {showPhotoModal && (
                <PopupModal>
                  <PopupContent>
                    <button type='button' onClick={toggleModal}>بستن</button>
                    <button type='button' onClick={addImage}>افزودن عکس</button>
                    <input
                      name="img"
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
          </Item>
          <Item>
            <LableForm>فعال:
              <ActiveCheckBox type="checkbox" checked={isActive} name="Active" style={{ width: "20px" }} onChange={handleChange} onClick={() => setIsActive(!isActive)} value={!isActive} />
            </LableForm>
          </Item>
          <CreateButton onClick={handleClick}>اضافه کردن</CreateButton>
        </ProductForm>
      </Wrapper>
    </Container>
  )
}