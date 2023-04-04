import React from 'react'
import headerStyles from './headerStyle.module.css';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  const [headerData, setHeaderData] = useState({
    headerSearchText: "",
    headerMenuExpanded: true,
    profileDetailsMenu: false
  })

  const logoutUser = ()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className={headerStyles['headerOuter']}>
        <div className={headerStyles['headerToggleMenu']}>
          <i class="fa fa-th" aria-hidden="true"></i>
        </div>
        <div className={headerStyles['headerSerachRegion']}>
          <input type='text' value={headerData.headerSearchText} onChange={(e)=>{ setHeaderData({...headerData, headerSearchText: e.target.value}) }}></input>
        </div>
        <div className={headerStyles['headerRightRegion']}>
          <ul className={headerStyles['headerRightIconsList']}>
            <li className={headerStyles['headerRightIconsItem']}>
              <Link to="/dashboard/settings">
              <i class="fa fa-cog" aria-hidden="true"></i>
              </Link>
            </li>
            <li className={headerStyles['headerRightIconsItem']}>
              <Link to="/dashboard/faq">
                <i className="fa fa-question" aria-hidden="true"></i>
              </Link>
            </li>
            <li className={headerStyles['headerRightProfileItem']}>
              <a href='javascript:void(0)' onClick={()=> setHeaderData({...headerData, profileDetailsMenu: !headerData.profileDetailsMenu}) }>
                <img className={headerStyles['headerRightUserImage']} src="/assets/img/user.png"></img>
              </a>
              {(headerData.profileDetailsMenu) ? <ul className={headerStyles['headerRightSubList']}>
                <li className={headerStyles['headerRightProfileSubItem']}>
                  <Link to="/dashboard/settings/profile">Manage Profile</Link>
                </li>
                <li className={headerStyles['headerRightProfileSubItem']}>
                  <a onClick={()=>logoutUser()}>Logout</a>
                </li>
              </ul> : ""}
            </li>
          </ul>
        </div>
    </div>
  )
}
