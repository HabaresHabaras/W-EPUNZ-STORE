import React, {Component} from "react";
import SignUpForm from './SignUpForm';
import MobileNav from '../global/Mobile/MobileNav';
import HeaderNav from '../global/HeaderNav';
class SignUp extends Component {

  render()
  {
    // if user is already logged in, then return products, else, return login {
      return (
        <div>
          <MobileNav />
          <HeaderNav />
          <SignUpForm />
        </div>
      );
    };
};
export default SignUp;
