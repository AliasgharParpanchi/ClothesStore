import { loginFailure, loginStart, loginSuccess,
         updateAdminStart, updateAdminSuccess, updateAdminFailure 
} from "./adminRedux";
import {
   getProductStart, getProductSuccess, getProductFailure,
   deleteProductStart, deleteProductSuccess, deleteProductFailure,
   updateProductStart, updateProductSuccess, updateProductFailure,
   addProductStart, addProductSuccess, addProductFailure
} from "./productRedux";
import {
   getOrderStart, getOrderSuccess, getOrderFailure,
   deleteOrderStart, deleteOrderSuccess, deleteOrderFailure,
   updateOrderStart, updateOrderSuccess, updateOrderFailure
} from "./orderRedux";
import {
   getUserStart, getUserSuccess, getUserFailure
} from "./userRedux";
import { publicRequest, adminRequest } from "../requestMethods";

export const login = async (dispatch, admin) => {
   dispatch(loginStart());
   
   try {
      const res = await publicRequest.post("/admin/login", admin);
      dispatch(loginSuccess(res.data))
   } catch (err) {
      dispatch(loginFailure(err));
   }
}

export const updateAdmin = async (id, dispatch, admin) => {
   dispatch(updateAdminStart());
   try {
      // update
      const res = await adminRequest.put(`/admin/update/${id}`, admin);
      dispatch(updateAdminSuccess(res.data)).then(
         window.location.replace('/')
      );
   } catch (err) {
      dispatch(updateAdminFailure());
   }
};

export const getProducts = async (dispatch) => {
   dispatch(getProductStart());
   try {
      const res = await publicRequest.get("products/");
      dispatch(getProductSuccess(res.data));
   } catch (err) {
      dispatch(getProductFailure(err));
   }
}



export const deleteProducts = async (id, dispatch) => {
   dispatch(deleteProductStart());
   try {
      const res = await adminRequest.delete(`products/delete/${id}`);
      dispatch(deleteProductSuccess(res.data));
   } catch (err) {
      dispatch(deleteProductFailure(err));
   }
}

export const updateProduct = async (id, productForServer, dispatch, productForFront) => {
   dispatch(updateProductStart());
   try {
      // update
      const res = await adminRequest.put(`/products/update`, productForServer);
      dispatch(updateProductSuccess( id, productForFront )).then(
         window.location.replace('/products')
      );
   } catch (err) {
      dispatch(updateProductFailure());
   }
};
export const addProduct = async (product, dispatch) => {
   dispatch(addProductStart());
   try {
      console.log()
      const res = await adminRequest.post(`/products/add/`, product)
      dispatch(addProductSuccess(res.data));
   } catch (err) {
      dispatch(addProductFailure());
   }
};

export const getOrder = async (dispatch) => {
   dispatch(getOrderStart());
   try {
      const res = await adminRequest.get("orders/");
      dispatch(getOrderSuccess(res.data));
   } catch (err) {
      dispatch(getOrderFailure(err));
   }
}

export const updateOrder = async (id, orderForServer, dispatch, orderForFront) => {
   dispatch(updateOrderStart());
   try {
      // update
      const res = await adminRequest.put(`/Orders/update`, orderForServer).then(
         window.location.replace('/Orders')
      );
      dispatch(updateOrderSuccess({ id, orderForFront }));
   } catch (err) {
      dispatch(updateOrderFailure());
   }
};

export const deleteOrder = async (id, dispatch) => {
   dispatch(deleteOrderStart());
   try {
      const res = await adminRequest.delete(`/Orders/delete/${id}`);
      dispatch(deleteOrderSuccess(res.data));
   } catch (err) {
      dispatch(deleteOrderFailure(err));
   }
}

export const getUsers = async (dispatch) => {
   dispatch(getUserStart());
   try {
      const res = await adminRequest.get("/admin/findAll");
      dispatch(getUserSuccess(res.data));
   } catch (err) {
      dispatch(getUserFailure(err));
   }
}