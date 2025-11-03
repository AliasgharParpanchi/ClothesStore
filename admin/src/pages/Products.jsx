import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutlined, Close } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, deleteProducts } from '../redux/apiCalls'

const Container = styled.div`
         flex: 4;
         width: 99.5%;
`;

const Product = styled.div`
          display: flex;
          aligen-items: center;
`;
const IMG = styled.img`
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
`;
const ProductListButton = styled.button`
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
const Stock = styled.div``;
const StockButton = styled.button`
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
const StockList = styled.div`
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;
const IMGButton = styled.button`
          border: none;
          cursor: pointer;
          background-color: white;
          width: 32px;
          height: 32px;
          margin-right: 10px;
`;
const CloseButton = styled.button`
          border: none;
          cursor: pointer;
          background-color: white;
          display: flex;
`;
const StockUl = styled.ul`
          list-style-type: none;
`;
const Stockli = styled.li``;

const IMGList = styled.div`
          background-color: #fefefe;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: auto;
          display: flex;
          position: fixed;
`;
const IMGPopup = styled.img`
          width: 100px;
          height: auto;
          margin-right: 10px;
`;

export default function Products() {
  const [showStockPopup, setShowStockPopup] = useState(null);
  const [showIMGPopup, setShowIMGPopup] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])
  const products = useSelector((state) => state.product.products)


  const handleShowStockPopup = (id) => {
    setShowStockPopup(id);
  };

  const handleShowIMGPopup = (id) => {
    setShowIMGPopup(id);
  };

  const handleClosePopup = () => {
    setShowStockPopup(false);
    setShowIMGPopup(false);
  };

  const handleDelete = (id) => {
    deleteProducts(id, dispatch)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'product', headerName: 'نام کالا', width: 200, direction: 'rtl', componentValue: (params) => params.row.name,
      renderCell: (params) => {
        return (
          <>
            <Product>
              <IMGButton onClick={() => handleShowIMGPopup(params.row._id)}><IMG src={params.row.img[0]} alt="" /></IMGButton>
              {params.row.name}
            </Product>

            {showIMGPopup === params.row._id && (
              <Popup onClick={handleClosePopup}>
                <IMGList>
                  <CloseButton onClick={handleClosePopup}><Close style={{ width: '20px' }} /></CloseButton>
                  {Array.isArray(params.row.img) && params.row.img.length > 0 ? (
                    params.row.img.map((src, index) => (
                      <IMGPopup src={src} alt={index} />
                    ))
                  ) : <sapn>عکس موجود نیست</sapn>
                  }
                </IMGList>
              </Popup>
            )}
          </>
        )
      }
    },
    {
      field: 'stock', headerName: 'موجودی', width: 200, direction: 'rtl', renderCell: (params) => {
        return (
          <>
            <Stock>
              <StockButton onClick={() => handleShowStockPopup(params.row._id)}>مشاهده موجودی</StockButton>
            </Stock>

            {showStockPopup === params.row._id && (
              <Popup onClick={handleClosePopup}>
                <StockList>
                  <CloseButton onClick={handleClosePopup}><Close style={{ width: '20px' }} /></CloseButton>
                  <StockUl>
                    {Array.isArray(params.row.stock) && params.row.stock.length > 0 ? (
                      params.row.stock.map((item, index) => (
                        <Stockli key={index}>
                          رنگ: {item.color}, سایز: {item.size}, تعداد: {item.quantity}
                        </Stockli>
                      ))
                    ) : (
                      <Stockli>موجودی وجود ندارد</Stockli>
                    )}
                  </StockUl>
                </StockList>
              </Popup>
            )}

          </>
        )
      }
    },
    {
      field: 'status',
      headerName: 'وضعیت',
      width: 120,
      direction: 'rtl',
      renderCell: (params) => {
        return params.row.Active === true ? 'فعال' : 'غیرفعال';
      }
    },
    {
      field: 'price',
      headerName: 'قیمت',
      width: 180,
      direction: 'rtl'
    },
    {
      field: 'Action',
      headerName: 'اقدام',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/' + params.row._id}>
              <ProductListButton>ویرایش</ProductListButton>
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
        rows={products}
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
