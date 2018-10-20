import React, { Component } from 'react';
import CheckoutSummary from './CheckoutSummary';
import { Field, reduxForm } from 'redux-form';
import * as api from '../../moltin';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { SUBMIT_PAYMENT, PAYMENT_COMPLETE } from '../../ducks/payments';

function mapStateToProps(state) {
  return { push: state.push };
}

var CheckoutTemplate = {
  customer: {
    name: 'John Doe',
    email: 'john@doe.co'
  },
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne', 
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  },
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    line_1: '2nd Floor British India House',
    line_2: '15 Carliol Square',
    city: 'Newcastle Upon Tyne',
    postcode: 'NE1 6UF',
    county: 'Tyne & Wear',
    country: 'United Kingdom'
  }
};
var PaymentTemplate = {
  gateway: 'stripe',
  method: 'purchase',
  first_name: 'John',
  last_name: 'Doe',
  number: '4242424242424242',
  month: '08',
  year: '2020',
  verification_value: '123'
};

class CheckoutForm extends Component {
  handleKeyDown = function(e) {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
    }
  };

  mySubmit = values => {
    CheckoutTemplate.customer.name = values.name;
    CheckoutTemplate.customer.email = values.email;

    CheckoutTemplate.billing_address.first_name = values.billing_firstname;
    CheckoutTemplate.billing_address.last_name = values.billing_lastname;
    CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
    CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
    CheckoutTemplate.billing_address.city = values.billing_state;
    CheckoutTemplate.billing_address.county = values.billing_postcode;
    CheckoutTemplate.billing_address.country = values.billing_country;

    CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
    CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
    CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
    CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
    CheckoutTemplate.shipping_address.city = values.shipping_state;
    CheckoutTemplate.shipping_address.county = values.shipping_postcode;
    CheckoutTemplate.shipping_address.country = values.shipping_country;

    this.props.dispatch(dispatch => {
      dispatch({ type: SUBMIT_PAYMENT });
    });

    api
      .Checkout(CheckoutTemplate)

      .then(order => {
        api.OrderPay(order.data.id, PaymentTemplate);
        api.DeleteCart();
      })

      .then(() => {
        this.props.dispatch(dispatch => {
          dispatch({ type: PAYMENT_COMPLETE });
          dispatch(push('/order-confirmation'));
        });
      })

      .catch(e => {
        console.log(e);
      })

      .catch(e => {
        console.log(e);
      })

      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <main role="main" id="container" className="main-container push">
        <section className="checkout">
          <div className="content">
            <CheckoutSummary />
            <form
              className="checkout-form"
              noValidate
              onSubmit={this.props.handleSubmit(this.mySubmit)}
              onKeyDown={e => {
                this.handleKeyDown(e);
              }}>
              <fieldset className="details">
                <div className="form-header">
                  <h2>Your details</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap name required">
                      <span className="hide-content">Name</span>
                      <Field
                        component="input"
                        className="name"
                        required="required"
                        placeholder="Name"
                        name="name"
                        type="text"
                        aria-label="Name"
                      />
                    </label>
                    <label className="input-wrap email required">
                      <span className="hide-content">Email address</span>
                      <Field
                        component="input"
                        className="email"
                        required="required"
                        placeholder="Email address"
                        name="email"
                        type="email"
                        aria-label="Email"
                      />
                    </label>
                  </div>
                  <button type="button" className="continue">
                    Continue
                  </button>
                </div>
              </fieldset>
              <fieldset className="billing collapsed">
                <div className="form-header inactive">
                  <h2>Billing address</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap firstname required">
                      <span className="hide-content">First name</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="First Name"
                        name="billing_firstname"
                        type="text"
                        aria-label="First name"
                      />
                    </label>
                    <label className="input-wrap lastname required">
                      <span className="hide-content">Last name</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Last Name"
                        name="billing_lastname"
                        type="text"
                        aria-label="Last name"
                      />
                    </label>
                    <label className="input-wrap company">
                      <span className="hide-content">Company</span>
                      <Field
                        component="input"
                        placeholder="Company"
                        name="billing-company"
                        type="text"
                        aria-label="Company"
                      />
                    </label>
                    <label className="input-wrap address-1 required">
                      <span className="hide-content">Address line 1</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Address Line 1"
                        name="billing_address_1"
                        type="text"
                        aria-label="Address line 1"
                      />
                    </label>
                    <label className="input-wrap address-2">
                      <span className="hide-content">Address line 2</span>
                      <Field
                        component="input"
                        placeholder="Address Line 2"
                        name="billing_address_2"
                        type="text"
                        aria-label="Address line 2"
                      />
                    </label>
                    <label className="input-wrap state required">
                      <span className="hide-content">State or county</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="State / County"
                        name="billing_state"
                        type="text"
                        aria-label="State / County"
                      />
                    </label>
                    <label className="input-wrap postcode required">
                      <span className="hide-content">Postcode</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Postcode"
                        name="billing_postcode"
                        type="text"
                        aria-label="Postcode"
                      />
                    </label>
                    <div className="input-wrap country">
                      <label className="required select-fallback">
                        <span className="hide-content">Country</span>
                        <Field
                          component="select"
                          id="billing_country"
                          required="required"
                          name="billing_country">
                          <option value="">Country</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Åland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">
                            Bolivia, Plurinational State of
                          </option>
                          <option value="BQ">
                            Bonaire, Sint Eustatius and Saba
                          </option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">
                            Congo, the Democratic Republic of the
                          </option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Côte d'Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">Curaçao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="VA">
                            Holy See (Vatican City State)
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">
                            Lao People's Democratic Republic
                          </option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">
                            Macedonia, the former Yugoslav Republic of
                          </option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">
                            Micronesia, Federated States of
                          </option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Réunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">
                            Saint Helena, Ascension and Tristan da Cunha
                          </option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SX">Sint Maarten (Dutch part)</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">
                            Tanzania, United Republic of
                          </option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">
                            United States Minor Outlying Islands
                          </option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">
                            Venezuela, Bolivarian Republic of
                          </option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.S.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </Field>
                      </label>
                    </div>
                  </div>
                  <button type="button" className="continue">
                    Continue
                  </button>
                </div>
              </fieldset>
              <fieldset className="shipping collapsed">
                <div className="form-header inactive">
                  <h2>Shipping address</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap firstname required">
                      <span className="hide-content">First name</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="First Name"
                        name="shipping_firstname"
                        type="text"
                        aria-label="First name"
                      />
                    </label>
                    <label className="input-wrap lastname required">
                      <span className="hide-content">Last name</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Last Name"
                        name="shipping_lastname"
                        type="text"
                        aria-label="Last name"
                      />
                    </label>
                    <label className="input-wrap company">
                      <span className="hide-content">Company</span>
                      <Field
                        component="input"
                        placeholder="Company"
                        name="shipping_company"
                        type="text"
                        aria-label="Company"
                      />
                    </label>
                    <label className="input-wrap address-1 required">
                      <span className="hide-content">Address line 1</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Address Line 1"
                        name="shipping_address_1"
                        type="text"
                        aria-label="Address line 1"
                      />
                    </label>
                    <label className="input-wrap address-2">
                      <span className="hide-content">Address line 2</span>
                      <Field
                        component="input"
                        placeholder="Address Line 2"
                        name="shipping_address_2"
                        type="text"
                        aria-label="Address line 2"
                      />
                    </label>
                    <label className="input-wrap state required">
                      <span className="hide-content">State or county</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="State / County"
                        name="shipping_state"
                        type="text"
                        aria-label="State / County"
                      />
                    </label>
                    <label className="input-wrap postcode required">
                      <span className="hide-content">Postcode</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Postcode"
                        name="shipping_postcode"
                        type="text"
                        aria-label="Postcode"
                      />
                    </label>
                    <div className="input-wrap country">
                      <label className="select-fallback required">
                        <span className="hide-content">Country</span>
                        <Field
                          component="select"
                          id="shipping_country"
                          required="required"
                          name="shipping_country">
                          <option value="">Country</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AX">Åland Islands</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">
                            Bolivia, Plurinational State of
                          </option>
                          <option value="BQ">
                            Bonaire, Sint Eustatius and Saba
                          </option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">
                            British Indian Ocean Territory
                          </option>
                          <option value="BN">Brunei Darussalam</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo</option>
                          <option value="CD">
                            Congo, the Democratic Republic of the
                          </option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="CI">Côte d'Ivoire</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">Curaçao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">
                            French Southern Territories
                          </option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GU">Guam</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">
                            Heard Island and McDonald Islands
                          </option>
                          <option value="VA">
                            Holy See (Vatican City State)
                          </option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran, Islamic Republic of</option>
                          <option value="IQ">Iraq</option>
                          <option value="IE">Ireland</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KP">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="KR">Korea, Republic of</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">
                            Lao People's Democratic Republic
                          </option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao</option>
                          <option value="MK">
                            Macedonia, the former Yugoslav Republic of
                          </option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">
                            Micronesia, Federated States of
                          </option>
                          <option value="MD">Moldova, Republic of</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="MP">Northern Mariana Islands</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PW">Palau</option>
                          <option value="PS">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="PR">Puerto Rico</option>
                          <option value="QA">Qatar</option>
                          <option value="RE">Réunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russian Federation</option>
                          <option value="RW">Rwanda</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">
                            Saint Helena, Ascension and Tristan da Cunha
                          </option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="WS">Samoa</option>
                          <option value="SM">San Marino</option>
                          <option value="ST">Sao Tome and Principe</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SX">Sint Maarten (Dutch part)</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syrian Arab Republic</option>
                          <option value="TW">Taiwan, Province of China</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">
                            Tanzania, United Republic of
                          </option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="UM">
                            United States Minor Outlying Islands
                          </option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VE">
                            Venezuela, Bolivarian Republic of
                          </option>
                          <option value="VN">Viet Nam</option>
                          <option value="VG">Virgin Islands, British</option>
                          <option value="VI">Virgin Islands, U.S.</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </Field>
                      </label>
                    </div>
                  </div>
                  <button type="button" className="continue">
                    Continue
                  </button>
                </div>
              </fieldset>
              <fieldset className="payment collapsed">
                <div className="form-header inactive">
                  <h2>Payment details</h2>
                </div>
                <div className="form-content">
                  <div className="form-fields">
                    <label className="input-wrap name">
                      <span className="hide-content">Name on card</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Name on card"
                        name="card_name"
                        type="text"
                        aria-label="Name on card"
                      />
                    </label>
                    <label className="input-wrap card required">
                      <span className="hide-content">Card number</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="Card number"
                        name="card-number"
                        maxLength="23"
                        type="tel"
                        aria-label="Card number"
                      />
                    </label>
                    <div className="input-wrap expiry-month">
                      <label className="select-fallback required">
                        <span className="hide-content">Card expiry month</span>
                        <select
                          id="expiry-month"
                          required="required"
                          name="expiry-month">
                          <option value="01">January</option>
                          <option value="02">February</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </label>
                    </div>
                    <div className="input-wrap expiry-year">
                      <label className="select-fallback required">
                        <span className="hide-content">Card expiry year</span>
                        <select
                          id="expiry-year"
                          required="required"
                          name="expiry-year">
                          <option value="2017">2017</option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                          <option value="2025">2025</option>
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                        </select>
                      </label>
                    </div>
                    <label className="input-wrap cvc required">
                      <span className="hide-content">CVC code</span>
                      <Field
                        component="input"
                        required="required"
                        placeholder="CVC"
                        maxLength="4"
                        name="card_cvc"
                        type="tel"
                        aria-label="CVC"
                      />
                    </label>
                  </div>
                  <button type="submit" className="pay" aria-live="polite">
                    <div className="loading-icon">
                      <span className="hide-content">Processing</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 54">
              <path id="path0" d="M131.200 71.867 C 130.988 72.079,130.892 98.691,131.101 99.236 C 131.256 99.640,154.744 99.640,154.899 99.236 C 155.031 98.893,155.031 92.274,154.899 91.930 C 154.809 91.696,154.007 91.667,147.566 91.667 L 140.333 91.667 140.333 90.250 L 140.333 88.833 146.566 88.833 C 152.095 88.833,152.809 88.804,152.899 88.570 C 153.140 87.941,153.006 82.417,152.741 82.037 L 152.481 81.667 146.407 81.667 L 140.333 81.667 140.333 80.583 L 140.333 79.500 147.504 79.500 L 154.675 79.500 154.847 79.048 C 155.133 78.295,154.976 72.025,154.667 71.830 C 154.270 71.579,131.451 71.615,131.200 71.867 M158.667 72.000 C 158.206 72.460,158.135 98.477,158.593 99.130 C 158.875 99.532,167.394 99.720,168.000 99.337 C 168.209 99.205,168.258 98.497,168.300 95.006 L 168.350 90.833 172.173 90.833 C 175.817 90.833,176.007 90.818,176.205 90.500 C 176.367 90.241,176.594 90.167,177.222 90.167 C 177.891 90.167,178.046 90.109,178.118 89.833 C 178.172 89.628,178.346 89.500,178.571 89.500 C 178.773 89.500,179.098 89.350,179.295 89.167 C 179.492 88.983,179.806 88.833,179.993 88.833 C 180.222 88.833,180.333 88.724,180.333 88.500 C 180.333 88.317,180.441 88.167,180.572 88.167 C 180.703 88.167,180.863 88.004,180.926 87.804 C 180.989 87.605,181.182 87.291,181.354 87.106 C 181.526 86.922,181.667 86.662,181.667 86.529 C 181.667 86.396,181.787 86.199,181.934 86.092 C 182.087 85.979,182.240 85.546,182.293 85.073 C 182.346 84.603,182.499 84.166,182.651 84.055 C 183.067 83.750,183.044 78.900,182.625 78.593 C 182.428 78.449,182.333 78.155,182.333 77.688 C 182.333 77.203,182.234 76.912,182.000 76.711 C 181.817 76.554,181.667 76.255,181.667 76.046 C 181.667 75.778,181.569 75.667,181.333 75.667 C 181.029 75.667,180.882 75.229,180.982 74.621 C 180.993 74.550,180.771 74.446,180.488 74.389 C 180.205 74.333,179.886 74.147,179.780 73.977 C 179.674 73.806,179.463 73.667,179.313 73.667 C 179.162 73.667,179.000 73.517,178.952 73.333 C 178.885 73.079,178.724 73.000,178.277 73.000 C 177.836 73.000,177.663 72.917,177.583 72.667 C 177.494 72.386,177.321 72.330,176.489 72.313 C 175.204 72.285,175.164 72.279,175.179 72.090 C 175.223 71.524,159.229 71.437,158.667 72.000 M186.434 71.930 C 186.116 72.760,186.335 91.668,186.667 92.000 C 186.873 92.206,187.000 92.556,187.000 92.917 C 187.000 93.389,187.063 93.500,187.333 93.500 C 187.605 93.500,187.667 93.611,187.667 94.099 C 187.667 94.558,187.745 94.718,188.000 94.785 C 188.183 94.833,188.333 94.981,188.333 95.115 C 188.333 95.248,188.427 95.458,188.542 95.581 C 188.656 95.704,188.927 96.036,189.144 96.319 C 189.360 96.602,189.637 96.833,189.758 96.833 C 189.879 96.833,190.025 96.983,190.083 97.167 C 190.150 97.378,190.336 97.500,190.589 97.500 C 190.818 97.500,191.064 97.642,191.167 97.833 C 191.283 98.050,191.516 98.167,191.833 98.167 C 192.151 98.167,192.384 98.283,192.500 98.500 C 192.630 98.744,192.849 98.833,193.313 98.833 C 193.737 98.833,194.049 98.944,194.250 99.167 C 194.776 99.748,205.746 99.650,205.678 99.065 C 205.669 98.983,205.962 98.894,206.330 98.865 C 206.865 98.825,207.000 98.749,207.000 98.490 C 207.000 98.224,207.118 98.167,207.667 98.167 C 208.222 98.167,208.333 98.111,208.333 97.833 C 208.333 97.556,208.444 97.500,209.000 97.500 C 209.556 97.500,209.667 97.444,209.667 97.167 C 209.667 96.944,209.778 96.833,210.000 96.833 C 210.215 96.833,210.333 96.722,210.333 96.519 C 210.333 96.346,210.482 96.167,210.667 96.118 C 210.850 96.070,211.000 95.912,211.000 95.766 C 211.000 95.611,211.139 95.500,211.333 95.500 C 211.592 95.500,211.667 95.389,211.667 95.001 C 211.667 94.683,211.787 94.427,212.000 94.295 C 212.183 94.180,212.333 93.951,212.333 93.786 C 212.333 93.621,212.483 93.325,212.667 93.128 C 212.957 92.817,213.141 91.666,213.016 90.946 C 213.002 90.870,213.069 90.856,213.163 90.914 C 213.612 91.192,213.674 89.892,213.629 81.055 C 213.590 73.210,213.550 71.966,213.333 71.830 C 212.900 71.556,204.457 71.623,204.074 71.903 C 203.762 72.131,203.747 72.473,203.667 80.981 C 203.590 89.089,203.559 89.851,203.292 90.163 C 203.131 90.351,203.000 90.615,203.000 90.752 C 203.000 90.888,202.893 91.000,202.761 91.000 C 202.630 91.000,202.475 91.150,202.417 91.333 C 202.358 91.517,202.175 91.667,202.008 91.667 C 201.842 91.667,201.669 91.807,201.624 91.978 C 201.493 92.478,198.410 92.505,198.253 92.008 C 198.171 91.751,198.002 91.667,197.572 91.667 C 197.111 91.667,197.000 91.602,197.000 91.333 C 197.000 91.150,196.850 90.850,196.667 90.667 C 196.483 90.483,196.333 90.146,196.333 89.917 C 196.333 89.688,196.183 89.350,196.000 89.167 C 195.676 88.842,195.667 88.611,195.667 80.450 C 195.667 74.152,195.617 72.017,195.467 71.867 C 195.126 71.526,186.566 71.587,186.434 71.930 M218.417 71.794 C 218.325 71.862,218.226 72.029,218.196 72.167 C 218.166 72.304,218.071 72.442,217.986 72.473 C 217.890 72.507,217.832 77.689,217.835 85.772 C 217.839 93.856,217.901 98.978,217.996 98.919 C 218.080 98.867,218.231 98.976,218.331 99.162 C 218.606 99.676,226.553 99.691,226.827 99.178 C 226.936 98.974,227.000 96.855,227.000 93.443 C 227.000 88.113,227.005 88.033,227.333 88.118 C 227.517 88.166,227.667 88.316,227.667 88.452 C 227.667 88.587,227.817 88.737,228.000 88.785 C 228.184 88.833,228.333 89.012,228.333 89.186 C 228.333 89.389,228.451 89.500,228.667 89.500 C 228.859 89.500,229.000 89.611,229.000 89.762 C 229.000 89.906,229.094 90.124,229.208 90.248 C 229.323 90.371,229.583 90.690,229.787 90.957 C 229.991 91.223,230.347 91.646,230.579 91.896 C 230.811 92.146,231.000 92.459,231.000 92.592 C 231.000 92.725,231.141 92.833,231.314 92.833 C 231.488 92.833,231.667 92.982,231.715 93.167 C 231.763 93.350,231.922 93.500,232.068 93.500 C 232.222 93.500,232.333 93.639,232.333 93.833 C 232.333 94.056,232.444 94.167,232.667 94.167 C 232.889 94.167,233.000 94.278,233.000 94.500 C 233.000 94.683,233.079 94.833,233.177 94.833 C 233.274 94.833,233.299 94.920,233.234 95.026 C 233.162 95.142,233.188 95.173,233.299 95.104 C 233.401 95.041,233.572 95.160,233.681 95.370 C 233.790 95.579,233.980 95.862,234.103 96.000 C 234.889 96.878,235.167 97.232,235.167 97.358 C 235.167 97.436,235.279 97.500,235.417 97.500 C 235.554 97.500,235.667 97.620,235.667 97.766 C 235.667 97.912,235.817 98.070,236.000 98.118 C 236.184 98.167,236.333 98.346,236.333 98.519 C 236.333 98.719,236.451 98.833,236.655 98.833 C 236.833 98.833,237.025 98.983,237.083 99.167 C 237.193 99.512,244.606 99.702,245.100 99.372 C 245.649 99.006,245.667 98.572,245.667 85.503 L 245.667 72.485 245.258 72.076 L 244.848 71.667 240.883 71.669 C 238.678 71.671,236.806 71.742,236.667 71.830 C 236.454 71.964,236.409 72.817,236.369 77.494 C 236.323 82.717,236.305 83.000,236.013 83.000 C 235.844 83.000,235.666 82.850,235.618 82.667 C 235.570 82.483,235.412 82.333,235.266 82.333 C 235.111 82.333,235.000 82.194,235.000 82.000 C 235.000 81.778,234.889 81.667,234.667 81.667 C 234.475 81.667,234.333 81.556,234.333 81.405 C 234.333 81.261,234.240 81.038,234.125 80.911 C 233.690 80.425,233.500 80.178,233.500 80.096 C 233.500 80.049,233.252 79.763,232.949 79.460 C 232.646 79.157,232.348 78.780,232.288 78.621 C 232.227 78.463,232.062 78.333,231.922 78.333 C 231.782 78.333,231.667 78.214,231.667 78.068 C 231.667 77.922,231.517 77.763,231.333 77.715 C 231.149 77.667,231.000 77.488,231.000 77.314 C 231.000 77.029,230.817 76.920,230.446 76.984 C 230.370 76.998,230.353 76.937,230.406 76.850 C 230.460 76.763,230.278 76.444,230.002 76.142 C 229.726 75.840,229.500 75.494,229.500 75.374 C 229.500 75.254,229.390 75.114,229.256 75.063 C 229.122 75.011,228.967 74.826,228.912 74.651 C 228.856 74.476,228.703 74.333,228.572 74.333 C 228.441 74.333,228.333 74.183,228.333 74.000 C 228.333 73.778,228.222 73.667,228.000 73.667 C 227.806 73.667,227.667 73.556,227.667 73.401 C 227.667 73.255,227.521 73.097,227.343 73.051 C 227.165 73.004,226.996 72.805,226.968 72.608 C 226.940 72.411,226.823 72.250,226.708 72.250 C 226.594 72.250,226.506 72.183,226.514 72.102 C 226.522 72.021,226.428 71.890,226.306 71.813 C 226.034 71.640,218.650 71.623,218.417 71.794 M249.200 71.867 C 248.989 72.078,248.900 78.711,249.101 79.236 C 249.190 79.469,249.827 79.501,254.476 79.511 C 257.796 79.517,259.611 79.577,259.375 79.672 C 259.169 79.755,259.000 79.900,259.000 79.995 C 259.000 80.089,258.850 80.317,258.667 80.500 C 258.483 80.683,258.333 81.021,258.333 81.250 C 258.333 81.556,258.244 81.667,258.000 81.667 C 257.778 81.667,257.667 81.778,257.667 82.000 C 257.667 82.222,257.556 82.333,257.333 82.333 C 257.109 82.333,257.000 82.444,257.000 82.674 C 257.000 82.861,256.850 83.175,256.667 83.372 C 256.483 83.569,256.333 83.865,256.333 84.031 C 256.333 84.197,256.218 84.333,256.078 84.333 C 255.938 84.333,255.775 84.465,255.716 84.625 C 255.657 84.785,255.512 84.975,255.394 85.046 C 255.276 85.117,255.131 85.436,255.071 85.755 C 254.993 86.173,254.875 86.333,254.648 86.333 C 254.444 86.333,254.333 86.451,254.333 86.667 C 254.333 86.854,254.222 87.000,254.079 87.000 C 253.929 87.000,253.783 87.209,253.722 87.513 C 253.666 87.796,253.480 88.114,253.310 88.220 C 253.139 88.326,253.000 88.537,253.000 88.687 C 253.000 88.838,252.850 89.000,252.667 89.048 C 252.483 89.096,252.333 89.255,252.333 89.401 C 252.333 89.547,252.183 89.817,252.000 90.000 C 251.817 90.183,251.667 90.483,251.667 90.667 C 251.667 90.855,251.556 91.000,251.411 91.000 C 251.271 91.000,251.108 91.126,251.049 91.279 C 250.990 91.432,250.805 91.695,250.638 91.862 C 250.470 92.030,250.333 92.354,250.333 92.583 C 250.333 92.889,250.244 93.000,250.000 93.000 C 249.778 93.000,249.667 93.111,249.667 93.333 C 249.667 93.517,249.560 93.667,249.430 93.667 C 249.299 93.667,249.108 93.923,249.005 94.235 C 248.902 94.548,248.708 94.846,248.575 94.897 C 248.442 94.948,248.333 95.137,248.333 95.317 C 248.333 95.497,248.194 95.688,248.024 95.742 C 247.582 95.883,247.524 98.024,247.939 98.894 L 248.228 99.500 261.168 99.500 L 274.109 99.500 274.513 99.070 C 274.910 98.647,274.917 98.589,274.917 95.583 C 274.917 92.578,274.910 92.520,274.513 92.097 L 274.109 91.667 268.554 91.667 C 265.499
         91.667,263.000 91.626,263.000 91.576 C 263.000 91.527,263.150 91.325,263.333 91.128 C 263.517 90.931,263.667 90.635,263.667 90.469 C 263.667 90.303,263.782 90.167,263.922 90.167 C 264.062 90.167,264.225 90.035,264.284 89.875 C 264.343 89.715,264.488 89.525,264.606 89.454 C 264.724 89.383,264.869 89.064,264.929 88.745 C 265.007 88.327,265.125 88.167,265.352 88.167 C 265.556 88.167,265.667 88.049,265.667 87.833 C 265.667 87.646,265.778 87.500,265.921 87.500 C 266.071 87.500,266.217 87.291,266.278 86.987 C 266.334 86.704,266.520 86.386,266.690 86.280 C 266.861 86.174,267.000 85.963,267.000 85.813 C 267.000 85.662,267.150 85.500,267.333 85.452 C 267.517 85.404,267.667 85.245,267.667 85.099 C 267.667 84.953,267.817 84.683,268.000 84.500 C 268.183 84.317,268.333 84.017,268.333 83.833 C 268.333 83.645,268.444 83.500,268.589 83.500 C 268.729 83.500,268.892 83.374,268.951 83.221 C 269.010 83.068,269.195 82.805,269.362 82.638 C 269.530 82.470,269.667 82.146,269.667 81.917 C 269.667 81.611,269.756 81.500,270.000 81.500 C 270.222 81.500,270.333 81.389,270.333 81.167 C 270.333 80.983,270.440 80.833,270.570 80.833 C 270.701 80.833,270.892 80.577,270.995 80.265 C 271.098 79.952,271.292 79.654,271.425 79.603 C 271.558 79.552,271.667 79.367,271.667 79.191 C 271.667 79.012,271.813 78.834,272.000 78.785 C 272.183 78.737,272.333 78.586,272.333 78.450 C 272.333 78.314,272.442 78.161,272.574 78.110 C 272.707 78.059,272.865 77.751,272.926 77.425 C 272.991 77.077,273.135 76.833,273.274 76.833 C 273.404 76.833,273.559 76.708,273.617 76.554 C 273.676 76.401,273.862 76.138,274.029 75.971 C 274.379 75.621,274.479 72.584,274.161 71.989 C 273.947 71.590,249.596 71.471,249.200 71.867 M171.128 79.167 C 171.272 79.397,171.517 79.500,171.918 79.500 C 172.330 79.500,172.500 79.575,172.500 79.755 C 172.500 79.896,172.612 80.054,172.750 80.106 C 172.941 80.180,173.000 80.494,173.000 81.448 L 173.000 82.693 172.341 82.952 C 171.978 83.095,171.697 83.295,171.716 83.397 C 171.739 83.522,171.186 83.599,170.042 83.631 L 168.333 83.678 168.333 81.256 L 168.333 78.833 169.627 78.833 C 170.739 78.833,170.949 78.880,171.128 79.167 " stroke="none" fill="#3c1484" fill-rule="evenodd"></path><path id="path1" d="M131.041 54.625 L 131.083 68.250 143.000 68.250 L 154.917 68.250 154.962 64.625 L 155.007 61.000 147.670 61.000 L 140.333 61.000 140.333 59.335 L 140.333 57.671 146.625 57.627 L 152.917 57.583 152.917 54.000 L 152.917 50.417 146.625 50.373 L 140.333 50.329 140.333 49.331 L 140.333 48.333 147.344 48.333 C 151.858 48.333,154.470 48.272,154.678 48.161 C 154.981 47.999,155.000 47.778,155.000 44.494 L 155.000 41.000 142.999 41.000 L 130.998 41.000 131.041 54.625 M158.333 54.580 L 158.333 68.160 158.708 68.252 C 158.915 68.302,161.146 68.323,163.667 68.297 L 168.250 68.250 168.294 63.958 L 168.339 59.667 172.406 59.667 C 176.594 59.667,177.000 59.628,177.000 59.232 C 177.000 59.072,177.208 59.000,177.667 59.000 C 178.100 59.000,178.444 58.889,178.650 58.683 C 178.824 58.509,179.124 58.316,179.317 58.255 C 179.509 58.194,179.667 58.046,179.667 57.925 C 179.667 57.804,179.817 57.666,180.000 57.618 C 180.183 57.570,180.333 57.420,180.333 57.285 C 180.333 57.150,180.483 57.000,180.667 56.952 C 180.866 56.900,181.000 56.724,181.000 56.516 C 181.000 56.324,181.104 56.167,181.232 56.167 C 181.485 56.167,181.667 55.817,181.667 55.331 C 181.667 55.161,181.817 54.975,182.000 54.917 C 182.279 54.828,182.333 54.664,182.333 53.917 C 182.333 53.169,182.388 53.005,182.667 52.917 C 182.981 52.817,183.000 52.664,183.000 50.306 C 183.000 47.942,182.981 47.797,182.667 47.715 C 182.381 47.640,182.333 47.488,182.333 46.647 C 182.333 45.889,182.258 45.591,182.000 45.333 C 181.817 45.150,181.667 44.850,181.667 44.667 C 181.667 44.448,181.556 44.333,181.343 44.333 C 181.090 44.333,181.009 44.198,180.968 43.708 C 180.927 43.206,180.843 43.073,180.542 43.030 C 180.335 43.001,180.167 42.878,180.167 42.756 C 180.167 42.512,179.809 42.333,179.320 42.333 C 179.111 42.333,179.000 42.217,179.000 42.000 C 179.000 41.724,178.889 41.667,178.353 41.667 C 177.846 41.667,177.687 41.594,177.618 41.333 C 177.532 41.005,177.391 41.000,167.932 41.000 L 158.333 41.000 158.333 54.580 M186.333 50.932 C 186.333 60.724,186.338 60.866,186.667 60.952 C 186.949 61.025,187.000 61.179,187.000 61.952 C 187.000 62.724,187.051 62.878,187.333 62.952 C 187.518 63.000,187.667 63.179,187.667 63.353 C 187.667 63.525,187.804 63.804,187.971 63.971 C 188.138 64.138,188.324 64.401,188.383 64.554 C 188.441 64.708,188.604 64.833,188.745 64.833 C 188.888 64.833,189.000 64.978,189.000 65.163 C 189.000 65.377,189.148 65.531,189.417 65.598 C 189.646 65.656,189.833 65.804,189.833 65.927 C 189.833 66.052,190.093 66.200,190.417 66.261 C 190.737 66.321,191.000 66.467,191.000 66.584 C 191.000 66.836,191.367 67.000,191.930 67.000 C 192.164 67.000,192.333 67.098,192.333 67.232 C 192.333 67.504,192.689 67.667,193.287 67.667 C 193.521 67.667,193.809 67.798,193.926 67.958 C 194.120 68.224,194.622 68.254,199.528 68.299 C 205.158 68.350,205.667 68.318,205.667 67.913 C 205.667 67.737,205.856 67.667,206.333 67.667 C 206.778 67.667,207.111 67.556,207.333 67.333 C 207.517 67.150,207.817 67.000,208.000 67.000 C 208.183 67.000,208.483 66.850,208.667 66.667 C 208.850 66.483,209.120 66.333,209.266 66.333 C 209.412 66.333,209.570 66.183,209.618 66.000 C 209.667 65.816,209.846 65.667,210.019 65.667 C 210.216 65.667,210.333 65.549,210.333 65.353 C 210.333 65.179,210.482 65.000,210.667 64.952 C 210.850 64.904,211.000 64.754,211.000 64.618 C 211.000 64.483,211.150 64.333,211.333 64.285 C 211.517 64.237,211.667 64.083,211.667 63.944 C 211.667 63.804,211.817 63.642,212.000 63.583 C 212.245 63.506,212.333 63.331,212.333 62.925 C 212.333 62.512,212.418 62.350,212.667 62.285 C 212.950 62.211,213.000 62.058,213.000 61.266 C 213.000 60.556,213.079 60.254,213.333 60.000 C 213.659 59.675,213.667 59.444,213.667 50.333 L 213.667 41.000 208.667 41.000 L 203.667 41.000 203.667 49.583 C 203.667 57.944,203.658 58.175,203.333 58.500 C 203.150 58.683,203.000 59.021,203.000 59.250 C 203.000 59.556,202.911 59.667,202.667 59.667 C 202.444 59.667,202.333 59.778,202.333 60.000 C 202.333 60.222,202.222 60.333,202.000 60.333 C 201.817 60.333,201.517 60.483,201.333 60.667 C 201.056 60.944,200.778 61.000,199.667 61.000 C 198.444 61.000,198.333 60.972,198.333 60.667 C 198.333 60.444,198.222 60.333,198.000 60.333 C 197.611 60.333,197.081 59.850,196.922 59.350 C 196.861 59.157,196.703 59.000,196.572 59.000 C 196.409 59.000,196.333 58.810,196.333 58.401 C 196.333 57.942,196.255 57.782,196.000 57.715 C 195.672 57.629,195.667 57.488,195.667 49.314 L 195.667 41.000 191.000 41.000 L 186.333 41.000 186.333 50.932 M217.778 41.111 C 217.599 41.290,217.650 67.716,217.830 68.000 C 217.964 68.212,218.665 68.250,222.452 68.250 L 226.917 68.250 226.961 62.558 C 227.004 56.971,227.010 56.867,227.336 56.952 C 227.518 57.000,227.667 57.169,227.667 57.328 C 227.667 57.488,227.854 57.820,228.083 58.068 C 228.313 58.315,228.500 58.588,228.500 58.675 C 228.500 58.762,228.612 58.833,228.750 58.833 C 228.887 58.833,229.000 58.978,229.000 59.155 C 229.000 59.333,229.142 59.523,229.315 59.578 C 229.489 59.633,229.669 59.825,229.716 60.006 C 229.764 60.186,229.922 60.333,230.068 60.333 C 230.214 60.333,230.333 60.453,230.333 60.599 C 230.333 60.745,230.483 60.904,230.667 60.952 C 230.850 61.000,231.000 61.150,231.000 61.285 C 231.000 61.420,231.150 61.570,231.333 61.618 C 231.517 61.666,231.667 61.819,231.667 61.958 C 231.667 62.097,231.806 62.332,231.976 62.480 C 232.146 62.629,232.339 62.919,232.404 63.125 C 232.469 63.331,232.630 63.500,232.761 63.500 C 232.893 63.500,233.000 63.645,233.000 63.822 C 233.000 63.999,233.142 64.189,233.315 64.244 C 233.489 64.299,233.669 64.492,233.716 64.672 C 233.764 64.852,233.913 65.000,234.048 65.000 C 234.184 65.000,234.334 65.150,234.382 65.333 C 234.430 65.517,234.580 65.667,234.715 65.667 C 234.850 65.667,235.000 65.817,235.048 66.000 C 235.096 66.183,235.255 66.333,235.401 66.333 C 235.552 66.333,235.667 66.472,235.667 66.655 C 235.667 66.833,235.808 67.022,235.980 67.077 C 236.153 67.132,236.336 67.390,236.388 67.650 C 236.450 67.958,236.617 68.159,236.867 68.226 C 237.364 68.359,245.057 68.365,245.403 68.232 C 245.640 68.141,245.667 66.782,245.667 54.566 L 245.667 41.000 241.000 41.000 L 236.333 41.000 236.333 46.333 C 236.333 51.556,236.326 51.667,236.000 51.667 C 235.778 51.667,235.667 51.556,235.667 51.333 C 235.667 51.111,235.556 51.000,235.333 51.000 C 235.111 51.000,235.000 50.889,235.000 50.667 C 235.000 50.444,234.889 50.333,234.667 50.333 C 234.444 50.333,234.333 50.222,234.333 50.000 C 234.333 49.817,234.183 49.517,234.000 49.333 C 233.817 49.150,233.667 48.929,233.667 48.843 C 233.667 48.756,233.530 48.588,233.364 48.468 C 233.198 48.348,233.012 48.119,232.953 47.958 C 232.893 47.798,232.729 47.667,232.589 47.667 C 232.444 47.667,232.333 47.522,232.333 47.333 C 232.333 47.111,232.222 47.000,232.000 47.000 C 231.778 47.000,231.667 46.889,231.667 46.667 C 231.667 46.444,231.556 46.333,231.333 46.333 C 231.111 46.333,231.000 46.222,231.000 46.000 C 231.000 45.778,230.889 45.667,230.667 45.667 C 230.472 45.667,230.333 45.556,230.333 45.399 C 230.333 45.161,229.967 44.609,229.285 43.821 C 229.160 43.676,229.010 43.432,228.951 43.279 C 228.892 43.126,228.729 43.000,228.589 43.000 C 228.444 43.000,228.333 42.855,228.333 42.667 C 228.333 42.444,228.222 42.333,228.000 42.333 C 227.778 42.333,227.667 42.222,227.667 42.000 C 227.667 41.778,227.556 41.667,227.333 41.667 C 227.111 41.667,227.000 41.556,227.000 41.333 C 227.000 40.997,218.107 40.782,217.778 41.111 M249.038 44.625 L 249.083 48.250 254.042 48.294 C 258.757 48.336,259.000 48.354,259.000 48.650 C 259.000 48.821,258.850 49.000,258.667 49.048 C 258.483 49.096,258.333 49.255,258.333 49.401 C 258.333 49.547,258.183 49.817,258.000 50.000 C 257.817 50.183,257.667 50.483,257.667 50.667 C 257.667 50.889,257.556 51.000,257.333 51.000 C 257.126 51.000,257.000 51.111,257.000 51.293 C 257.000 51.455,
         256.850 51.680,256.667 51.795 C 256.454 51.927,256.333 52.183,256.333 52.501 C 256.333 52.889,256.259 53.000,256.000 53.000 C 255.785 53.000,255.667 53.111,255.667 53.314 C 255.667 53.488,255.518 53.667,255.333 53.715 C 255.078 53.782,255.000 53.942,255.000 54.401 C 255.000 54.889,254.938 55.000,254.667 55.000 C 254.444 55.000,254.333 55.111,254.333 55.333 C 254.333 55.556,254.222 55.667,254.000 55.667 C 253.776 55.667,253.667 55.778,253.667 56.005 C 253.667 56.191,253.556 56.386,253.421 56.438 C 253.286 56.490,253.128 56.787,253.069 57.099 C 252.993 57.507,252.874 57.667,252.648 57.667 C 252.444 57.667,252.333 57.784,252.333 58.000 C 252.333 58.183,252.229 58.333,252.101 58.333 C 251.832 58.333,251.667 58.688,251.667 59.264 C 251.667 59.556,251.575 59.667,251.333 59.667 C 251.118 59.667,251.000 59.778,251.000 59.981 C 251.000 60.154,250.851 60.333,250.667 60.382 C 250.483 60.430,250.333 60.588,250.333 60.734 C 250.333 60.880,250.183 61.150,250.000 61.333 C 249.817 61.517,249.667 61.817,249.667 62.000 C 249.667 62.222,249.556 62.333,249.333 62.333 C 249.148 62.333,249.000 62.444,249.000 62.583 C 249.000 62.721,248.850 62.983,248.667 63.167 C 248.483 63.350,248.333 63.679,248.333 63.897 C 248.333 64.154,248.216 64.325,248.000 64.382 C 247.499 64.513,247.489 67.893,247.989 68.161 C 248.421 68.392,273.969 68.400,274.576 68.170 L 275.007 68.006 274.962 64.545 L 274.917 61.083 268.891 61.040 C 263.005 60.997,262.868 60.988,262.951 60.670 C 262.998 60.491,263.178 60.299,263.351 60.244 C 263.525 60.189,263.667 60.011,263.667 59.848 C 263.667 59.685,263.817 59.416,264.000 59.250 C 264.183 59.084,264.333 58.819,264.333 58.660 C 264.333 58.502,264.483 58.333,264.667 58.285 C 264.866 58.233,265.000 58.058,265.000 57.849 C 265.000 57.657,265.104 57.500,265.232 57.500 C 265.487 57.500,265.667 57.150,265.667 56.653 C 265.667 56.477,265.781 56.333,265.921 56.333 C 266.061 56.333,266.242 56.156,266.325 55.939 C 266.407 55.723,266.593 55.500,266.737 55.445 C 266.897 55.384,267.000 55.145,267.000 54.839 C 267.000 54.444,267.073 54.333,267.333 54.333 C 267.549 54.333,267.667 54.222,267.667 54.019 C 267.667 53.846,267.816 53.667,268.000 53.618 C 268.183 53.570,268.333 53.412,268.333 53.266 C 268.333 53.120,268.483 52.850,268.667 52.667 C 268.850 52.483,269.000 52.192,269.000 52.019 C 269.000 51.846,269.149 51.667,269.333 51.618 C 269.525 51.568,269.667 51.391,269.667 51.202 C 269.667 51.012,269.808 50.835,270.000 50.785 C 270.239 50.722,270.333 50.558,270.333 50.202 C 270.333 49.846,270.428 49.681,270.667 49.618 C 270.850 49.570,271.000 49.417,271.000 49.277 C 271.000 49.137,271.150 48.975,271.333 48.917 C 271.564 48.843,271.667 48.664,271.667 48.333 C 271.667 48.002,271.769 47.823,272.000 47.750 C 272.183 47.692,272.333 47.508,272.333 47.342 C 272.333 47.175,272.483 47.000,272.667 46.952 C 272.866 46.900,273.000 46.724,273.000 46.516 C 273.000 46.324,273.104 46.167,273.232 46.167 C 273.483 46.167,273.667 45.818,273.667 45.339 C 273.667 45.174,273.817 45.000,274.000 44.952 C 274.309 44.871,274.333 44.724,274.333 42.932 L 274.333 41.000 261.663 41.000 L 248.993 41.000 249.038 44.625 M172.333 48.599 C 172.333 48.745,172.483 48.904,172.667 48.952 C 173.515 49.173,172.943 51.333,171.933 51.721 C 171.787 51.777,171.667 51.938,171.667 52.078 C 171.667 52.290,171.386 52.333,170.000 52.333 L 168.333 52.333 168.333 50.333 L 168.333 48.333 170.333 48.333 C 172.052 48.333,172.333 48.371,172.333 48.599 " stroke="none" fill="#fc4c04" fill-rule="evenodd"></path><path id="path2" d="M19.667 0.167 C 19.667 0.258,19.517 0.333,19.333 0.333 C 19.150 0.333,18.850 0.483,18.667 0.667 C 18.483 0.850,18.285 1.000,18.226 1.000 C 18.075 1.000,17.004 2.057,17.002 2.208 C 17.001 2.277,16.850 2.483,16.667 2.667 C 16.483 2.850,16.333 3.141,16.333 3.313 C 16.333 3.485,16.223 3.718,16.088 3.830 C 15.953 3.942,15.792 4.307,15.731 4.642 C 15.669 4.976,15.518 5.398,15.393 5.579 C 15.079 6.035,15.088 8.554,15.407 9.141 C 15.539 9.384,15.693 9.869,15.749 10.217 C 15.806 10.566,15.960 10.892,16.093 10.943 C 16.225 10.994,16.333 11.215,16.333 11.434 C 16.333 11.654,16.470 11.970,16.638 12.138 C 16.805 12.305,16.990 12.568,17.049 12.721 C 17.108 12.874,17.271 13.000,17.411 13.000 C 17.552 13.000,17.667 13.123,17.667 13.272 C 17.667 13.577,18.469 14.333,18.792 14.333 C 18.906 14.333,19.150 14.483,19.333 14.667 C 19.592 14.925,19.889 15.000,20.658 15.000 C 21.485 15.000,21.724 15.069,22.099 15.417 C 22.447 15.739,22.485 15.833,22.269 15.833 C 22.115 15.833,21.946 15.946,21.894 16.083 C 21.841 16.221,21.666 16.333,21.505 16.333 C 21.343 16.333,21.033 16.473,20.814 16.644 C 20.596 16.814,20.248 17.007,20.042 17.072 C 19.835 17.136,19.667 17.288,19.667 17.409 C 19.667 17.530,19.404 17.679,19.083 17.739 C 18.734 17.805,18.500 17.946,18.500 18.091 C 18.500 18.224,18.364 18.333,18.198 18.333 C 18.032 18.333,17.735 18.483,17.538 18.667 C 17.342 18.850,17.066 19.000,16.925 19.000 C 16.784 19.000,16.576 19.150,16.461 19.333 C 16.347 19.517,16.121 19.667,15.960 19.667 C 15.799 19.667,15.517 19.817,15.333 20.000 C 15.150 20.183,14.880 20.333,14.734 20.333 C 14.588 20.333,14.430 20.483,14.382 20.667 C 14.320 20.902,14.154 21.000,13.815 21.000 C 13.517 21.000,13.258 21.126,13.128 21.333 C 13.013 21.517,12.804 21.667,12.663 21.667 C 12.522 21.667,12.299 21.817,12.167 22.000 C 12.035 22.183,11.748 22.333,11.531 22.333 C 11.276 22.333,11.105 22.451,11.048 22.667 C 10.987 22.902,10.821 23.000,10.482 23.000 C 10.183 23.000,9.924 23.126,9.795 23.333 C 9.680 23.517,9.471 23.667,9.330 23.667 C 9.189 23.667,8.965 23.817,8.833 24.000 C 8.701 24.183,8.480 24.333,8.342 24.333 C 7.988 24.333,7.000 25.492,7.000 25.907 C 7.000 26.097,6.850 26.347,6.667 26.461 C 6.459 26.591,6.333 26.850,6.333 27.149 C 6.333 27.488,6.236 27.653,6.000 27.715 C 5.747 27.781,5.667 27.942,5.667 28.382 C 5.667 28.821,5.586 28.982,5.333 29.048 C 5.150 29.096,5.000 29.255,5.000 29.401 C 5.000 29.547,4.850 29.817,4.667 30.000 C 4.483 30.183,4.333 30.467,4.333 30.630 C 4.333 30.793,4.183 31.054,4.000 31.211 C 3.817 31.368,3.667 31.598,3.667 31.723 C 3.667 31.847,3.517 32.084,3.333 32.250 C 3.150 32.416,3.000 32.693,3.000 32.866 C 3.000 33.039,2.850 33.342,2.667 33.538 C 2.483 33.735,2.333 34.001,2.333 34.130 C 2.333 34.259,2.183 34.555,2.000 34.788 C 1.817 35.021,1.667 35.355,1.667 35.529 C 1.667 35.704,1.517 36.008,1.333 36.205 C 1.150 36.402,1.000 36.661,1.000 36.781 C 1.000 36.902,0.850 37.150,0.667 37.333 C 0.444 37.556,0.333 37.889,0.333 38.333 C 0.333 38.700,0.258 39.000,0.167 39.000 C 0.070 39.000,0.000 39.525,0.000 40.242 L 0.000 41.485 0.572 41.592 C 0.886 41.651,1.182 41.800,1.230 41.924 C 1.277 42.047,1.582 42.198,1.908 42.259 C 2.234 42.320,2.500 42.466,2.500 42.583 C 2.500 42.700,2.766 42.846,3.092 42.907 C 3.418 42.968,3.726 43.127,3.777 43.259 C 3.827 43.392,3.955 43.500,4.059 43.500 C 4.164 43.499,4.569 43.668,4.960 43.875 L 5.670 44.250 6.291 43.917 C 6.633 43.733,6.939 43.445,6.972 43.277 C 7.004 43.108,7.173 42.827,7.348 42.652 C 7.523 42.477,7.667 42.155,7.667 41.936 C 7.667 41.679,7.784 41.508,8.000 41.452 C 8.235 41.390,8.333 41.224,8.333 40.889 C 8.333 40.594,8.460 40.334,8.667 40.205 C 8.850 40.091,9.000 39.882,9.000 39.742 C 9.000 39.601,9.150 39.325,9.333 39.128 C 9.517 38.931,9.667 38.672,9.667 38.552 C 9.667 38.432,9.817 38.183,10.000 38.000 C 10.183 37.817,10.333 37.533,10.333 37.370 C 10.333 37.207,10.483 36.946,10.667 36.789 C 10.850 36.632,11.000 36.333,11.000 36.125 C 11.000 35.917,11.150 35.653,11.333 35.539 C 11.535 35.412,11.667 35.150,11.667 34.872 C 11.667 34.594,11.798 34.332,12.000 34.205 C 12.208 34.076,12.333 33.817,12.333 33.518 C 12.333 33.179,12.431 33.013,12.667 32.952 C 12.872 32.898,13.000 32.724,13.000 32.500 C 13.000 32.300,13.150 31.945,13.333 31.712 C 13.517 31.479,13.667 31.198,13.667 31.088 C 13.667 30.728,14.968 29.710,15.574 29.596 C 15.931 29.529,16.167 29.388,16.167 29.242 C 16.167 29.084,16.340 29.000,16.668 29.000 C 16.964 29.000,17.287 28.863,17.455 28.667 C 17.612 28.483,17.826 28.333,17.931 28.333 C 18.036 28.333,18.323 28.175,18.569 27.982 C 19.144 27.529,19.573 27.846,19.732 28.841 C 19.800 29.266,19.925 29.500,20.085 29.500 C 20.222 29.500,20.333 29.638,20.333 29.808 C 20.333 29.977,20.483 30.251,20.667 30.417 C 20.850 30.583,21.000 30.901,21.000 31.125 C 21.000 31.384,21.115 31.561,21.318 31.614 C 21.520 31.667,21.674 31.904,21.742 32.265 C 21.805 32.602,21.947 32.833,22.091 32.833 C 22.226 32.833,22.333 32.988,22.333 33.182 C 22.333 33.391,22.467 33.566,22.667 33.618 C 22.851 33.667,23.000 33.846,23.000 34.019 C 23.000 34.222,23.118 34.333,23.333 34.333 C 23.551 34.333,23.667 34.444,23.667 34.653 C 23.667 34.828,23.835 35.171,24.042 35.414 C 24.880 36.404,25.934 37.440,26.208 37.545 C 26.369 37.606,26.500 37.771,26.500 37.911 C 26.500 38.052,26.581 38.167,26.680 38.167 C 26.779 38.167,27.156 38.466,27.517 38.831 C 27.879 39.197,28.361 39.542,28.588 39.599 C 28.814 39.656,29.000 39.807,29.000 39.935 C 29.000 40.062,29.069 40.167,29.153 40.167 C 29.237 40.167,29.618 40.467,30.000 40.833 C 30.382 41.200,30.733 41.500,30.781 41.500 C 30.829 41.500,31.091 41.688,31.364 41.917 C 31.636 42.146,31.958 42.333,32.078 42.333 C 32.199 42.333,32.339 42.442,32.390 42.574 C 32.441 42.707,32.749 42.865,33.075 42.926 C 33.493 43.005,33.667 43.125,33.667 43.338 C 33.667 43.818,33.850 44.167,34.101 44.167 C 34.265 44.167,34.333 44.385,34.333 44.903 C 34.333 45.780,34.460 46.167,34.747 46.167 C 34.879 46.167,34.988 46.488,35.040 47.028 C 35.087 47.510,35.231 47.969,35.369 48.070 C 35.504 48.169,35.656 48.620,35.707 49.073 C 35.760 49.546,35.913 49.979,36.066 50.092 C 36.223 50.206,36.333 50.528,36.333 50.871 C 36.333 51.203,36.477 51.638,36.667 51.879 C 36.859 52.124,37.000 52.555,37.000 52.900 C 37.000 53.317,37.101 53.560,37.333 53.705 C 37.553 53.843,37.667 54.094,37.667 54.443 C 37.667 55.139,37.815 55.500,38.101 55.500 C 38.238 55.500,38.333 55.672,38.333 55.917 C 38.333 56.202,38.639 56.639,39.304 57.304 C 39.838 57.838,40.324 58.401,40.383 58.554 C 40.441 
         58.708,40.604 58.833,40.745 58.833 C 40.886 58.833,41.000 58.977,41.000 59.155 C 41.000 59.333,41.142 59.523,41.315 59.578 C 41.489 59.633,41.669 59.825,41.716 60.006 C 41.764 60.186,41.922 60.333,42.068 60.333 C 42.214 60.333,42.333 60.453,42.333 60.599 C 42.333 60.745,42.483 60.904,42.667 60.952 C 42.850 61.000,43.000 61.153,43.000 61.292 C 43.000 61.431,43.139 61.666,43.309 61.814 C 43.480 61.962,43.672 62.252,43.737 62.458 C 43.803 62.665,43.963 62.833,44.095 62.833 C 44.226 62.833,44.333 62.967,44.333 63.131 C 44.333 63.295,44.632 63.764,44.996 64.173 C 45.361 64.582,45.703 65.048,45.757 65.208 C 45.812 65.369,45.963 65.500,46.095 65.500 C 46.226 65.500,46.333 65.649,46.333 65.832 C 46.333 66.014,46.483 66.258,46.667 66.372 C 46.850 66.487,47.000 66.664,47.000 66.766 C 47.000 66.868,47.188 67.154,47.417 67.401 C 47.646 67.648,47.833 67.922,47.833 68.009 C 47.833 68.096,47.946 68.167,48.083 68.167 C 48.221 68.167,48.333 68.286,48.333 68.432 C 48.333 68.578,48.483 68.737,48.667 68.785 C 48.850 68.833,49.000 69.008,49.000 69.175 C 49.000 69.341,49.150 69.525,49.333 69.583 C 49.517 69.642,49.667 69.793,49.667 69.920 C 49.667 70.497,52.000 70.341,52.228 69.748 C 52.280 69.612,52.433 69.500,52.567 69.500 C 52.701 69.500,52.858 69.350,52.917 69.167 C 52.975 68.983,53.132 68.833,53.266 68.833 C 53.401 68.833,53.553 68.724,53.604 68.590 C 53.655 68.456,53.841 68.301,54.015 68.245 C 54.190 68.190,54.333 68.042,54.333 67.917 C 54.333 67.792,54.483 67.642,54.667 67.583 C 54.850 67.525,55.000 67.378,55.000 67.257 C 55.000 67.135,55.169 66.992,55.375 66.938 C 56.909 66.538,58.153 64.133,57.299 63.220 C 56.578 62.449,56.384 62.205,56.284 61.946 C 56.225 61.792,56.062 61.667,55.922 61.667 C 55.782 61.667,55.667 61.547,55.667 61.401 C 55.667 61.255,55.517 61.096,55.333 61.048 C 55.149 61.000,55.000 60.821,55.000 60.647 C 55.000 60.444,54.882 60.333,54.667 60.333 C 54.444 60.333,54.333 60.222,54.333 60.000 C 54.333 59.817,54.033 59.367,53.667 59.000 C 53.300 58.633,53.000 58.263,53.000 58.176 C 53.000 58.090,52.864 57.921,52.697 57.801 C 52.531 57.681,52.346 57.452,52.286 57.292 C 52.226 57.131,52.062 57.000,51.922 57.000 C 51.778 57.000,51.667 56.855,51.667 56.667 C 51.667 56.444,51.556 56.333,51.333 56.333 C 51.111 56.333,51.000 56.222,51.000 56.000 C 51.000 55.784,50.889 55.667,50.685 55.667 C 50.457 55.667,50.340 55.505,50.261 55.083 C 50.201 54.762,50.078 54.500,49.989 54.500 C 49.899 54.500,49.741 54.313,49.636 54.083 C 49.532 53.854,49.355 53.667,49.243 53.667 C 49.131 53.667,49.000 53.517,48.952 53.333 C 48.904 53.150,48.745 53.000,48.599 53.000 C 48.444 53.000,48.333 52.861,48.333 52.667 C 48.333 52.444,48.222 52.333,48.000 52.333 C 47.817 52.333,47.667 52.224,47.667 52.091 C 47.667 51.958,47.479 51.661,47.250 51.432 C 47.021 51.203,46.833 50.907,46.833 50.775 C 46.833 50.644,46.721 50.492,46.583 50.440 C 46.425 50.379,46.333 50.123,46.333 49.740 C 46.333 49.276,46.256 49.115,46.000 49.048 C 45.724 48.976,45.667 48.821,45.667 48.149 C 45.667 47.517,45.593 47.290,45.333 47.128 C 45.105 46.985,45.000 46.739,45.000 46.346 C 45.000 46.019,44.866 45.623,44.688 45.427 C 44.189 44.876,44.040 42.229,44.500 42.083 C 44.683 42.025,44.833 41.923,44.833 41.856 C 44.833 41.789,45.096 41.639,45.417 41.523 C 45.737 41.407,46.000 41.248,46.000 41.169 C 46.000 41.091,46.225 40.977,46.500 40.917 C 46.775 40.856,47.000 40.700,47.000 40.570 C 47.000 40.429,47.168 40.333,47.417 40.333 C 47.646 40.333,47.976 40.191,48.150 40.017 C 48.324 39.843,48.692 39.651,48.969 39.590 C 49.246 39.529,49.511 39.379,49.558 39.256 C 49.605 39.132,49.879 38.980,50.167 38.917 C 50.454 38.854,50.730 38.696,50.779 38.568 C 50.898 38.258,51.833 38.256,51.833 38.565 C 51.833 38.696,52.079 38.842,52.401 38.903 C 52.713 38.961,53.009 39.115,53.058 39.245 C 53.108 39.375,53.416 39.532,53.741 39.593 C 54.067 39.654,54.333 39.801,54.333 39.919 C 54.333 40.037,54.540 40.220,54.792 40.324 C 55.671 40.689,56.500 41.170,56.500 41.316 C 56.500 41.397,56.755 41.511,57.067 41.569 C 57.379 41.628,57.675 41.782,57.725 41.912 C 57.775 42.042,58.082 42.198,58.408 42.259 C 58.734 42.320,59.000 42.463,59.000 42.576 C 59.000 42.688,59.300 42.870,59.667 42.980 C 60.033 43.090,60.333 43.252,60.333 43.340 C 60.333 43.428,60.443 43.500,60.577 43.500 C 60.711 43.500,60.972 43.662,61.157 43.861 C 61.956 44.719,64.333 44.231,64.333 43.209 C 64.333 43.094,64.483 42.850,64.667 42.667 C 64.850 42.483,65.000 42.186,65.000 42.006 C 65.000 41.826,65.150 41.598,65.333 41.500 C 65.517 41.402,65.667 41.155,65.667 40.951 C 65.667 40.747,65.817 40.487,66.000 40.372 C 66.183 40.258,66.333 40.014,66.333 39.832 C 66.333 39.649,66.445 39.500,66.581 39.500 C 66.741 39.500,66.867 39.267,66.934 38.848 C 67.005 38.404,67.138 38.169,67.352 38.113 C 68.041 37.933,67.708 35.667,66.992 35.667 C 66.842 35.667,66.583 35.517,66.417 35.333 C 66.251 35.150,66.014 35.000,65.891 35.000 C 65.768 35.000,65.517 34.850,65.333 34.667 C 65.150 34.483,64.867 34.333,64.704 34.333 C 64.541 34.333,64.279 34.183,64.122 34.000 C 63.965 33.817,63.666 33.667,63.458 33.667 C 63.250 33.667,62.987 33.517,62.872 33.333 C 62.758 33.150,62.526 33.000,62.358 33.000 C 62.189 33.000,61.916 32.850,61.750 32.667 C 61.584 32.483,61.347 32.333,61.224 32.333 C 61.101 32.333,60.850 32.183,60.667 32.000 C 60.483 31.817,60.183 31.667,60.000 31.667 C 59.817 31.667,59.517 31.517,59.333 31.333 C 59.150 31.150,58.850 31.000,58.667 31.000 C 58.483 31.000,58.183 30.850,58.000 30.667 C 57.817 30.483,57.535 30.333,57.373 30.333 C 57.212 30.333,56.987 30.183,56.872 30.000 C 56.746 29.798,56.483 29.667,56.205 29.667 C 55.927 29.667,55.665 29.535,55.539 29.333 C 55.409 29.126,55.150 29.000,54.851 29.000 C 54.512 29.000,54.347 28.902,54.285 28.667 C 54.151 28.153,48.985 28.153,48.545 28.667 C 48.388 28.850,48.126 29.000,47.963 29.000 C 47.800 29.000,47.527 29.140,47.356 29.311 C 47.185 29.481,46.773 29.672,46.439 29.735 C 46.100 29.798,45.833 29.947,45.833 30.072 C 45.833 30.197,45.571 30.346,45.241 30.407 C 44.916 30.468,44.608 30.627,44.557 30.759 C 44.506 30.892,44.285 31.000,44.066 31.000 C 43.846 31.000,43.517 31.150,43.333 31.333 C 42.946 31.721,42.409 31.771,42.279 31.431 C 42.195 31.212,41.904 31.019,40.833 30.469 C 40.604 30.351,40.319 30.123,40.199 29.961 C 40.079 29.799,39.769 29.667,39.510 29.667 C 39.179 29.667,39.013 29.567,38.952 29.333 C 38.904 29.150,38.745 29.000,38.599 29.000 C 38.453 29.000,38.333 28.885,38.333 28.745 C 38.333 28.604,38.217 28.445,38.075 28.390 C 37.933 28.336,37.525 28.020,37.168 27.687 C 36.811 27.355,36.140 26.756,35.676 26.356 C 35.213 25.955,34.833 25.524,34.833 25.397 C 34.833 25.270,34.721 25.167,34.583 25.167 C 34.441 25.167,34.333 25.017,34.333 24.818 C 34.333 24.609,34.199 24.434,34.000 24.382 C 33.817 24.334,33.667 24.171,33.667 24.021 C 33.667 23.870,33.517 23.653,33.333 23.539 C 33.130 23.412,33.000 23.150,33.000 22.869 C 33.000 22.598,32.862 22.307,32.667 22.167 C 32.112 21.767,32.279 21.667,33.499 21.667 C 34.483 21.667,34.696 21.615,34.872 21.333 C 35.044 21.058,35.261 21.000,36.125 21.000 C 36.964 21.000,37.226 20.934,37.455 20.667 C 37.680 20.405,37.947 20.333,38.704 20.333 C 39.444 20.333,39.744 20.256,40.000 20.000 C 40.183 19.817,40.540 19.666,40.792 19.665 C 41.203 19.663,42.333 18.766,42.333 18.441 C 42.333 18.382,42.483 18.183,42.667 18.000 C 42.850 17.817,43.000 17.479,43.000 17.250 C 43.000 16.991,43.094 16.833,43.250 16.833 C 43.387 16.833,43.500 16.750,43.500 16.649 C 43.500 16.548,43.688 16.242,43.917 15.970 C 44.146 15.697,44.333 15.359,44.333 15.219 C 44.333 15.078,44.633 14.605,45.000 14.167 C 45.367 13.729,45.667 13.305,45.667 13.225 C 45.667 13.145,45.817 12.987,46.000 12.872 C 46.183 12.758,46.333 12.564,46.333 12.441 C 46.333 12.319,46.483 12.083,46.667 11.917 C 46.850 11.751,47.000 11.485,47.000 11.327 C 47.000 11.169,47.150 11.000,47.333 10.952 C 47.517 10.904,47.667 10.745,47.667 10.599 C 47.667 10.453,47.817 10.183,48.000 10.000 C 48.183 9.817,48.333 9.525,48.333 9.353 C 48.333 9.179,48.482 9.000,48.667 8.952 C 48.866 8.900,49.000 8.724,49.000 8.516 C 49.000 8.324,49.104 8.167,49.231 8.167 C 49.735 8.167,49.869 5.898,49.375 5.714 C 49.215 5.654,48.985 5.469,48.866 5.303 C 48.746 5.136,48.551 5.000,48.433 5.000 C 48.315 5.000,48.083 4.850,47.917 4.667 C 47.751 4.483,47.495 4.333,47.348 4.333 C 47.201 4.333,46.987 4.183,46.872 4.000 C 46.758 3.817,46.589 3.667,46.499 3.667 C 46.408 3.667,46.183 3.517,46.000 3.333 C 45.817 3.150,45.535 3.000,45.373 3.000 C 45.212 3.000,44.987 2.850,44.872 2.667 C 44.577 2.194,43.175 2.182,43.052 2.651 C 43.007 2.826,42.826 3.007,42.651 3.052 C 42.476 3.098,42.333 3.255,42.333 3.401 C 42.333 3.547,42.183 3.817,42.000 4.000 C 41.817 4.183,41.667 4.475,41.667 4.647 C 41.667 4.821,41.518 5.000,41.333 5.048 C 41.134 5.100,41.000 5.276,41.000 5.484 C 41.000 5.679,40.893 5.833,40.758 5.833 C 40.612 5.833,40.471 6.067,40.406 6.417 C 40.342 6.758,40.198 7.000,40.060 7.000 C 39.929 7.000,39.774 7.131,39.714 7.292 C 39.654 7.452,39.469 7.681,39.303 7.801 C 39.128 7.927,39.000 8.227,39.000 8.509 C 39.000 8.839,38.916 9.000,38.745 9.000 C 38.604 9.000,38.441 9.131,38.381 9.292 C 38.321 9.452,38.136 9.681,37.969 9.801 C 37.795 9.927,37.667 10.227,37.667 10.509 C 37.667 10.839,37.583 11.000,37.411 11.000 C 37.271 11.000,37.107 11.131,37.047 11.292 C 36.988 11.452,36.802 11.681,36.636 11.801 C 36.461 11.927,36.333 12.227,36.333 12.509 L 36.333 13.000 35.248 13.000 C 34.370 13.000,34.109 13.063,33.878 13.333 C 33.654 13.595,33.386 13.667,32.630 13.667 C 31.889 13.667,31.590 13.744,31.333 14.000 C 31.076 14.257,30.778 14.333,30.026 14.333 C 29.263 14.333,28.986 14.406,28.750 14.667 C 28.582 14.852,28.257 14.991,28.016 14.981 C 27.733 14.968,27.685 14.935,27.875 14.885 C 28.035 14.843,28.167 14.702,28.167 14.571 C 28.167 14.440,28.324 14.333,28.516 14.333 C 28.724 14.333,28.900 14.199,28.952 14.000 C 29.000 13.817,29.150 13.667,29.285 13.667 C 29.420 13.667,29.570 13.517,29.618 13.333 C 29.666 13.150,29.812 13.000,29.941 13.000 C 30.071 13.000,30.226
          12.869,30.286 12.708 C 30.346 12.548,30.531 12.319,30.697 12.199 C 30.864 12.079,31.000 11.778,31.000 11.531 C 31.000 11.261,31.134 10.997,31.333 10.872 C 31.832 10.561,31.849 4.353,31.353 3.881 C 31.180 3.718,30.987 3.340,30.923 3.042 C 30.858 2.739,30.702 2.500,30.570 2.500 C 30.440 2.500,30.333 2.407,30.333 2.294 C 30.333 1.873,28.486 0.333,27.981 0.333 C 27.716 0.333,27.500 0.258,27.500 0.167 C 27.500 0.060,26.083 0.000,23.583 0.000 C 21.083 0.000,19.667 0.060,19.667 0.167 M72.444 23.778 C 72.383 23.839,72.333 24.130,72.333 24.425 C 72.333 24.821,72.246 24.984,72.000 25.048 C 71.691 25.129,71.667 25.276,71.667 27.048 C 71.667 28.821,71.642 28.968,71.333 29.048 C 71.050 29.122,71.000 29.276,71.000 30.068 C 71.000 30.778,70.921 31.079,70.667 31.333 C 70.432 31.568,70.333 31.889,70.333 32.417 C 70.333 32.944,70.265 33.167,70.103 33.167 C 69.844 33.167,69.672 33.664,69.669 34.421 C 69.668 34.717,69.529 35.044,69.333 35.211 C 69.096 35.414,69.000 35.703,69.000 36.211 C 69.000 36.720,68.904 37.008,68.667 37.211 C 68.436 37.409,68.333 37.703,68.333 38.165 C 68.333 38.611,68.222 38.944,68.000 39.167 C 67.767 39.400,67.667 39.722,67.667 40.242 C 67.667 40.755,67.583 41.030,67.394 41.136 C 67.217 41.235,67.093 41.594,67.038 42.168 C 66.985 42.712,66.835 43.165,66.643 43.357 C 66.444 43.556,66.333 43.906,66.333 44.333 C 66.333 44.778,66.222 45.111,66.000 45.333 C 65.779 45.554,65.667 45.889,65.667 46.325 C 65.667 46.756,65.574 47.035,65.399 47.133 C 65.236 47.224,65.096 47.596,65.041 48.083 C 64.990 48.538,64.818 49.015,64.642 49.191 C 64.444 49.389,64.333 49.740,64.333 50.167 C 64.333 50.611,64.222 50.944,64.000 51.167 C 63.778 51.389,63.667 51.722,63.667 52.167 C 63.667 52.611,63.556 52.944,63.333 53.167 C 63.100 53.400,63.000 53.722,63.000 54.242 C 63.000 54.749,62.916 55.031,62.732 55.133 C 62.566 55.226,62.433 55.592,62.380 56.100 C 62.334 56.549,62.181 57.008,62.041 57.119 C 61.895 57.235,61.749 57.699,61.701 58.203 C 61.654 58.693,61.509 59.162,61.375 59.260 C 61.242 59.357,61.091 59.807,61.040 60.260 C 60.990 60.713,60.837 61.164,60.702 61.264 C 60.561 61.367,60.420 61.830,60.371 62.347 C 60.323 62.860,60.152 63.422,59.977 63.647 C 59.806 63.866,59.667 64.117,59.667 64.205 C 59.667 64.292,59.517 64.555,59.333 64.788 C 59.150 65.021,59.000 65.464,59.000 65.772 C 59.000 66.111,58.868 66.465,58.667 66.667 C 58.483 66.850,58.333 67.146,58.333 67.325 C 58.333 67.504,58.218 67.714,58.078 67.793 C 57.361 68.194,57.595 69.892,58.421 70.286 C 58.739 70.437,59.000 70.625,59.000 70.702 C 59.000 70.779,59.188 70.913,59.417 71.000 C 59.646 71.087,59.833 71.235,59.833 71.329 C 59.833 71.684,61.523 71.530,61.618 71.167 C 61.666 70.983,61.816 70.833,61.952 70.833 C 62.087 70.833,62.235 70.690,62.281 70.515 C 62.327 70.341,62.507 70.160,62.682 70.114 C 62.857 70.069,63.000 69.912,63.000 69.766 C 63.000 69.620,63.081 69.500,63.179 69.500 C 63.413 69.500,64.333 68.579,64.333 68.346 C 64.333 68.247,64.453 68.167,64.599 68.167 C 64.745 68.167,64.904 68.017,64.952 67.833 C 65.000 67.650,65.138 67.500,65.258 67.500 C 65.379 67.500,65.525 67.350,65.583 67.167 C 65.642 66.983,65.789 66.833,65.910 66.833 C 66.172 66.833,66.333 66.470,66.333 65.881 L 66.333 65.455 66.667 65.879 C 66.850 66.112,67.000 66.417,67.000 66.557 C 67.000 66.697,67.150 66.858,67.333 66.917 C 67.517 66.975,67.667 67.125,67.667 67.250 C 67.667 67.375,67.835 67.531,68.041 67.596 C 68.247 67.662,68.500 67.831,68.604 67.973 C 68.979 68.487,72.167 68.366,72.167 67.838 C 72.167 67.764,72.354 67.656,72.583 67.598 C 72.813 67.541,73.000 67.401,73.000 67.287 C 73.000 67.173,73.150 66.987,73.333 66.872 C 73.642 66.679,73.667 66.483,73.667 64.233 C 73.667 61.942,73.647 61.797,73.333 61.715 C 73.150 61.667,73.000 61.522,73.000 61.393 C 73.000 61.264,72.823 61.091,72.606 61.009 C 72.389 60.926,72.165 60.736,72.107 60.586 C 72.017 60.351,71.745 60.320,70.168 60.365 L 68.333 60.417 68.333 59.714 C 68.333 59.183,68.414 58.968,68.667 58.833 C 68.928 58.694,69.000 58.484,69.000 57.868 C 69.000 57.261,69.076 57.032,69.333 56.872 C 69.591 56.711,69.667 56.483,69.667 55.872 C 69.667 55.261,69.743 55.033,70.000 54.872 C 70.243 54.720,70.333 54.483,70.333 53.999 C 70.333 53.556,70.445 53.222,70.667 53.000 C 70.901 52.765,71.000 52.444,71.000 51.917 C 71.000 51.389,71.099 51.068,71.333 50.833 C 71.567 50.600,71.667 50.278,71.667 49.758 C 71.667 49.245,71.751 48.970,71.939 48.864 C 72.119 48.763,72.239 48.408,72.293 47.814 C 72.338 47.321,72.474 46.802,72.596 46.662 C 72.718 46.522,72.869 46.072,72.931 45.662 C 72.993 45.252,73.160 44.783,73.302 44.620 C 73.475 44.422,73.585 43.861,73.634 42.926 C 73.696 41.734,73.753 41.516,74.020 41.446 C 74.275 41.380,74.333 41.206,74.333 40.521 C 74.333 39.849,74.401 39.642,74.667 39.500 C 74.933 39.357,75.000 39.151,75.000 38.468 C 75.000 37.626,75.004 37.619,75.333 37.917 C 75.517 38.083,75.667 38.356,75.667 38.525 C 75.667 38.997,76.782 40.129,77.375 40.259 C 77.662 40.322,78.001 40.477,78.127 40.604 C 78.455 40.931,80.146 40.915,80.273 40.583 C 80.326 40.446,80.572 40.333,80.819 40.333 C 81.308 40.333,82.333 39.587,82.333 39.232 C 82.333 39.111,82.483 38.931,82.667 38.833 C 82.971 38.670,83.000 38.484,83.000 36.662 C 83.000 34.850,82.970 34.651,82.667 34.461 C 82.483 34.347,82.333 34.156,82.333 34.038 C 82.333 33.920,82.202 33.774,82.042 33.714 C 81.881 33.654,81.652 33.469,81.532 33.303 C 81.412 33.136,81.178 33.000,81.011 33.000 C 80.844 33.000,80.616 32.889,80.504 32.754 C 80.082 32.246,78.630 32.227,78.134 32.723 C 78.011 32.846,77.706 32.986,77.455 33.033 L 77.000 33.120 77.000 30.169 C 77.000 27.430,76.976 27.197,76.667 26.917 C 76.389 26.665,76.333 26.403,76.333 25.341 C 76.333 24.572,76.254 23.987,76.133 23.867 C 75.920 23.653,72.648 23.574,72.444 23.778 M93.448 39.467 L 93.000 39.935 93.000 43.051 C 93.000 45.944,92.976 46.190,92.667 46.500 C 92.373 46.793,92.333 47.056,92.333 48.682 C 92.333 50.278,92.288 50.589,92.000 50.955 C 91.727 51.302,91.667 51.631,91.667 52.772 C 91.667 53.944,91.614 54.220,91.333 54.500 C 91.067 54.767,91.000 55.056,91.000 55.945 C 91.000 56.755,90.924 57.142,90.719 57.368 C 90.542 57.563,90.409 58.064,90.362 58.713 C 90.315 59.366,90.196 59.814,90.039 59.929 C 89.893 60.035,89.756 60.487,89.708 61.014 C 89.663 61.510,89.512 62.047,89.372 62.207 C 89.232 62.366,89.080 62.891,89.034 63.373 C 88.987 63.865,88.842 64.328,88.706 64.428 C 88.535 64.553,88.435 65.066,88.374 66.137 C 88.297 67.486,88.251 67.667,87.977 67.667 C 87.727 67.667,87.667 67.794,87.667 68.325 C 87.667 68.761,87.575 69.035,87.394 69.136 C 87.219 69.234,87.093 69.589,87.041 70.130 C 86.979 70.773,86.886 70.991,86.647 71.053 C 86.425 71.111,86.333 71.287,86.333 71.651 C 86.333 71.944,86.190 72.310,86.000 72.500 C 85.817 72.683,85.667 73.021,85.667 73.250 C 85.667 73.479,85.517 73.817,85.333 74.000 C 85.150 74.183,85.000 74.486,85.000 74.672 C 85.000 74.858,84.892 75.052,84.760 75.102 C 84.628 75.153,84.471 75.421,84.410 75.698 C 84.349 75.974,84.157 76.343,83.983 76.517 C 83.809 76.691,83.667 77.021,83.667 77.250 C 83.667 77.495,83.571 77.667,83.434 77.667 C 83.169 77.667,83.000 78.021,83.000 78.578 C 83.000 78.821,82.878 78.993,82.667 79.048 C 82.411 79.115,82.333 79.276,82.333 79.734 C 82.333 80.222,82.271 80.333,82.000 80.333 C 81.761 80.333,81.667 80.444,81.667 80.724 C 81.667 80.939,81.517 81.251,81.333 81.417 C 81.150 81.583,81.000 81.819,81.000 81.942 C 81.000 82.066,80.850 82.317,80.667 82.500 C 80.483 82.683,80.333 83.012,80.333 83.231 C 80.333 83.488,80.216 83.659,80.000 83.715 C 79.775 83.774,79.667 83.942,79.667 84.233 C 79.667 84.483,79.527 84.751,79.333 84.872 C 79.150 84.987,79.000 85.212,79.000 85.373 C 79.000 85.535,78.896 85.667,78.768 85.667 C 78.499 85.667,78.333 86.022,78.333 86.597 C 78.333 86.855,78.238 87.000,78.068 87.000 C 77.922 87.000,77.764 87.145,77.718 87.322 C 77.672 87.499,77.533 87.682,77.409 87.730 C 77.286 87.777,77.135 88.082,77.074 88.408 C 76.993 88.838,76.877 89.000,76.648 89.000 C 76.475 89.000,76.333 89.112,76.333 89.250 C 76.333 89.388,76.218 89.631,76.077 89.792 C 75.390 90.574,75.000 91.156,75.000 91.399 C 75.000 91.546,74.900 91.667,74.777 91.667 C 74.654 91.667,74.468 91.854,74.364 92.083 C 74.259 92.313,74.101 92.500,74.011 92.500 C 73.922 92.500,73.799 92.763,73.739 93.083 C 73.660 93.505,73.543 93.667,73.315 93.667 C 73.111 93.667,73.000 93.784,73.000 94.000 C 73.000 94.194,72.889 94.333,72.734 94.333 C 72.588 94.333,72.430 94.483,72.382 94.667 C 72.334 94.850,72.224 95.000,72.139 95.000 C 72.053 95.000,71.872 95.266,71.736 95.591 C 71.601 95.915,71.379 96.223,71.245 96.275 C 71.110 96.327,71.000 96.511,71.000 96.684 C 71.000 96.889,70.883 97.000,70.667 97.000 C 70.444 97.000,70.333 97.111,70.333 97.333 C 70.333 97.556,70.222 97.667,70.000 97.667 C 69.778 97.667,69.667 97.778,69.667 98.000 C 69.667 98.222,69.556 98.333,69.333 98.333 C 69.111 98.333,69.000 98.444,69.000 98.667 C 69.000 98.861,68.889 99.000,68.734 99.000 C 68.588 99.000,68.431 99.143,68.386 99.318 C 68.340 99.493,68.159 99.673,67.985 99.719 C 67.810 99.765,67.667 99.913,67.667 100.048 C 67.667 100.184,67.517 100.334,67.333 100.382 C 67.150 100.430,67.000 100.580,67.000 100.715 C 67.000 100.850,66.850 101.000,66.667 101.048 C 66.483 101.096,66.333 101.255,66.333 101.401 C 66.333 101.547,66.226 101.667,66.095 101.667 C 65.963 101.667,65.808 101.817,65.750 102.000 C 65.692 102.183,65.542 102.333,65.417 102.333 C 65.292 102.333,65.144 102.475,65.089 102.649 C 65.034 102.822,64.841 103.003,64.661 103.050 C 64.481 103.097,64.333 103.246,64.333 103.382 C 64.333 103.517,64.183 103.667,64.000 103.715 C 63.817 103.763,63.667 103.922,63.667 104.068 C 63.667 104.222,63.527 104.333,63.333 104.333 C 63.111 104.333,63.000 104.444,63.000 104.667 C 63.000 104.850,62.895 105.000,62.768 105.000 C 62.568 105.000,61.408 105.974,60.041 107.292 C 59.827 107.498,59.547 107.667,59.420 107.667 C 59.293 107.667,59.144 107.809,59.089 107.982 C 59.034 108.155,58.841 108.336,58.661 108.383 C 58.481 108.430,58.333 108.588,58.333 108.734 C 
          58.333 108.889,58.194 109.000,58.000 109.000 C 57.778 109.000,57.667 109.111,57.667 109.333 C 57.667 109.577,57.556 109.667,57.251 109.667 C 57.017 109.667,56.746 109.812,56.628 110.000 C 56.513 110.183,56.281 110.333,56.111 110.333 C 55.941 110.333,55.763 110.483,55.715 110.667 C 55.667 110.851,55.488 111.000,55.314 111.000 C 55.141 111.000,55.000 111.112,55.000 111.250 C 55.000 111.388,54.902 111.500,54.781 111.500 C 54.661 111.500,54.417 111.632,54.240 111.793 C 54.062 111.954,53.710 112.177,53.458 112.289 C 53.206 112.401,53.000 112.561,53.000 112.644 C 53.000 112.727,52.850 112.834,52.667 112.882 C 52.483 112.930,52.333 113.080,52.333 113.216 C 52.333 113.366,52.105 113.506,51.750 113.572 C 51.429 113.633,51.167 113.755,51.167 113.844 C 51.167 113.934,50.979 114.093,50.750 114.197 C 50.521 114.301,50.333 114.479,50.333 114.592 C 50.333 114.704,50.071 114.845,49.750 114.906 C 49.429 114.966,49.167 115.089,49.167 115.178 C 49.167 115.268,48.979 115.413,48.750 115.500 C 48.521 115.587,48.333 115.764,48.333 115.894 C 48.333 116.031,48.090 116.175,47.750 116.239 C 47.429 116.299,47.167 116.422,47.167 116.512 C 47.167 116.601,46.979 116.746,46.750 116.833 C 46.521 116.920,46.333 117.063,46.333 117.151 C 46.333 117.238,45.921 117.430,45.417 117.576 C 44.912 117.723,44.500 117.904,44.500 117.978 C 44.500 118.053,44.200 118.204,43.833 118.314 C 43.467 118.423,43.167 118.582,43.167 118.667 C 43.167 118.751,42.867 118.901,42.500 119.000 C 42.133 119.099,41.833 119.245,41.833 119.325 C 41.833 119.405,41.533 119.521,41.167 119.583 C 40.781 119.648,40.500 119.789,40.500 119.917 C 40.500 120.044,40.222 120.184,39.846 120.248 C 39.487 120.309,39.155 120.456,39.110 120.575 C 39.064 120.694,38.754 120.842,38.421 120.905 C 38.088 120.967,37.777 121.119,37.730 121.243 C 37.682 121.366,37.388 121.515,37.076 121.574 C 36.764 121.632,36.451 121.778,36.380 121.898 C 36.308 122.017,36.002 122.163,35.699 122.222 C 35.395 122.281,35.043 122.433,34.915 122.561 C 34.788 122.689,34.342 122.844,33.925 122.907 C 33.429 122.981,33.167 123.103,33.167 123.260 C 33.167 123.422,32.981 123.500,32.595 123.500 C 32.281 123.500,31.901 123.623,31.750 123.774 C 31.600 123.924,31.125 124.112,30.697 124.192 C 30.268 124.271,29.842 124.436,29.750 124.558 C 29.658 124.681,29.216 124.823,28.766 124.873 C 28.265 124.929,27.892 125.068,27.800 125.232 C 27.697 125.416,27.416 125.500,26.908 125.500 C 26.405 125.500,26.066 125.601,25.854 125.813 C 25.629 126.037,25.225 126.145,24.417 126.197 C 23.664 126.245,23.231 126.353,23.105 126.525 C 22.981 126.693,22.526 126.813,21.782 126.872 C 21.057 126.930,20.575 127.054,20.448 127.215 C 20.321 127.377,19.868 127.493,19.186 127.538 C 18.484 127.584,18.058 127.695,17.934 127.865 C 17.795 128.054,17.335 128.142,16.189 128.197 C 14.953 128.256,14.599 128.329,14.474 128.552 C 14.342 128.788,14.036 128.833,12.575 128.833 C 11.077 128.833,10.788 128.878,10.512 129.155 C 10.212 129.455,9.871 129.480,5.470 129.530 C -0.495 129.597,0.000 129.291,0.000 132.917 L 0.000 135.500 63.833 135.500 L 127.667 135.500 127.667 87.250 L 127.667 39.000 110.781 39.000 L 93.896 39.000 93.448 39.467 M158.391 71.924 C 158.246 72.301,158.376 72.320,158.708 71.972 C 158.955 71.714,158.961 71.667,158.745 71.667 C 158.604 71.667,158.445 71.782,158.391 71.924 M203.746 72.013 C 203.686 72.203,203.681 72.403,203.735 72.457 C 203.789 72.511,203.833 72.434,203.833 72.286 C 203.833 72.138,203.965 71.940,204.125 71.847 C 204.391 71.692,204.392 71.676,204.136 71.672 C 203.982 71.669,203.806 71.822,203.746 72.013 M245.214 72.042 C 245.417 72.248,245.609 72.358,245.641 72.286 C 245.725 72.095,245.329 71.667,245.069 71.667 C 244.925 71.667,244.977 71.800,245.214 72.042 M217.980 71.948 C 217.969 72.023,217.969 72.140,217.980 72.208 C 217.991 72.277,217.925 72.333,217.833 72.333 C 217.724 72.333,217.667 76.861,217.667 85.583 C 217.667 94.798,217.720 98.833,217.843 98.833 C 217.940 98.833,217.979 98.900,217.928 98.981 C 217.828 99.143,218.291 99.597,218.423 99.466 C 218.468 99.421,218.354 99.192,218.169 98.957 C 217.805 98.495,217.621 72.500,217.982 72.500 C 218.202 72.500,218.345 72.027,218.159 71.912 C 218.072 71.858,217.991 71.874,217.980 71.948 M181.000 75.339 C 181.000 75.519,181.112 75.667,181.250 75.667 C 181.387 75.667,181.500 75.562,181.500 75.434 C 181.500 75.307,181.387 75.159,181.250 75.106 C 181.080 75.041,181.000 75.115,181.000 75.339 M229.448 75.318 C 229.540 75.670,230.159 76.397,230.271 76.285 C 230.412 76.144,230.125 75.667,229.899 75.667 C 229.771 75.667,229.667 75.559,229.667 75.427 C 229.667 75.294,229.599 75.144,229.516 75.093 C 229.432 75.042,229.402 75.143,229.448 75.318 M181.929 76.645 C 182.290 76.995,182.423 76.974,182.276 76.591 C 182.222 76.449,182.049 76.333,181.893 76.333 C 181.638 76.333,181.641 76.365,181.929 76.645 M182.522 78.527 C 182.672 78.650,182.839 78.862,182.893 79.000 C 182.947 79.137,182.974 79.063,182.954 78.835 C 182.930 78.568,182.798 78.399,182.583 78.362 C 182.282 78.309,182.276 78.325,182.522 78.527 M170.872 79.167 C 170.987 79.350,171.138 79.500,171.208 79.500 C 171.279 79.500,171.242 79.350,171.128 79.167 C 171.013 78.983,170.862 78.833,170.792 78.833 C 170.721 78.833,170.758 78.983,170.872 79.167 M271.270 79.754 C 270.939 80.084,270.932 80.167,271.232 80.167 C 271.360 80.167,271.512 80.043,271.569 79.893 C 271.719 79.502,271.584 79.440,271.270 79.754 M233.841 80.417 C 233.837 80.664,234.135 81.088,234.239 80.983 C 234.289 80.933,234.221 80.748,234.087 80.571 C 233.953 80.395,233.843 80.325,233.841 80.417 M257.944 81.278 C 257.753 81.470,257.823 81.667,258.083 81.667 C 258.221 81.667,258.333 81.554,258.333 81.417 C 258.333 81.156,258.136 81.086,257.944 81.278 M152.701 81.992 C 152.931 82.361,153.092 82.315,152.942 81.924 C 152.888 81.782,152.766 81.667,152.670 81.667 C 152.561 81.667,152.572 81.786,152.701 81.992 M172.434 82.597 C 172.280 82.999,172.306 83.026,172.667 82.833 C 172.850 82.735,173.000 82.583,173.000 82.494 C 173.000 82.230,172.544 82.313,172.434 82.597 M256.431 83.274 C 256.276 83.678,256.396 83.701,256.716 83.328 C 256.934 83.073,256.945 83.000,256.766 83.000 C 256.639 83.000,256.488 83.123,256.431 83.274 M267.958 84.528 C 267.712 84.786,267.706 84.833,267.922 84.833 C 268.062 84.833,268.222 84.718,268.276 84.576 C 268.420 84.199,268.291 84.180,267.958 84.528 M266.533 86.367 C 266.292 86.608,266.273 86.833,266.494 86.833 C 266.583 86.833,266.735 86.683,266.833 86.500 C 267.030 86.133,266.848 86.052,266.533 86.367 M181.284 87.172 C 181.066 87.427,181.055 87.500,181.234 87.500 C 181.361 87.500,181.512 87.377,181.569 87.226 C 181.724 86.822,181.604 86.799,181.284 87.172 M253.167 88.000 C 253.069 88.183,253.051 88.333,253.127 88.333 C 253.305 88.333,253.667 87.975,253.667 87.800 C 253.667 87.541,253.343 87.671,253.167 88.000 M179.263 89.188 C 178.975 89.468,178.971 89.500,179.226 89.500 C 179.382 89.500,179.555 89.384,179.609 89.243 C 179.756 88.859,179.623 88.838,179.263 89.188 M203.167 90.000 C 203.069 90.183,203.048 90.333,203.121 90.333 C 203.194 90.333,203.347 90.183,203.461 90.000 C 203.577 89.815,203.597 89.667,203.507 89.667 C 203.418 89.667,203.265 89.817,203.167 90.000 M251.724 89.924 C 251.580 90.301,251.709 90.320,252.042 89.972 C 252.288 89.714,252.294 89.667,252.078 89.667 C 251.938 89.667,251.778 89.782,251.724 89.924 M229.174 90.514 C 229.277 90.705,229.394 90.829,229.434 90.788 C 229.551 90.671,229.314 90.167,229.143 90.167 C 229.058 90.167,229.072 90.323,229.174 90.514 M196.667 90.667 C 196.850 90.850,197.000 91.150,197.000 91.333 C 197.000 91.519,197.111 91.667,197.250 91.667 C 197.387 91.667,197.500 91.554,197.500 91.417 C 197.500 91.279,197.423 91.167,197.329 91.167 C 197.235 91.167,197.087 90.979,197.000 90.750 C 196.913 90.521,196.727 90.333,196.587 90.333 C 196.386 90.333,196.403 90.403,196.667 90.667 M213.457 90.646 C 213.401 90.859,213.288 90.992,213.206 90.941 C 213.123 90.890,213.056 90.961,213.056 91.100 C 213.056 91.300,213.123 91.284,213.381 91.027 C 213.560 90.848,213.673 90.602,213.632 90.480 C 213.589 90.349,213.517 90.417,213.457 90.646 M229.667 91.042 C 229.667 91.191,229.747 91.363,229.844 91.424 C 230.130 91.600,230.158 91.442,229.903 91.093 C 229.705 90.823,229.667 90.814,229.667 91.042 M263.284 91.172 C 263.066 91.427,263.055 91.500,263.234 91.500 C 263.361 91.500,263.512 91.377,263.569 91.226 C 263.724 90.822,263.604 90.799,263.284 91.172 M201.349 91.898 C 201.213 92.062,201.206 92.171,201.326 92.246 C 201.423 92.306,201.549 92.234,201.605 92.087 C 201.746 91.720,201.591 91.606,201.349 91.898 M274.450 92.042 C 274.637 92.248,274.832 92.529,274.882 92.667 C 274.953 92.859,274.977 92.847,274.987 92.614 C 275.007 92.161,274.691 91.667,274.382 91.667 C 274.149 91.667,274.159 91.722,274.450 92.042 M249.944 92.611 C 249.753 92.803,249.823 93.000,250.083 93.000 C 250.221 93.000,250.333 92.888,250.333 92.750 C 250.333 92.490,250.136 92.419,249.944 92.611 M212.618 93.172 C 212.399 93.427,212.388 93.500,212.567 93.500 C 212.694 93.500,212.845 93.377,212.903 93.226 C 213.058 92.822,212.937 92.799,212.618 93.172 M187.167 93.732 C 187.167 93.860,187.279 94.008,187.417 94.060 C 187.587 94.126,187.667 94.051,187.667 93.828 C 187.667 93.648,187.554 93.500,187.417 93.500 C 187.279 93.500,187.167 93.604,187.167 93.732 M211.867 94.367 C 211.626 94.608,211.607 94.833,211.827 94.833 C 211.916 94.833,212.069 94.683,212.167 94.500 C 212.363 94.133,212.181 94.052,211.867 94.367 M248.434 94.597 C 248.291 94.971,248.304 95.001,248.570 94.899 C 248.895 94.774,249.045 94.333,248.763 94.333 C 248.638 94.333,248.490 94.452,248.434 94.597 M233.231 95.055 C 233.254 95.223,233.349 95.410,233.441 95.472 C 233.532 95.533,233.656 95.715,233.715 95.875 C 233.774 96.035,233.938 96.167,234.078 96.167 C 234.306 96.167,234.306 96.135,234.075 95.875 C 233.933 95.715,233.675 95.396,233.502 95.167 C 233.255 94.838,233.198 94.815,233.231 95.055 M188.508 95.848 C 188.610 96.039,188.727 96.162,188.767 96.121 C 188.884 96.005,188.648 95.500,188.476 95.500 C 188.391 95.500,188.405 
          95.656,188.508 95.848 M189.000 96.375 C 189.000 96.525,189.080 96.696,189.178 96.757 C 189.464 96.934,189.492 96.775,189.236 96.426 C 189.039 96.156,189.000 96.147,189.000 96.375 M189.841 97.181 C 189.943 97.372,190.060 97.495,190.101 97.455 C 190.217 97.338,189.981 96.833,189.810 96.833 C 189.724 96.833,189.739 96.990,189.841 97.181 M208.333 97.828 C 208.333 98.051,208.413 98.126,208.583 98.060 C 208.721 98.008,208.833 97.860,208.833 97.732 C 208.833 97.604,208.721 97.500,208.583 97.500 C 208.446 97.500,208.333 97.648,208.333 97.828 M207.000 98.495 C 207.000 98.718,207.080 98.792,207.250 98.727 C 207.387 98.674,207.500 98.527,207.500 98.399 C 207.500 98.271,207.387 98.167,207.250 98.167 C 207.112 98.167,207.000 98.314,207.000 98.495 M274.853 98.489 C 274.842 98.621,274.670 98.902,274.471 99.114 C 274.169 99.435,274.154 99.500,274.382 99.500 C 274.713 99.500,275.049 98.923,274.947 98.533 C 274.896 98.341,274.866 98.327,274.853 98.489 M247.673 98.676 C 247.669 98.819,247.777 99.082,247.911 99.260 C 248.225 99.674,248.228 99.379,247.917 98.833 C 247.764 98.566,247.676 98.510,247.673 98.676 M245.500 98.794 C 245.500 98.894,245.382 99.094,245.238 99.238 C 245.010 99.466,245.009 99.500,245.227 99.500 C 245.485 99.500,245.774 98.885,245.599 98.710 C 245.544 98.655,245.500 98.693,245.500 98.794 M158.333 99.042 C 158.333 99.191,158.413 99.363,158.511 99.424 C 158.797 99.600,158.825 99.442,158.570 99.093 C 158.372 98.823,158.333 98.814,158.333 99.042 M193.905 99.125 C 193.929 99.285,194.091 99.444,194.266 99.478 C 194.578 99.538,194.578 99.533,194.266 99.186 C 193.881 98.758,193.851 98.753,193.905 99.125 M131.000 117.917 L 131.000 131.500 143.003 131.500 L 155.007 131.500 154.962 127.875 L 154.917 124.250 147.625 124.207 L 140.333 124.163 140.333 122.834 L 140.333 121.504 146.625 121.460 L 152.917 121.417 152.962 117.929 C 152.996 115.250,152.958 114.409,152.795 114.306 C 152.679 114.232,149.827 114.171,146.458 114.169 L 140.333 114.167 140.333 112.833 L 140.333 111.500 147.667 111.500 L 155.000 111.500 155.000 107.917 L 155.000 104.333 143.000 104.333 L 131.000 104.333 131.000 117.917 M158.333 117.917 L 158.333 131.500 163.333 131.500 L 168.333 131.500 168.333 127.500 L 168.333 123.500 171.667 123.500 C 174.778 123.500,175.022 123.478,175.333 123.167 C 175.593 122.907,175.889 122.833,176.667 122.833 C 177.556 122.833,177.667 122.796,177.667 122.500 C 177.667 122.222,177.778 122.167,178.333 122.167 C 178.889 122.167,179.000 122.111,179.000 121.833 C 179.000 121.562,179.111 121.500,179.599 121.500 C 180.048 121.500,180.219 121.420,180.281 121.182 C 180.327 121.007,180.507 120.827,180.682 120.781 C 180.891 120.726,181.000 120.551,181.000 120.267 C 181.000 120.017,181.140 119.749,181.333 119.628 C 181.517 119.513,181.667 119.306,181.667 119.167 C 181.667 119.027,181.817 118.820,182.000 118.705 C 182.259 118.543,182.333 118.317,182.333 117.685 C 182.333 117.012,182.391 116.857,182.667 116.785 C 182.983 116.702,183.000 116.558,183.000 113.917 C 183.000 111.276,182.983 111.131,182.667 111.048 C 182.385 110.975,182.333 110.821,182.333 110.048 C 182.333 109.276,182.282 109.122,182.000 109.048 C 181.816 109.000,181.667 108.821,181.667 108.647 C 181.667 108.444,181.549 108.333,181.333 108.333 C 181.062 108.333,181.000 108.222,181.000 107.734 C 181.000 107.276,180.922 107.115,180.667 107.048 C 180.482 107.000,180.333 106.821,180.333 106.647 C 180.333 106.446,180.215 106.333,180.006 106.333 C 179.826 106.333,179.598 106.183,179.500 106.000 C 179.386 105.786,179.151 105.667,178.847 105.667 C 178.512 105.667,178.346 105.568,178.285 105.333 C 178.211 105.050,178.058 105.000,177.266 105.000 C 176.444 105.000,176.333 104.960,176.333 104.667 C 176.333 104.337,176.222 104.333,167.333 104.333 L 158.333 104.333 158.333 117.917 M186.333 114.516 C 186.333 124.558,186.338 124.699,186.667 124.785 C 186.928 124.853,187.000 125.012,187.000 125.519 C 187.000 125.944,187.114 126.281,187.333 126.500 C 187.517 126.683,187.667 126.983,187.667 127.167 C 187.667 127.389,187.778 127.500,188.000 127.500 C 188.206 127.500,188.334 127.612,188.335 127.792 C 188.338 128.210,189.590 129.500,189.993 129.500 C 190.222 129.500,190.333 129.609,190.333 129.833 C 190.333 130.078,190.444 130.167,190.750 130.167 C 190.995 130.167,191.167 130.262,191.167 130.399 C 191.167 130.679,191.526 130.833,192.179 130.833 C 192.483 130.833,192.741 130.957,192.872 131.167 C 193.041 131.437,193.261 131.500,194.040 131.500 C 194.889 131.500,195.000 131.539,195.000 131.833 C 195.000 132.159,195.111 132.167,199.905 132.167 C 204.664 132.167,204.814 132.157,204.917 131.833 C 205.006 131.553,205.169 131.500,205.944 131.500 C 206.724 131.500,206.878 131.449,206.952 131.167 C 207.020 130.906,207.179 130.833,207.686 130.833 C 208.222 130.833,208.333 130.776,208.333 130.500 C 208.333 130.229,208.444 130.167,208.932 130.167 C 209.391 130.167,209.552 130.089,209.618 129.833 C 209.667 129.649,209.846 129.500,210.019 129.500 C 210.222 129.500,210.333 129.382,210.333 129.167 C 210.333 128.944,210.444 128.833,210.667 128.833 C 210.889 128.833,211.000 128.722,211.000 128.500 C 211.000 128.278,211.111 128.167,211.333 128.167 C 211.557 128.167,211.667 128.056,211.667 127.828 C 211.667 127.642,211.775 127.448,211.906 127.398 C 212.038 127.347,212.198 127.068,212.262 126.778 C 212.326 126.487,212.518 126.152,212.689 126.032 C 212.926 125.866,213.000 125.604,213.000 124.933 C 213.000 124.263,213.080 123.979,213.333 123.750 C 213.659 123.455,213.667 123.237,213.667 113.891 L 213.667 104.333 208.667 104.333 L 203.667 104.333 203.667 113.244 C 203.667 121.984,203.660 122.158,203.333 122.333 C 203.115 122.450,203.000 122.682,203.000 123.006 C 203.000 123.389,202.925 123.500,202.667 123.500 C 202.483 123.500,202.333 123.607,202.333 123.739 C 202.333 123.990,202.137 124.073,201.141 124.240 C 200.806 124.296,200.490 124.453,200.438 124.588 C 200.311 124.919,199.000 124.932,199.000 124.601 C 199.000 124.332,198.645 124.167,198.070 124.167 C 197.831 124.167,197.667 124.069,197.667 123.928 C 197.667 123.797,197.517 123.642,197.333 123.583 C 197.150 123.525,197.000 123.375,197.000 123.250 C 197.000 123.125,196.850 122.975,196.667 122.917 C 196.408 122.834,196.333 122.664,196.333 122.155 C 196.333 121.722,196.220 121.387,196.000 121.167 C 195.676 120.842,195.667 120.611,195.667 112.583 L 195.667 104.333 191.000 104.333 L 186.333 104.333 186.333 114.516 M217.838 104.658 C 217.721 104.876,217.679 109.278,217.707 118.199 L 217.750 131.417 222.375 131.461 L 227.000 131.505 227.000 126.102 C 227.000 120.780,227.005 120.699,227.333 120.785 C 227.518 120.833,227.667 121.012,227.667 121.186 C 227.667 121.389,227.785 121.500,228.000 121.500 C 228.222 121.500,228.333 121.611,228.333 121.833 C 228.333 122.056,228.444 122.167,228.667 122.167 C 228.889 122.167,229.000 122.278,229.000 122.500 C 229.000 122.722,229.111 122.833,229.333 122.833 C 229.546 122.833,229.667 122.944,229.667 123.141 C 229.667 123.310,229.817 123.584,230.000 123.750 C 230.183 123.916,230.333 124.148,230.333 124.266 C 230.333 124.384,230.470 124.579,230.636 124.699 C 230.802 124.819,230.988 125.048,231.047 125.208 C 231.107 125.369,231.271 125.500,231.411 125.500 C 231.556 125.500,231.667 125.645,231.667 125.833 C 231.667 126.056,231.778 126.167,232.000 126.167 C 232.222 126.167,232.333 126.278,232.333 126.500 C 232.333 126.722,232.444 126.833,232.667 126.833 C 232.889 126.833,233.000 126.944,233.000 127.167 C 233.000 127.389,233.111 127.500,233.333 127.500 C 233.528 127.500,233.667 127.611,233.667 127.768 C 233.667 128.006,234.033 128.557,234.715 129.346 C 234.840 129.491,234.990 129.734,235.049 129.888 C 235.108 130.041,235.271 130.167,235.411 130.167 C 235.556 130.167,235.667 130.312,235.667 130.500 C 235.667 130.722,235.778 130.833,236.000 130.833 C 236.222 130.833,236.333 130.944,236.333 131.167 C 236.333 131.492,236.444 131.500,241.001 131.500 L 245.669 131.500 245.626 117.958 L 245.583 104.417 240.958 104.372 L 236.333 104.328 236.333 109.982 C 236.333 115.553,236.328 115.634,236.000 115.548 C 235.817 115.500,235.667 115.347,235.667 115.208 C 235.667 115.069,235.527 114.834,235.357 114.686 C 235.187 114.538,234.994 114.248,234.929 114.042 C 234.864 113.835,234.703 113.667,234.572 113.667 C 234.441 113.667,234.333 113.522,234.333 113.345 C 234.333 113.167,234.191 112.977,234.018 112.922 C 233.845 112.867,233.664 112.675,233.617 112.494 C 233.570 112.314,233.412 112.167,233.266 112.167 C 233.120 112.167,233.000 112.047,233.000 111.901 C 233.000 111.755,232.850 111.596,232.667 111.548 C 232.483 111.500,232.333 111.357,232.333 111.231 C 232.333 111.104,232.192 111.000,232.019 111.000 C 231.791 111.000,231.674 110.839,231.595 110.421 C 231.535 110.103,231.390 109.784,231.272 109.713 C 231.155 109.642,231.010 109.452,230.951 109.292 C 230.892 109.131,230.729 109.000,230.589 109.000 C 230.444 109.000,230.333 108.855,230.333 108.667 C 230.333 108.444,230.222 108.333,230.000 108.333 C 229.778 108.333,229.667 108.222,229.667 108.000 C 229.667 107.778,229.556 107.667,229.333 107.667 C 229.111 107.667,229.000 107.556,229.000 107.333 C 229.000 107.111,228.889 107.000,228.667 107.000 C 228.444 107.000,228.333 106.889,228.333 106.667 C 228.333 106.444,228.222 106.333,228.000 106.333 C 227.756 106.333,227.667 106.222,227.667 105.917 C 227.667 105.688,227.530 105.363,227.362 105.196 C 227.195 105.028,227.010 104.766,226.951 104.612 C 226.773 104.148,218.088 104.191,217.838 104.658 M249.000 107.917 L 249.000 111.500 254.333 111.500 L 259.667 111.500 259.333 111.833 C 259.150 112.017,259.000 112.317,259.000 112.500 C 259.000 112.688,258.889 112.833,258.746 112.833 C 258.606 112.833,258.424 113.011,258.342 113.227 C 258.260 113.444,258.074 113.667,257.929 113.722 C 257.770 113.783,257.667 114.022,257.667 114.328 C 257.667 114.679,257.586 114.833,257.401 114.833 C 257.255 114.833,257.097 114.981,257.050 115.161 C 257.003 115.341,256.822 115.534,256.649 115.589 C 256.475 115.644,256.333 115.822,256.333 115.985 C 256.333 116.148,256.183 116.417,256.000

           116.583 C 255.817 116.749,255.667 117.015,255.667 117.173 C 255.667 117.331,255.517 117.500,255.333 117.548 C 255.134 117.600,255.000 117.776,255.000 117.984 C 255.000 118.176,254.896 118.333,254.768 118.333 C 254.513 118.333,254.333 118.684,254.333 119.180 C 254.333 119.356,254.219 119.500,254.079 119.500 C 253.939 119.500,253.758 119.677,253.675 119.894 C 253.593 120.111,253.407 120.333,253.263 120.389 C 253.103 120.450,253.000 120.689,253.000 120.995 C 253.000 121.389,252.927 121.500,252.667 121.500 C 252.451 121.500,252.333 121.611,252.333 121.814 C 252.333 121.988,252.184 122.167,252.000 122.215 C 251.817 122.263,251.667 122.422,251.667 122.568 C 251.667 122.714,251.517 122.983,251.333 123.167 C 251.150 123.350,251.000 123.641,251.000 123.814 C 251.000 123.988,250.851 124.167,250.667 124.215 C 250.475 124.265,250.333 124.442,250.333 124.632 C 250.333 124.821,250.192 124.998,250.000 125.048 C 249.757 125.112,249.667 125.276,249.667 125.651 C 249.667 126.012,249.587 126.167,249.401 126.167 C 249.255 126.167,249.097 126.314,249.050 126.494 C 249.003 126.675,248.822 126.867,248.649 126.922 C 248.442 126.988,248.333 127.177,248.333 127.471 C 248.333 127.742,248.199 128.004,247.994 128.132 C 247.686 128.324,247.659 128.487,247.702 129.880 L 247.750 131.417 261.333 131.417 L 274.917 131.417 274.962 127.955 L 275.007 124.494 274.576 124.330 C 274.325 124.235,271.820 124.167,268.572 124.167 C 263.111 124.167,263.000 124.160,263.000 123.833 C 263.000 123.611,263.111 123.500,263.333 123.500 C 263.556 123.500,263.667 123.389,263.667 123.167 C 263.667 122.944,263.778 122.833,264.000 122.833 C 264.224 122.833,264.333 122.722,264.333 122.495 C 264.333 122.309,264.444 122.114,264.579 122.062 C 264.714 122.010,264.872 121.713,264.931 121.401 C 265.007 120.993,265.126 120.833,265.352 120.833 C 265.556 120.833,265.667 120.716,265.667 120.500 C 265.667 120.317,265.771 120.167,265.899 120.167 C 266.168 120.167,266.333 119.812,266.333 119.236 C 266.333 118.944,266.425 118.833,266.667 118.833 C 266.882 118.833,267.000 118.722,267.000 118.519 C 267.000 118.346,267.149 118.167,267.333 118.118 C 267.517 118.070,267.667 117.912,267.667 117.766 C 267.667 117.620,267.817 117.350,268.000 117.167 C 268.183 116.983,268.333 116.683,268.333 116.500 C 268.333 116.278,268.444 116.167,268.667 116.167 C 268.852 116.167,269.000 116.056,269.000 115.917 C 269.000 115.779,269.150 115.517,269.333 115.333 C 269.517 115.150,269.667 114.813,269.667 114.583 C 269.667 114.278,269.756 114.167,270.000 114.167 C 270.215 114.167,270.333 114.056,270.333 113.853 C 270.333 113.679,270.482 113.500,270.667 113.452 C 270.922 113.385,271.000 113.224,271.000 112.766 C 271.000 112.278,271.062 112.167,271.333 112.167 C 271.556 112.167,271.667 112.056,271.667 111.833 C 271.667 111.646,271.778 111.500,271.921 111.500 C 272.061 111.500,272.246 111.313,272.333 111.083 C 272.420 110.854,272.565 110.667,272.655 110.667 C 272.745 110.667,272.867 110.404,272.928 110.083 C 273.007 109.661,273.124 109.500,273.352 109.500 C 273.549 109.500,273.667 109.383,273.667 109.186 C 273.667 109.012,273.816 108.833,274.000 108.785 C 274.312 108.703,274.333 108.558,274.333 106.516 L 274.333 104.333 261.667 104.333 L 249.000 104.333 249.000 107.917 M170.872 111.833 C 171.018 112.068,171.261 112.167,171.687 112.167 C 172.154 112.167,172.315 112.244,172.382 112.500 C 172.430 112.683,172.588 112.833,172.734 112.833 C 173.177 112.833,173.114 114.775,172.667 114.917 C 172.483 114.975,172.333 115.130,172.333 115.261 C 172.333 115.404,172.168 115.500,171.925 115.500 C 171.444 115.500,170.667 115.826,170.667 116.027 C 170.667 116.104,170.142 116.167,169.500 116.167 L 168.333 116.167 168.333 113.833 L 168.333 111.500 169.499 111.500 C 170.483 111.500,170.696 111.552,170.872 111.833 " stroke="none" fill="#040404" fill-rule="evenodd"></path>
              </svg>
                    </div>
                    <span className="copy">Pay</span>
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

CheckoutForm = reduxForm({
  form: 'CheckoutForm'
})(CheckoutForm);

export default connect(mapStateToProps)(CheckoutForm);
