import React, { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { useToken } from '../auth/useToken'
import axios from 'axios';

import './dash.css'

export default function Dashboard() {

    const user = useUser();
    const [token,] = useToken();
    const { id } = user;

    const [docs, setDocs] = useState({
        documents: []
    })

    useEffect(() => {
        
    }, [])



    return (
        <div className='dashboard'>
            Welcome to dashboard
        </div>
    )
}
