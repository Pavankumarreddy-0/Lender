import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import SettingsStyles from './Settings.module.css'
import { Link } from 'react-router-dom'


export default function Settings() {
  const Settingstate = {
    cards: [
      {
        cardName: "Roles & Permissions",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-briefcase",
        cardLink: "/dashboard/settings/roles"
      },
      {
        cardName: "Admin Accounts",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-people",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Database Security",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-database-lock",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Search Engine Optimization",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-google",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Themes",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-palette",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Comments",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-chat-square-heart",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Keyboard Shortcuts",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-keyboard",
        cardLink: "/dashboard/settings/keyboard-shortcuts"
      },
      {
        cardName: "API",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-code-square",
        cardLink: "/dashboard/setting/roles"
      },
      {
        cardName: "Webapp Menu",
        cardDesc: "create, edit new role",
        cardIcon: "bi bi-card-checklist",
        cardLink: "/dashboard/setting/roles"
      }
    ],
    inputSearch: ""
  }
  const [Tiles, SetTiles] = useState(Settingstate);

  useEffect(() => {

  }, [Tiles.inputField])

  function getTiles(cards, inputField) {
    if (inputField.length === 0) {
      return cards;
    }
    return cards.filter((a) => {
      return (a.cardName.toLowerCase().indexOf(inputField.toLowerCase()) !== -1) ? true : false
    })
  }
  return (
    <>
      <div className='settingsContainer'>
        <div className={SettingsStyles['settingsHeaderContainer']}>
          <div className={SettingsStyles['settingsTitleRegion']}>
            <Link className={SettingsStyles['settingsBackLink']} to="/dashboard"><i className="bi bi-arrow-left"></i> Home</Link>
            <p className={SettingsStyles['settingsTitleName']}>Settings</p>
          </div>
          <div className={SettingsStyles['searchHeader']}>
            <div className={SettingsStyles['searchHeaderInner']}>
              <i className="bi bi-search"></i>
              <input onChange={(e) => { SetTiles({ ...Tiles, inputSearch: e.target.value }) }} type="search" id="SettingsSearch" placeholder='Search Settings Options' />
            </div>
          </div>
        </div>
        <section className={SettingsStyles["settings_Cards"]}>
          <div className={SettingsStyles['roles_grids']}>
            {getTiles(Tiles.cards, Tiles.inputSearch).map((e) => {
              return <>
                <Link to={e.cardLink} className={SettingsStyles['settingRolesLink']}>
                  <div className={SettingsStyles['settings']}>
                    <div className={SettingsStyles['settingsIcon']}>
                      <i className={e.cardIcon} aria-hidden="true"></i>
                    </div>
                    <div className={SettingsStyles['settingContent']}>
                      <div className={SettingsStyles['settingsTitle']}>{e.cardName}</div>
                      <div className={SettingsStyles['settingsDescription']}>{e.cardDesc}</div>
                    </div>
                  </div>
                </Link>
              </>
            })}
          </div>
        </section>
      </div>
      <Outlet></Outlet>
    </>
  )
}


