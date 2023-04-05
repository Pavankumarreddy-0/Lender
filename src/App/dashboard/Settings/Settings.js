import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router'
import SettingsStyles from './Settings.module.css'
import { Link } from 'react-router-dom'


export default function Settings() {
    const Settingstate = {
        cards: [
          {
            cardName: "Manage Roles",
            cardDesc: "create, edit new role",
            cardIcon: "fa fa-user-circle",
            cardLink: "/dashboard/settings/roles"
          },
          {
            cardName: "Manage Roles 2",
            cardDesc: "create, edit new role",
            cardIcon: "fa fa-user-circle",
            cardLink: "/dashboard/setting/roles"
          },
          {
            cardName: "Manage Roles 3",
            cardDesc: "create, edit new role",
            cardIcon: "fa fa-user-circle",
            cardLink: "/dashboard/setting/roles"
          },
          {
            cardName: "Manage Roles 4",
            cardDesc: "create, edit new role",
            cardIcon: "fa fa-user-circle",
            cardLink: "/dashboard/setting/roles"
          },
          {
            cardName: "Manage Roles 5",
            cardDesc: "create, edit new role",
            cardIcon: "fa fa-user-circle",
            cardLink: "/dashboard/setting/roles"
          }
        ],
        inputSearch: ""
      }
      const [Tiles,SetTiles] = useState(Settingstate);
      console.log(Tiles)
      useEffect(()=>{

      },[Tiles.inputField])
      function getTiles(cards,inputField){
        if(inputField.length === 0){
          return cards;
        }
          return cards.filter((a) =>{
            return (a.cardName.toLowerCase().indexOf(inputField.toLowerCase()) !== -1) ? true :  false
          })
      }
  return (
    <>
    <div className='settingsContainer'>
        <div className={SettingsStyles['settingsContainer']}>
          <div className={SettingsStyles['searchHeader']}>
            <input onChange={(e)=>{SetTiles({...Tiles, inputSearch: e.target.value})}} type="search" id="SettingsSearch" placeholder='Search Settings Options' />
          </div>
      </div>
      <section className={SettingsStyles["settings_Cards"]}>
        <div className={SettingsStyles['roles_grids']}>
          {getTiles(Tiles.cards, Tiles.inputSearch).map((e)=>{
            return   <div className={SettingsStyles['settings']}>
                <div className={SettingsStyles['settingsIcon']}>
                <i class={e.cardIcon}  aria-hidden="true"></i>
                </div>
                  <div className={SettingsStyles['settingContent']}>
                    <div className={SettingsStyles['settingsTitle']}>{e.cardName}</div>
                    <div className={SettingsStyles['settingsDescription']}>{e.cardDesc}</div>
                    {/* <Link to={e.cardLink} className={SettingsStyles['settingRolesLink']}>Go to Roles</Link> */}
                  </div>
              </div>
          })}
        </div>
      </section>
    </div>
      <Outlet></Outlet>
    </>
  )
}