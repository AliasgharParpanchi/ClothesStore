import React from "react";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartItem from "./pages/CartItem";
import Account from "./pages/Account";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/CartItem">
          {user ? <CartItem /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/address">
          <Address />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route path="/login">
        {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/"/> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;