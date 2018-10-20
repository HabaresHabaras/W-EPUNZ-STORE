import React, { Component } from "react";
import * as api from '../../moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import { SUBMIT_LOGIN_FORM, GET_LOGIN_INFO} from '../../ducks/login';

function mapStateToProps(state) {
    return { push: state.push };
}

var loginStyle = {
    marginTop: '60px',
    marginLeft: '300px',
};

var token = {
    type: "token",
    email: 'John@email.com',
    password: 'wassssaaaa', 
};

class LoginForm extends Component {
    handleKeyDown = function(e) {
        if (e.key === 'Enter' && e.shiftKey === false) {
          e.preventDefault();
        }
      };

    mySubmit = values => {
        token.email = values.email;
        token.password = values.password;

        this.props.dispatch(dispatch => {
            dispatch({ type: SUBMIT_LOGIN_FORM });
        });

        api
            .GetCustomer(token.email, token.password)
            .then(() =>{
                this.props.dispatch(dispatch => {
                    dispatch({ type: GET_LOGIN_INFO});
                })
            })
            .catch(e => {
                console.log(e);
            });
    };
    render() {
        return (
            <div className="container" style={loginStyle}>
                <form className="login-form"
                    //this class has no styling or reference in the  code
                    noValidate
                    onSubmit={this.props.handleSubmit(this.mySubmit)}
                    onKeyDown={e => {
                        this.handleKeyDown(e);
                    }}>

                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <br></br>
                                <h2> Login</h2>
                            </div>
                                <div className="form-group">
                                <Field
                        component="input"
                        className="email"
                        required="required"
                        placeholder="Email address"
                        name="email"
                        type="email"
                        aria-label="Email"
                      />
                                </div>
                                <div className="form-group">

                                    <Field
                        component="input"
                        className="password"
                        required="required"
                        placeholder="Password"
                        name="password"
                        type="password"
                        aria-label="Password"
                      />
                                </div>
                                <div className="forgot">
                                    <a href="reset.html">Forgot password?</a>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
};

LoginForm = reduxForm({
    form: 'LoginForm'
  })(LoginForm);
    
export default connect(mapStateToProps)(LoginForm);