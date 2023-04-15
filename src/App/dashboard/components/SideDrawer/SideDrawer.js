import React, { useEffect, useState } from 'react'
import SideDrawerStyles from './SideDrawer.module.css'
import { Link } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook';

export default function SideDrawer(props) {
    const { webAppSettings, setWebSettings } = props
    const SideD = [
        {
            menuName: "Platform",
            menuIcon: "bi bi-columns",
            menuLink: "/",
            children: [
                {
                    submenu: "Finance",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "System",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Logs",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Platfrom agreements",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Site request",
                    subIcon: "",
                    menuLink: "/",
                }
            ]
        },
        {
            menuName: "Crowd Funding",
            menuIcon: "bi bi-stack",
            menuLink: "/",
            children: [
                {
                    submenu: "Equity",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Donation",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Debt",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Allocated Intrest",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Offering agreements",
                    subIcon: "",
                    menuLink: "/",
                }
            ]
        },
        {
            menuName: "Community",
            menuIcon: "bi bi-people",
            menuLink: "",
            children: [
                {
                    submenu: "Investors",
                    subIcon: "",
                    menuLink: "/dashboard/community/organizations/view",
                },
                {
                    submenu: "Fundraisers",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Referrals",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Registration request",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Authorized auditors",
                    subIcon: "",
                    menuLink: "/",
                }

            ]
        },
        {
            menuName: "Auto Invesments",
            menuIcon: "bi bi-cpu-fill",
            menuLink: "",
            children: [
                {
                    submenu: "Suggestions",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Assignments",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Auto investments",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Auto investment settings",
                    subIcon: "",
                    menuLink: "/",
                }

            ]
        },
        {
            menuName: "Everything",
            menuIcon: "bi bi-cpu-fill",
            menuLink: "/",
            children: [
                {
                    submenu: "Users",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Secondary market",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Organization",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Offerings",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Investments",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Transactions",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Wallets",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Comments",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Annual limit excess",
                    subIcon: "",
                    menuLink: "/",
                }
            ]
        },
        {

            menuName: "GDPR",
            menuIcon: "bi bi-cpu-fill",
            menuLink: "/",
            children: [
                {
                    submenu: "Erasure request",
                    subIcon: "",
                    menuLink: "/",
                },
                {
                    submenu: "Settings",
                    subIcon: "",
                    menuLink: "/",
                },
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
                                    return <div className={SideDrawerStyles['SideDrawerAppHeader']}>
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
