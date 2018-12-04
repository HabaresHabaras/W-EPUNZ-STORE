import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/Home';
import Cart from './Cart/Cart';
import CheckoutContainer from './Checkout/CheckoutContainer';
import StylesContainer from './Styles/StylesContainer';
import ProductsContainer from './Products/ProductsContainer';
import SingleProductContainer from './Products/SingleProductContainer';
import OneClickCheckout from './Checkout/OneClickCheckout';
import LoginContainer from './Login/LoginContainer';
import SignUpContainer from './SignUp/SignUpContainer';
import OrderConfirmationContainer from './Orders/OrderConfirmationContainer';
import NotFound from './global/NotFound';
// import MobileNav from './global/Mobile/MobileNav';
import Footer from './global/Footer';

const App = props => (
  <div>
    {/* <MobileNav /> */}
    <Switch>
    <Route path="/login" component={LoginContainer} />

      <Route exact path="/" component={SignUpContainer} />
      <Route path="/cart" component={Cart} />
      <Route path="/gloox" component={StylesContainer} />
      <Route path="/products" component={ProductsContainer} />
      <Route path="/checkout" component={CheckoutContainer} />


      <Route path="/home" component={Home} />

      <Route
        path="/order-confirmation"
        component={OrderConfirmationContainer}
      />
      <Route path="/product/:id" component={SingleProductContainer} />
      <Route
        path="/one-click-checkout/:productId"
        component={OneClickCheckout}
      />
      <Route path="*" component={NotFound} />
    </Switch>

    <Footer />
  </div>
);
export default App;

