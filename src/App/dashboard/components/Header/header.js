import React, {useContext} from 'react'
import headerStyles from './headerStyle.module.css';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import { webAppContext } from '../../../contexts/contexts';


export default function Header() {

  const navigate = useNavigate();
  const {__webAppSettings, __updateWebAppSettings} = useContext(webAppContext);

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
    <>
    <SideDrawer webAppSettings={__webAppSettings} setWebSettings={__updateWebAppSettings}/> 
    <div className={headerStyles['headerOuter']}>
        <div onClick={()=>__updateWebAppSettings({...__webAppSettings, enlargedMenu: true})} className={headerStyles['headerToggleMenu']}>
          <i className="bi bi-grid-3x3-gap-fill"></i>
        </d  iv>
        <div className={headerStyles['headerIconRegion']}>
           <img className={headerStyles['headerLogoImage']} src='/assets/logo.gif'/>
        </div>
        <div className={headerStyles['headerSerachRegion']}>
          <div className={headerStyles['headerSearchRegionInner']}>
            <i className="bi bi-search"></i>
            <input className={headerStyles['headerSerachRegionInput']} type='text' value={headerData.headerSearchText} onChange={(e)=>{ setHeaderData({...headerData, headerSearchText: e.target.value}) }}></input>
          </div>
        </div>
        <div className={headerStyles['headerRightRegion']}>
          <ul className={headerStyles['headerRightIconsList']}>
            <li className={headerStyles['headerRightIconsItem']}>
              <Link to="/dashboard/settings">
                <i className="bi bi-gear"></i>
              </Link>
            </li>
            <li className={headerStyles['headerRightIconsItem']}>
              <Link to="/dashboard/faq">
                <i className="bi bi-question"></i>
              </Link>
            </li>
            <li className={headerStyles['headerRightProfileItem']}>
              <a href='javascript:void(0)' onClick={()=> setHeaderData({...headerData, profileDetailsMenu: !headerData.profileDetailsMenu}) }>
                <img className={headerStyles['headerRightUserImage']} src="/assets/img/user.png"></img>
              </a>
              {(headerData.profileDetailsMenu) ? <ul className={headerStyles['headerRightSubList']}>
                <div className={headerStyles['headerSubProfileSection']} >
                  
                    <div className={headerStyles['headerSubProfileSectionBody']}>
                      <div className={headerStyles['headerSubProfileImage']}>
                        <img className={headerStyles['headerSubProfileImageLarge']} src="/assets/img/user.png"></img>
                      </div>
                      <div className={headerStyles['headerSubProfileListRight']}>
                        <div className={headerStyles['headerSubProfileMeta']}>
                            <p className={headerStyles['headerSubProfileMetaName']}>Abhishek</p>
                        </div>
                        <div className={headerStyles['headerRightProfileSubItem']}>
                          <Link  className={headerStyles['headerRightProfileManageLink']} to="/dashboard/settings/profile">Manage Profile</Link>
                        </div>
                        <div className={headerStyles['headerRightProfileSubItem']}>
                          <a onClick={()=>logoutUser()}  className={headerStyles['headerRightProfileManageLink']} >Logout</a>
                        </div>
                      </div>
                    </div>
                </div>
              </ul> : ""}
            </li>
          </ul>
        </div>
    </div>
    </>
  )
}
