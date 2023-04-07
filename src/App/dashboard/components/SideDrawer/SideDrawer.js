import React, {useEffect, useState} from 'react'
import SideDrawerStyles from './SideDrawer.module.css'
import { Link } from 'react-router-dom'


export default function SideDrawer(props) {
    const {webAppSettings,setWebSettings } = props
    const SideD = [
        {
            menuName:"Platform",
            menuLink:"/",
            children:[
            {
                submenu:"Finance",
                subIcon:"",
                menuLink:"/",
            },
            {
                submenu:"System",
                subIcon:"",
                menuLink:"/",
            },
            {
                submenu:"Logs",
                subIcon:"",
                menuLink:"/",
            },
            {
                submenu:"Platfrom agreements",
                subIcon:"",
                menuLink:"/",
            },
            {
                submenu:"Site request",
                subIcon:"",
                menuLink:"/",
            }
           ]
        },
        {
            menuName:"CrowdFunding",
            menuLink:"/",
            children:[
                {
                    submenu:"Equity",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Donation",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Debt",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Allocated Intrest",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Offering agreements",
                    subIcon:"",
                    menuLink:"/",
                }
            ]
        },
        {
            menuName:"Community",
            menuLink:"",
            children:[
                {
                    submenu:"Investors",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Fundraisers",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Referrals",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Registration request",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Authorized auditors",
                    subIcon:"",
                    menuLink:"/",
                }
                
            ]
        },
        {
            menuName:"AutoInvesments",
            menuLink:"",
            children:[
                {
                    submenu:"Suggestions",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Assignments",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Auto investments",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Auto investment settings",
                    subIcon:"",
                    menuLink:"/",
                }
                
            ]
        },
        {
            menuName:"Everything",
            menuLink:"/",
            children:[
                {
                    submenu:"Users",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Secondary market",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Organization",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Offerings",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Investments",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Transactions",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Wallets",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Comments",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Annual limit excess",
                    subIcon:"",
                    menuLink:"/",
                }
            ]
        },
        {

            menuName:"GDPR",
            menuLink:"/",
            children:[
                {
                    submenu:"Erasure request",
                    subIcon:"",
                    menuLink:"/",
                },
                {
                    submenu:"Settings",
                    subIcon:"",
                    menuLink:"/",
                },
            ]
        }
    ]
    const [SideDrawerTxt,setSideDrawer] = useState(SideD);


    useEffect(()=>{

    },[webAppSettings.enlargedMenu])

  return (
    (webAppSettings.enlargedMenu) && <div className={SideDrawerStyles["SideDrawerContainer"]}>
        <div className={SideDrawerStyles["SideDrawerInner"]}>
            <div className={SideDrawerStyles["sideheaderIcon"]}>
            <a href="javascript:void(0)" className={SideDrawerStyles['threedots']} onClick={()=>setWebSettings({...webAppSettings, enlargedMenu: false})} ><i class="bi bi-grid-3x3-gap-fill"></i></a>
            <Link to="/"><img src="assets/logo.gif" alt="PiLog Logo" className={SideDrawerStyles["SideDrawerLogo"]} /></Link>
            </div>
            <div className={SideDrawerStyles["sideDrawerApps"]}>
                    {SideDrawerTxt.map((e) =>{
                        return  <div className={SideDrawerStyles['SideDrawerAppHeader']}>
                                    <Link className={SideDrawerStyles['sidetext']} to={e.menuLink}>{e.menuName}</Link>
                                    <div className={SideDrawerStyles['SideDrawerAppssection']}>
                                    { e.children.map((e) => {
                                            return <Link to={e.menuLink} className={SideDrawerStyles["SideDrawerSubMenu"]}>{e.submenu}</Link>
                                    })}
                                    </div>
                                    </div>
                    })}
            </div>
        </div>
    </div>
  )
}
