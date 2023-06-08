import sidebarStyles from './sidebar.module.css';
import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarInvestor() {
  const sbItems ={
    menuitems:[
      {
        url: "/investor/dashboard",
        icon:"bi bi-speedometer2",
        name: "Dashboard"
      },
      {
        url: "/investor/wallet",
        icon:"bi bi-wallet2",
        name: "Wallet"
      },
      {
        url: "/investor/investments",
        icon:"bi bi-piggy-bank",
        name: "Investments"
      },
      {
        url: "/investor/interest",
        icon:"bi bi-postcard-heart",
        name: "Indicated Interest"
      },
      {
        url: "/investor/transactions",
        icon:"bi bi-cash-coin",
        name: "Transaction History"
      },
      {
        url: "/investor/auto-investment",
        icon:"bi bi-bar-chart-steps",
        name: "Auto Investment"
      },
      {
        url: "/investor/aggrements",
        icon:"bi bi-file-earmark-check",
        name: "Aggrements"
      },
      {
        url: "/investor/notifications",
        icon:"bi bi-bell",
        name: "Notifications"
      },
      
    ]
  } 
  const [menuitems,setmenuitems] = useState(sbItems);
 
  const location = useLocation();

  useEffect(() => {

   },[location]);
   

  return(
    <>
      <div className={sidebarStyles['iconsDiv']}>
        {
          menuitems.menuitems.map((e)=>{

            return (e.url == "/investor")?
              <li key={e.name} className={ ( window.location.href.replace(window.location.host,"").replace("http://","").replace("https://","")== e.url) ? sidebarStyles['iconsListActive'] : sidebarStyles['iconsList']}><Link className={sidebarStyles['menuItemLink']} to={e.url}> <i className={e.icon}></i><span>{e.name}</span> </Link></li>
            :
              <li key={e.name} className={ (window.location.href.indexOf(e.url) != -1) ? sidebarStyles['iconsListActive'] : sidebarStyles['iconsList']}><Link className={sidebarStyles['menuItemLink']} to={e.url}> <i className={e.icon}></i><span>{e.name}</span> </Link></li>    
          })
        }
      </div>
    
    </>
  )
    
  
}
