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
            },
            {
                submenu:"System",
                subIcon:"",
            },
            {
                submenu:"Logs",
                subIcon:"",
            },
            {
                submenu:"Platfrom agreements",
                subIcon:"",
            },
            {
                submenu:"Site request",
                subIcon:"",
            }
           ]
        },
        {
            menuName:"CrowdFunding",
            menuLink:"/",
            children:[
                {
                    submenu:"Equity",
                    subIcon:""
                },
                {
                    submenu:"Donation",
                    subIcon:""
                },
                {
                    submenu:"Debt",
                    subIcon:""
                },
                {
                    submenu:"Allocated Intrest",
                    subIcon:""
                },
                {
                    submenu:"Offering agreements",
                    subIcon:""
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
                },
                {
                    submenu:"Fundraisers",
                    subIcon:"",
                },
                {
                    submenu:"Referrals",
                    subIcon:""
                },
                {
                    submenu:"Registration request",
                    subIcon:""
                },
                {
                    submenu:"Authorized auditors",
                    subIcon:""
                }
                
            ]
        },
        {
            menuName:"AutoInvesments",
            menuLink:"",
            children:[
                {
                    submenu:"Suggestions",
                    subIcon:""
                },
                {
                    submenu:"Assignments",
                    subIcon:""
                },
                {
                    submenu:"Auto investments",
                    subIcon:""
                },
                {
                    submenu:"Auto investment settings",
                    subIcon:""
                }
                
            ]
        },
        {
            menuName:"Everything",
            menuLink:"/",
            children:[
                {
                    submenu:"Users",
                    subIcon:""
                },
                {
                    submenu:"Secondary market",
                    subIcon:""
                },
                {
                    submenu:"Organization",
                    subIcon:""
                },
                {
                    submenu:"Offerings",
                    subIcon:""
                },
                {
                    submenu:"Investments",
                    subIcon:""
                },
                {
                    submenu:"Transactions",
                    subIcon:""
                },
                {
                    submenu:"Wallets",
                    subIcon:""
                },
                {
                    submenu:"Comments",
                    subIcon:""
                },
                {
                    submenu:"Annual limit excess",
                    subIcon:""
                }
            ]
        },
        {

            menuName:"GDPR",
            menuLink:"/",
            children:[
                {
                    submenu:"Erasure request",
                    subIcon:""
                },
                {
                    submenu:"Settings",
                    subIcon:""
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
            <a href="javascript:void(0)" className={SideDrawerStyles['threedots']} onClick={()=>setWebSettings({...webAppSettings, enlargedMenu: false})} ><i class="bi bi-grid-3x3-gap"></i></a>
            <Link><img src="assets/logo.gif" alt="PiLog Logo" className={SideDrawerStyles["SideDrawerLogo"]} /></Link>
            </div>
            <div className={SideDrawerStyles["sideDrawerApps"]}>
                    {SideDrawerTxt.map((e) =>{
                        return  <div className={SideDrawerStyles['SideDrawerAppHeader']}>
                                    <div className={SideDrawerStyles['sidetext']}>{e.menuName}</div>
                                    <div className={SideDrawerStyles['SideDrawerAppssection']}>
                                    { e.children.map((e) => {
                                            return <div className={SideDrawerStyles["SideDrawerSubMenu"]}>{e.submenu}</div>
                                    })}
                                    </div>
                                    </div>
                    })}
            </div>
        </div>
    </div>
  )
}
