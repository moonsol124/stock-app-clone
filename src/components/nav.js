import React from 'react';
import '../css/nav.css';
import logo from '../imgs/logo.png';

function Nav() {
    return (
        <div className="nav">
            {/* logo */}
            <div className="nav-logo">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            {/* search bar */}
            <div className="nav-search">
                <div className="nav-search-container">
                    <input type="text" placeholder="search" id="search" className="nav-search-input"></input>
                </div>
            </div>
            {/* menu items */}
            <ul className="nav-menu flex-hr">
                <li>Free Stocks</li>
                <li>Portfolio</li>
                <li>Cash</li>
                <li>Messages</li>
                <li>Account</li>
            </ul>
        </div>
    )
}

export default Nav;