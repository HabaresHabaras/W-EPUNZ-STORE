import React from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from '../global/HeaderNav';
import * as Header from '../../assets/img/headers/header.jpg';

var HeaderStyle = {
  backgroundImage: `url(${Header})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'scroll',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundOrigin: 'border-box'
};

const HomeHeader = props => (
  <header className="large-header light push" style={HeaderStyle}>
    <HeaderNav />

    <div className="header-container">
      <div className="content">
        <h1>Cheap, simple & easy.</h1>
        <Link to="/products" className="btn">
          Buy Now
        </Link>
      </div>
    </div>

    <div className="down-arrow" aria-hidden="true">
      <span className="arrow"> &#10095; </span>
    </div>
  </header>
);

export default HomeHeader;
