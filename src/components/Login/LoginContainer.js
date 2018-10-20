import React, {Component} from "react";
import LoginForm from './LoginForm';
import MobileNav from '../global/Mobile/MobileNav';
import HeaderNav from '../global/HeaderNav';
class Login extends Component {

  render()
  {
    // if user is already logged in, then return products, else, return login {
      return (
        <div>
          <MobileNav />
          <HeaderNav />
          <LoginForm />
        </div>
      );
    };
};
export default Login;

