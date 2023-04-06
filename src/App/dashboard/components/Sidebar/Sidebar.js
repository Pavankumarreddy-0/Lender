import sidebarStyles from './sidebar.module.css';
import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const sbItems ={
    menuitems:[
      {
        url: "/dashboard",
        icon:"bi bi-speedometer2",
        name: "Dashboard"
      },
      {
        url: "/dashboard/platform",
        icon:"bi bi-columns",
        name: "Platform"
      },
      {
        url: "/dashboard/crowdfunding",
        icon:"bi bi-stack",
        name: "Crowd funding"
      },
      {
        url: "/dashboard/community",
        icon:"bi bi-people",
        name: "Community"
      },
      {
        url: "/dashboard/everything",
        icon:"bi bi-cpu-fill",
        name: "Everything"
      },
      {
        url: "/dashboard/investments",
        icon:"bi bi-columns-gap",
        name: "Investments"
      },
      {
        url: "/dashboard/everything",
        icon:"bi bi-cpu-fill",
        name: "Everything"
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

            return (e.url == "/dashboard")?
            <>

                 <li className={ ( window.location.href.replace(window.location.host,"").replace("http://","").replace("https://","")== e.url) ? sidebarStyles['iconsListActive'] : sidebarStyles['iconsList']}><Link className={sidebarStyles['menuItemLink']} to={e.url}> <i className={e.icon}></i><span>{e.name}</span> </Link></li>
            </>
            :
            <>
                 <li className={ (window.location.href.indexOf(e.url) != -1) ? sidebarStyles['iconsListActive'] : sidebarStyles['iconsList']}><Link className={sidebarStyles['menuItemLink']} to={e.url}> <i className={e.icon}></i><span>{e.name}</span> </Link></li>
            </>

            
              
          })
        }
      </div>
    
    </>
  )
    
  
}
