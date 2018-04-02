import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <div className="row-container">
            <div className="nav-brand row-container">
                <h2>opensound</h2>
            </div>
            <div className="nav-links row-container">
                <ul className="row-container">
                    <li>Home</li>
                    <li>My Sounds</li>
                    <li><Link to="/create-sound">Create Sound</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Nav;