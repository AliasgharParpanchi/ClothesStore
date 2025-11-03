import React from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Topbar from "./components/TopBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import OrderList from './pages/OrderList';
import Order from './pages/Order';
import Products from './pages/Products';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import User from './pages/User';
import UserList from './pages/UserList';
import ChangePassword from './pages/ChangePassword';
import { useSelector } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
     display: flex;
     margin-top: 10px;
`
const OtherPage = styled.div`
       flex: 4;

`
function App() {
  const admin = useSelector((state) => state.admin.currentAdmin);
  console.log(admin)
  return (
    <Router>
      <Switch>
        <Route path="/login">
          {admin ? <Redirect to="/" /> : <Login />}
        </Route>
        {(admin ? (
          <>
            <Topbar />
            <Wrapper>
              <OtherPage>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/Orders">
                  <OrderList />
                </Route>
                <Route path="/Order/:OrderId">
                  <Order />
                </Route>
                <Route path="/User/:userId">
                  <User />
                </Route>
                <Route path="/Users">
                  <UserList />
                </Route>
                <Route path="/products">
                  <Products />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newProduct">
                  <NewProduct />
                </Route>
                <Route path="/ChangePassword">
                  <ChangePassword />
                </Route>
              </OtherPage>
              <Sidebar />
            </Wrapper>
          </>
        ):
        <Route >
          {admin ? <Redirect to="/" /> : <Login />}
        </Route>)}
      </Switch>
    </Router>
  )
}

export default App
