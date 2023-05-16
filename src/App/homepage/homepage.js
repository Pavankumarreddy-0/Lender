import React from 'react'
import { Link } from 'react-router-dom';

import './homepage.css'
export default function Homepage() {
    return (
        <div className='homepage'>
            Homepage
            <div className="HomepageInnerWrapper">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>
        </div >
    )
}
