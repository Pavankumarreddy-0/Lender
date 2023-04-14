import React, { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { useToken } from '../auth/useToken'
import axios from 'axios';

import { Outlet } from 'react-router';
import dashboardStyles from './dashboard.module.css';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardNotification from './components/dashboardNotification/DashboardNotification';
import { useHotkeys } from 'react-hotkeys-hook';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const user = useUser();
    const [token,] = useToken();
    const { id } = user;

    const navigate = useNavigate();

    const [docs, setDocs] = useState({
        documents: []
    })

    useEffect(() => {
        console.log(user);
    }, [])

    //hotkeys for pages
    useHotkeys('ctrl+shift+d', (event) => {
        event.preventDefault();
        navigate('/dashboard/');
    });

    useHotkeys('ctrl+shift+c', (event) => {
        event.preventDefault();
        navigate('/dashboard/community');
    });

    useHotkeys('ctrl+shift+p', (event) => {
        event.preventDefault();
        navigate('/dashboard/platform');
    });

    useHotkeys('ctrl+shift+f', (event) => {
        event.preventDefault();
        navigate('/dashboard/crowdfunding');
    });

    useHotkeys('ctrl+shift+e', (event) => {
        event.preventDefault();
        navigate('/dashboard/everything');
    });

    useHotkeys('ctrl+shift+i', (event) => {
        event.preventDefault();
        navigate('/dashboard/investments');
    });

    useHotkeys('ctrl+shift+s', (event) => {
        event.preventDefault();
        navigate('/dashboard/settings');
    });

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
                    <div className={dashboardStyles['dashboardOutletInner']}>
                        {/* {
                            ( ! user.isEmailVerified ) &&
                            <>
                                <DashboardNotification 
                                    notiText="Your account email is not verified. Please verify your account."
                                    notiType="Error"
                                    notiIcon="bi bi-envelope-exclamation"
                                ></DashboardNotification>
                            </>
                        } */}
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    )
}
