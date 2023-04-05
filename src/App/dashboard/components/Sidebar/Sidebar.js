import sidebarStyles from './sidebar.module.css';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const sbItems ={
    menuitems:[
      {
        url: "/dashboard",
        icon:"bi bi-house",
        name: "Home"
      },
      {
        url: "/dashboard",
        icon:"bi bi-columns",
        name: "Platform"
      },
      {
        url: "/dashboard",
        icon:"bi bi-stack",
        name: "Crowdfunding"
      },
      {
        url: "/dashboard",
        icon:"bi bi-people",
        name: "Community"
      },
      {
        url: "/dashboard",
        icon:"bi bi-cpu-fill",
        name: "Everything"
      },
      {
        url: "/dashboard",
        icon:"bi bi-columns-gap",
        name: "Investments"
      },
      {
        url: "/dashboard",
        icon:"bi bi-cpu-fill",
        name: "Everything"
      },
      
    ]
  }
  const [menuitems,setmenuitems] = useState(sbItems);
 


  return(
    <>
      <div className={sidebarStyles['iconsDiv']}>
        {
          menuitems.menuitems.map((e)=>{
            return  <li className={sidebarStyles['iconsList']}> <i className={e.icon}></i><span>{e.name}</span> </li>
          })
        }
      </div>
    
    </>
  )
    
  
}
