import React, { Component } from "react";
import * as api from '../../moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


import { SUBMIT_SIGNUP_FORM } from '../../ducks/signUp';

var signUpStyle = {
    marginTop: '60px',
    marginLeft: '300px',
};

function mapStateToProps(state) {
    return { push: state.push };
}

var customerInformation = {
    type: "customer",
    name: "Juan",
    email: "JuanIbarra@email.com",
    password: "Contrasennha"

}
class SignUpForm extends Component {

    handleKeyDown = function(e) {
        if (e.key === 'Enter' && e.shiftKey === false) {
          e.preventDefault();
        }
      };

    mySubmit = values => {
        customerInformation.type = "customer";
        customerInformation.name = values.name;
        customerInformation.email = values.email;
        customerInformation.password = values.password;

        this.props.dispatch(dispatch => {
            dispatch({ type: SUBMIT_SIGNUP_FORM });
        });

        api
            .CreateCustomer(customerInformation)

            .catch(e => {
                console.log(e);
            });
    };
    render() {
        return (
            <div className="container" style={signUpStyle}>
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <br></br>
                            <h2> SignUp</h2>
                        </div>
                        <form id="SignUp" 
                                    noValidate
                                    onSubmit={this.props.handleSubmit(this.mySubmit)}
                                    onKeyDown={e => {
                                          this.handleKeyDown(e);
                                     }}>
                            <div className="form-group">

                                <Field
                                    component="input"
                                    className="name"
                                    required="required"
                                    placeholder="Nickname"
                                    name="name"
                                    type="username"
                                    aria-label="Username"
                                />
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

                            <button type="submit" className="btn btn-primary">Sign Up!</button>

                        </form>
                    </div>
                </div>
            </div>

        )
    }
};


SignUpForm = reduxForm({
    form: 'SignUpForm'
})(SignUpForm);

export default connect(mapStateToProps)(SignUpForm);
