import React, { useEffect, useState } from 'react'
import SideDrawerStyles from './SideDrawer.module.css'
import { Link } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook';

export default function PrivateSideDrawer(props) {
    const { webAppSettings, setWebSettings } = props
    const SideD = [
        {
            menuName: "Wallet",
            menuIcon: "bi bi-wallet2",
            permissionName: "Platform",
            menuLink: "/investor/wallet",
            children: [
            ]
        },
        {
            menuName: "Investments",
            menuIcon: "bi bi-piggy-bank",     
            permissionName: "Platform",
            menuLink: "/",
            children: [
               
            ]
        },
        {
            menuName: "Indicated Interests",
            menuIcon: "bi bi-postcard-heart",
            permissionName: "Platform",
            menuLink: "",
            children: [
                
            ]
        },
        {
            menuName: "Transaction History",
            menuIcon: "bi bi-cash-coin",
            permissionName: "Platform",
            menuLink: "",
            children: [
                

            ]
        },
        {
            menuName: "Auto Investment",
            menuIcon: "bi bi-bar-chart-steps",
            permissionName: "Platform",
            menuLink: "/",
            children: [
                
            ]
        },
        {

            menuName: "Aggrements",
            menuIcon: "bi bi-file-earmark-check",
            permissionName: "Platform",
            menuLink: "/",
            children: [
               
            ]
        },
        {

            menuName: "Notifications",
            menuIcon: "bi bi-bell",
            permissionName: "Platform",
            menuLink: "/",
            children: [
              
            ]
        }
    ]
    const [SideDrawerTxt, setSideDrawer] = useState(SideD);


    useEffect(() => {

    }, [webAppSettings.enlargedMenu])

    //hotkeys
    useHotkeys(webAppSettings.keyboardShortcuts.showenlargedmenu, (event) => {
        event.preventDefault();
        setWebSettings({ ...webAppSettings, enlargedMenu: !webAppSettings.enlargedMenu })
    });

    return (
        <>
            {(webAppSettings.enlargedMenu) &&
                <>
                    <div className={SideDrawerStyles["SideDrawerBackdrop"]} onClick={() => setWebSettings({ ...webAppSettings, enlargedMenu: false })} ></div>
                    <div className={SideDrawerStyles["SideDrawerContainer"]}>
                        <div className={SideDrawerStyles["SideDrawerInner"]}>
                            <div className={SideDrawerStyles["sideheaderIcon"]}>
                                <a href="javascript:void(0)" className={SideDrawerStyles['threedots']} onClick={() => setWebSettings({ ...webAppSettings, enlargedMenu: false })} ><i className="bi bi-grid-3x3-gap-fill"></i></a>
                                <Link to="/"><img src="/assets/logo.gif" alt="PiLog Logo" className={SideDrawerStyles["SideDrawerLogo"]} /></Link>
                            </div>
                            <div className={SideDrawerStyles["sideDrawerApps"]}>
                                {SideDrawerTxt.map((e) => {
                                    return (webAppSettings.pageAccess[e.permissionName]) && <div className={SideDrawerStyles['SideDrawerAppHeader']}>
                                        <Link className={SideDrawerStyles['sidetext']} to={e.menuLink}><div className={SideDrawerStyles["SideDrawerMenuName"]}><i className={e.menuIcon}></i> {e.menuName}</div> <div className={SideDrawerStyles["SideDrawerMenuForwardLink"]}><i className="bi bi-arrow-right"></i></div></Link>
                                        <div className={SideDrawerStyles['SideDrawerAppssection']}>
                                            {e.children.map((e) => {
                                                return <Link to={e.menuLink} className={SideDrawerStyles["SideDrawerSubMenu"]}>{e.submenu}</Link>
                                            })}
                                        </div>
                                    </div> 
                                })}
                            </div>
                        </div>
                    </div>
                </>}

        </>
    )
}
