import React, { useEffect, useState, useContext } from 'react'
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
import { webAppContext } from '../contexts/contexts';

export default function Dashboard() {

    const user = useUser();
    const [token,] = useToken();
    const { __webAppSettings, __updateWebAppSettings } = useContext(webAppContext);
    const { id } = user;

    const navigate = useNavigate();

    const [docs, setDocs] = useState({
        documents: []
    })

    const setUserKeyboardShortcuts = async () => {
        await axios.post('/api/keyboard-shortcuts/', {}, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {

            const { result } = response.data;

            if ("keyboardShortcuts" in result[0]) {
                __updateWebAppSettings({ ...__webAppSettings, keyboardShortcuts: result[0].keyboardShortcuts })
            }
            // setKeyboardSetting({ ...keyboardSetting, modKeys: result.keyboardShortcuts, editMode: false, savingMode: false })

        }).catch(error => {
            setUserKeyboardShortcuts();
        })
    }

    useEffect(() => {
        console.log(user);
        setUserKeyboardShortcuts();
    }, [])

    useEffect(() => {

    }, [__webAppSettings.keyboardShortcuts])

    //hotkeys for pages

    useHotkeys(__webAppSettings.keyboardShortcuts.dashboardPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.communityPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/community');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.platformPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/platform');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.crowdFundingPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/crowdfunding');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.everythingPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/everything');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.investmentPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/investments');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.settingsPage, (event) => {
        event.preventDefault();
        navigate('/dashboard/settings');
    });

    useHotkeys(__webAppSettings.keyboardShortcuts.searchWebApp, (event) => {
        event.preventDefault();
        __updateWebAppSettings({ ...__webAppSettings, searchMode: !__webAppSettings.searchMode })
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
