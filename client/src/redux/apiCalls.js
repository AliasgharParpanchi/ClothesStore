import { loginFailure, loginStart, loginSuccess,
         registerStart, registerSuccess, registerFailure,
         updateUserStart, updateUserSuccess, updateUserFailure,
         deleteAccountStart, deleteAccountSuccess, deleteAccountFailure
 } from "./userRedux";
import { getCartStart, getCartSuccess, getCartFailure,
         addCartStart, addCartSuccess, addCartFailure,
         deleteCartStart, deleteCartSuccess, deleteCartFailure
 } from "./cartRedux.js";
import { addOrderStart, addOrderSuccess, addOrderFailure } from "./orderRedux.js";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) =>{
    dispatch(loginStart());
    try {
       const res = await publicRequest.post("/users/login", user);
       dispatch(loginSuccess(res.data));
    }catch(err){
       dispatch(loginFailure(err));
    }
}

export const register = async (dispatch, user) =>{
   dispatch(registerStart());
   try {
      const res = await publicRequest.post("/users/register", user);
      dispatch(registerSuccess(res.data));
   }catch(err){
      dispatch(registerFailure(err));
   }
}

export const update = async (dispatch, user, id) =>{
   dispatch(updateUserStart());
   try {

      const res = await userRequest.put(`/users/${id}`, user);
      dispatch(updateUserSuccess(res.data)).then(
         window.location.replace('/')
      )
   }catch(err){
      dispatch(updateUserFailure(err));
   }
}
export const deleteAccount = async (id, dispatch) => {
   dispatch(deleteAccountStart());
   try {
      const res = await userRequest.delete(`users/${id}`);
      dispatch(deleteAccountSuccess(res.data)).then(
         window.location.replace('/')
      );
   } catch (err) {
      dispatch(deleteAccountFailure(err));
   }
}

export const getCarts = async (dispatch, userId) => {

   dispatch(getCartStart());
   try {
      const res = await userRequest.get("cartItem/find/" + userId);
      dispatch(getCartSuccess(res.data));
   } catch (err) {
      dispatch(getCartFailure(err));
   }
}

export const addCarts = async (dispatch, cartServer, cartFront) => {

   dispatch(addCartStart());
   try {
      const res = await userRequest.post("cartItem/add", cartServer );
      dispatch(addCartSuccess(cartFront));
   } catch (err) {
      dispatch(addCartFailure(err));
   }
}

export const deleteCarts = async (dispatch) => {
   dispatch(deleteCartStart());
   try {
      const parsedPersist = (JSON.parse(localStorage.getItem('persist:root')));
      const parsedusers = JSON.parse(parsedPersist.user);
      const Idusers = parsedusers.currentUser._id;
      const res = await userRequest.delete(`cartItem/delete/${Idusers}`);
      dispatch(deleteCartSuccess(res.data)).then(
         window.location.replace('/cartItem')
      );
   } catch (err) {
      dispatch(deleteCartFailure(err));
   }
}

export const addOrder = async (dispatch, order) => {

   dispatch(addOrderStart());
   try {
      const res = await userRequest.post("orders/add", order );
      dispatch(addOrderSuccess(res.data)).then(
         window.location.replace('/payment'),
         deleteCarts(dispatch)
      );
   } catch (err) {
      dispatch(addOrderFailure(err));
   }
}