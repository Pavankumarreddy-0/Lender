import React, { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { useToken } from '../auth/useToken'
import axios from 'axios';

import { Outlet } from 'react-router';
import dashboardStyles from './dashboard.module.css';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/Sidebar';

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
        <div className={dashboardStyles['dashboard']}>
            <div className={dashboardStyles['dashboardHeader']}>
                <Header></Header>
            </div>
            <div className={dashboardStyles['dashboardBody']}>
                <div className={dashboardStyles['dashboardSidebar']}>
                    <Sidebar></Sidebar>
                </div>
                <div className={dashboardStyles['dashboardOutlet']}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
