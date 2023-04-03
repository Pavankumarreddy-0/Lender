import React from 'react'
import { Link } from 'react-router-dom';

import './homepage.css'
export default function Homepage() {
    return (
        <div className='homapage'>
            Homepage 

            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div >
    )
}
