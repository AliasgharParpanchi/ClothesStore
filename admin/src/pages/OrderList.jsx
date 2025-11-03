import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutlined, Close } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { convertToPersian } from './../ConvertDate.js'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder, deleteOrder } from '../redux/apiCalls'


const Container = styled.div`
           width: 1000px;
           flex: 4;
`;


const Order = styled.div`
          display: flex;
          aligen-items: center;
`;

const OrderListButton = styled.button`
          border: none;
          border-radius: 10px;
          padding: 5px 10px;
          background-color: #3bb077;
          color: white;
          cursor: pointer;
          margin-right: 10px;
`;
const DeleteButton = styled.div`
         color: red;
         cursor: pointer;
`;

const CloseButton = styled.button`
          border: none;
          cursor: pointer;
          background-color: white;
          display: flex;
`;




const BottonDiv = styled.div``;
const POPButton = styled.button`
          border: none;
          background-color: white;
          border-radius: 10px;
          cursor: pointer;
`;
const Popup = styled.div`
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: display;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          direction: rtl;
`;
const PaymentList = styled.div`
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
const ProductList = styled.ul`
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
const ProductItem = styled.li`
          background-color: white;
          padding: 5px;
`;

const Payment = styled.span``;


export default function OrderList() {
  const [showPaymentPopup, setShowPaymentPopup] = useState(null);
  const [showProductPopup, setShowProductPopup] = useState(null);
  const [showShoppingInfoPopup, setShowShoppingInfoPopup] = useState(null);

  const handleShowPaymentPopup = (id) => {
    setShowPaymentPopup(id);
  };

  const handleShowProductPopup = (id) => {
    setShowProductPopup(id);
  };

  const handleShowShoppingInfoPopup = (id) => {
    setShowShoppingInfoPopup(id);
  };

  const handleClosePopup = () => {
    setShowPaymentPopup(false);
    setShowProductPopup(false);
    setShowShoppingInfoPopup(false);
  };


  const dispatch = useDispatch();
  useEffect(() => {
    getOrder(dispatch)
  }, [dispatch])
  const orders = useSelector((state) => state.order.orders)

  const handleDelete = (id) => {
    deleteOrder(id, dispatch)
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
  function getColorLabel(item) {
    // ابتدا رنگ مورد نظر را از stock پیدا می‌کنیم
    const selectedStock = item.productInfo.stock.find(stock => stock._id === item.stockId);
    
    if (!selectedStock) {
      return 'نامشخص'; // اگر stock پیدا نشد
    }
  
    // حالا رنگ فارسی معادل را پیدا می‌کنیم
    const colorObject = primaryColors.find(color => color.value === selectedStock.color);
  
    return colorObject ? colorObject.label : 'نامشخص';
  }
  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'user', headerName: 'نام سفارش دهنده', width: 180, direction: 'rtl', renderCell: (params) => {
        return (
          <Order>
            {params.row.userDetails.name}
          </Order>
        )
      }
    },
    {
      field: 'createdAt', headerName: 'تاریخ ثبت سفارش', width: 150, direction: 'rtl', renderCell: (params) => {
        return (
          <Order>
            {convertToPersian(params.row.createdAt)}
          </Order>
        )
      }
    },
    {
      field: 'updatedAt', headerName: 'تاریخ تغییر وضعیت سفارش', width: 150, direction: 'rtl', renderCell: (params) => {
        return (
          <Order>
            {convertToPersian(params.row.updatedAt)}
          </Order>
        )
      }
    },
    {
      field: 'status',
      headerName: 'وضعیت',
      width: 120,
      direction: 'rtl'
    },
    {
      field: 'paymentInfo', headerName: 'وضعیت پرداخت', width: 180, direction: 'rtl', renderCell: (params) => {
        return (
          <>
            <BottonDiv>
              <POPButton onClick={() => handleShowPaymentPopup(params.row._id)}>{params.row.paymentInfo?.status || 'پرداخت نشده'}</POPButton>
            </BottonDiv>

            {showPaymentPopup === params.row._id && (
              <Popup onClick={handleClosePopup}>
                <PaymentList>
                  <CloseButton onClick={handleClosePopup}><Close style={{ width: '20px' }} /></CloseButton>
                  {params.row.hasOwnProperty('paymentInfo') ? (


                    ` شماره کارت :${params.row.paymentInfo.cardNumber}
                          وضعیت: ${params.row.paymentInfo.status}
                          تاریخ: ${convertToPersian(params.row.paymentInfo.createdAt)}`


                  ) : 
                    <Payment> اطلاعات ثبت نشده است</Payment>
                  }
                </PaymentList>
              </Popup>
            )}

          </>
        )
      }
    },
    {
      field: 'products', headerName: 'سفارشات', width: 180, direction: 'rtl', renderCell: (params) => {
        return (
          <>
            <BottonDiv>

              <POPButton onClick={() => handleShowProductPopup(params.row._id)}>مشاهده محصول</POPButton>
            </BottonDiv>

            {showProductPopup === params.row._id && (
              <Popup onClick={handleClosePopup}>
                <ProductList>
                  <CloseButton onClick={handleClosePopup}><Close style={{ width: '20px' }} /></CloseButton>
                  {Array.isArray(params.row.products) && params.row.products.length > 0 ? (
                    params.row.products?.map((item, index) => (
                      <ProductItem key={index}>
                        شناسه کالا: {item.productInfo._id}, نام کالا: {item.productInfo.name}
                        رنگ: {getColorLabel(item)}, 
                        سایز: {item.productInfo.stock.filter((stock) => (stock._id == item.stockId))[0].size},
                        تعداد: {item.quantity}
                      </ProductItem>
                    ))
                  ) :
                    <ProductItem>محصولی انتخاب نشده است</ProductItem>}
                </ProductList>
              </Popup>
            )}

          </>
        )
      }
    },
    {
      field: 'shoppinginfoDetails', headerName: 'آدرس مقصد', width: 180, direction: 'rtl', renderCell: (params) => {
        return (
          <>
            <BottonDiv>
              <POPButton onClick={() => handleShowShoppingInfoPopup(params.row._id)}>مشاهده</POPButton>
            </BottonDiv>

            {showShoppingInfoPopup === params.row._id && (
              <Popup onClick={handleClosePopup}>
                <PaymentList>
                  <CloseButton onClick={handleClosePopup}><Close style={{ width: '20px' }} /></CloseButton>
                  {params.row.hasOwnProperty('shoppinginfoDetails') ? (


                         `شهر :${params.row.shoppinginfoDetails.city}
                          آدرس: ${params.row.shoppinginfoDetails.address}
                          شماره پلاک: ${params.row.shoppinginfoDetails.state}
                          کدپستی: ${params.row.shoppinginfoDetails.zipCode}`


                  ) : (
                    <Payment> اطلاعات ثبت نشده است</Payment>
                  )}
                </PaymentList>
              </Popup>
            )}

          </>
        )
      }
    },
    {
      field: 'totalPrice',
      headerName: 'قیمت (تومان)',
      width: 120,
      direction: 'rtl'
    },
    {
      field: 'Action',
      headerName: 'اقدام',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/Order/' + params.row._id}>
              <OrderListButton>ویرایش</OrderListButton>
            </Link>
            <DeleteButton>
              <DeleteOutlined onClick={() => handleDelete(params.row._id)} />
            </DeleteButton>
          </>
        )
      }
    }
  ];


  return (
    <Container>
      <DataGrid
        rows={orders}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection

      />
    </Container>
  )
}