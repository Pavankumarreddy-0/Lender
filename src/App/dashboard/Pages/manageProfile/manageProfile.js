import React, { useState, useContext } from 'react'
import mfStyle from './manageProfile.module.css'
import { Link } from 'react-router-dom'
import { webAppContext } from '../../../contexts/contexts'
import { useEffect } from 'react';
import axios from 'axios';
export default function ManageProfile() {

    const {__webAppSettings, __updateWebAppSettings} = useContext(webAppContext);

    const [ profileData, setProfileData ] = useState({
        savingTheme: false,
        personalData:{
            username: "",
            email: ""
        },
        nonModifiedData: {
            username: "",
            email: ""
        },
        themes: [
            {
                themeName: "classic",
                themeType: "colorTheme",
                themeColor: "#f0f0f0",
                textColor: "#212529",
                logoMode: "dark"
            },    
            {
                themeName: "NavyBlue",
                themeType: "colorTheme",
                themeColor: "#004B8B",
                textColor: "#fff",
                logoMode: "light"
            },              
            {
                themeName: "Black",
                themeType: "colorTheme",
                themeColor: "#212121",
                textColor: "#fff",
                logoMode: "light"
            },      
            {
                themeName: "whimsical",
                themeType: "imageTheme",
                themeImg: "/assets/themes/whimsical.gif",
                accentBg: "rgba(49,127,168,.6)",
                textColor: "#fff",
                logoMode: "light"
            },
            {
                themeName: "Rainbow",
                themeType: "imageTheme",
                themeImg: "/assets/themes/rainbow.png",
                accentBg: "rgba(220,224,232,0.4)",
                textColor: "#212529",
                logoMode: "dark"
            },
            {
                themeName: "Ribbon",
                themeType: "imageTheme",
                themeImg: "/assets/themes/ribbon.png",
                accentBg: "rgba(220,224,232,0.4)",
                textColor: "#212529",
                logoMode: "dark"
            },
            {
                themeName: "Mountain",
                themeType: "imageTheme",
                themeImg: "/assets/themes/mountain.jpg",
                accentBg: "rgba(74,156,200,.6)",
                textColor: "#fff",
                logoMode: "light"
            },
            {
                themeName: "Blueprint",
                themeType: "imageTheme",
                themeImg: "/assets/themes/blueprint.jpg",
                accentBg: "rgba(58,104,171,.6)",
                textColor: "#fff",
                logoMode: "light"
            },
            {
                themeName: "Angualr",
                themeType: "imageTheme",
                themeImg: "/assets/themes/angular.png",
                accentBg: "rgba(2,71,83,.8)",
                textColor: "#fff",
                logoMode: "light"
            },  
            {
                themeName: "Geometric",
                themeType: "imageTheme",
                themeImg: "/assets/themes/simple.png",
                accentBg: "rgba(123,200,130,.6)",
                textColor: "#212529",
                logoMode: "dark"
            },  
            {
                themeName: "Polygons",
                themeType: "imageTheme",
                themeImg: "/assets/themes/spectrum.png",
                accentBg: "rgba(221,115,125,.9)",
                textColor: "#fff",
                logoMode: "light"
            },  
            {
                themeName: "Stars",
                themeType: "imageTheme",
                themeImg: "/assets/themes/stars.jpg",
                accentBg: "rgba(0,0,0,.1)",
                textColor: "#fff",
                logoMode: "light"
            },  
            {
                themeName: "Canyon",
                themeType: "imageTheme",
                themeImg: "/assets/themes/canyon.jpg",
                accentBg: "rgba(0,0,0,.1)",
                textColor: "#fff",
                logoMode: "light"
            },  
            {
                themeName: "Ship",
                themeType: "imageTheme",
                themeImg: "/assets/themes/ship.jpg",
                accentBg: "rgba(0,0,0,.1)",
                textColor: "#fff",
                logoMode: "light"
            },  
            {
                themeName: "road",
                themeType: "imageTheme",
                themeImg: "/assets/themes/road.jpg",
                accentBg: "rgba(0,0,0,.2)",
                textColor: "#fff",
                logoMode: "light"
            },  
        ],
        oldTheme: {
            ...__webAppSettings.activeTheme
        },
        activeThemeName: __webAppSettings.activeTheme.themeName
    })

    const activateNewTheme = (e) => {
        let themeData = decodeURIComponent(e.target.getAttribute("data-themedata"));
        themeData = JSON.parse(themeData);
        console.log(themeData)
        __updateWebAppSettings({...__webAppSettings, activeTheme: themeData});
        setProfileData({...profileData, activeThemeName: themeData.themeName})
    }

    const saveTheme = async () => {

        if(profileData.savingTheme){
            alert("Saving is already in progress, please wait..")
            return;
        }

        setProfileData({...profileData, savingTheme: true});

        await axios.put('/api/update-user-settings/', { userSettings: {theme : { ...__webAppSettings.activeTheme }} }, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
          }).then(response => {
            setProfileData({...profileData, savingTheme: false});

          }).catch(error => {
            alert("Unable to save the shortcuts, please try again.")
            console.log(error, 'error')
          })

    }

  return (
    <div className={mfStyle["managaProfile_module"]}>
      <div className={mfStyle["managaProfileHeaderContainer"]}>
        <div className={mfStyle["managaProfileHeaderContainerRegion"]}>
          <Link
            className={mfStyle["managaProfileHeaderContainerLink"]}
            to="/dashboard/"
          >
            <i className="bi bi-arrow-left"></i> Dashboard
          </Link>
          <p className={mfStyle["managaProfileHeaderContainerName"]}>
            Manage Profile
          </p>
        </div>
      </div>
      <div className={mfStyle["managaProfileBody"]}>
        <div className={mfStyle["manageProfilePersonal"]}>
            <div className={mfStyle["manageProfilePersonalInner"]}>  
                <h3  className={mfStyle["manageProfileSubTitle"]}>Personal Info</h3>
                <div className={mfStyle["manageProfilePersonalInfo"]}>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfUsername" className={mfStyle["formLabel"]}>Username</label>
                            <input type="text" 
                                value={profileData.personalData.username} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, personalData: { ...profileData.personalData, username: e.target.value } })} 
                                pattern="[A-Za-z]{1,32}" 
                                className={mfStyle["formInput"]} id="mfUsername" />
                            <div class="invalid-feedback">
                                Please provide a user name without any spaces.
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfUsername" className={mfStyle["formLabel"]}>Email</label>
                            <input type="text" 
                                value={profileData.personalData.email} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, personalData: { ...profileData.personalData, email: e.target.value } })} 
                                className={mfStyle["formInput"]} id="mfUsername" />
                            <div class="invalid-feedback">
                                Please provide a valid email
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfUsername" className={mfStyle["formLabel"]}>Phone Number</label>
                            <input type="text" 
                                value={profileData.personalData.phoneNumber} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, personalData: { ...profileData.personalData, phoneNumber: e.target.value } })} 
                                className={mfStyle["formInput"]} id="mfUsername" />
                            <div class="invalid-feedback">
                                Please provide a valid email
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={mfStyle["manageProfilePersonalTheme"]}>
                    <h3  className={mfStyle["manageProfileSubTitle"]}>Theme</h3>
                    <div className={mfStyle["manageProfileThemeSection"]}>
                        <div className={mfStyle["manageProfileThemeItem"]}>
                            {
                                profileData.themes.map((e)=>{
                                    return <a 
                                    data-themedata={ encodeURIComponent(JSON.stringify(e)) }
                                    className={ (e.themeName != profileData.activeThemeName) ? mfStyle["manageProfileThemeIcon"] : mfStyle["manageProfileThemeIconSelected"]}
                                    style={ (e.themeType == "imageTheme") ? { background: `url(${  e.themeImg })`} : { background: `${  e.themeColor }`}  }
                                    onClick={activateNewTheme}
                                    >
                                     {(e.themeName == profileData.activeThemeName) && <i class="bi bi-check"></i> } 
                                    </a>
                                })
                            }
                        </div>
                        <div className={mfStyle["manageProfileSaveTheme"]}>
                            <a href='javascript:void(0)' className={mfStyle["manageProfileSaveThemeButton"]} onClick={saveTheme}>
                                
                                { (profileData.savingTheme) ? <><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...</>: <><i class="bi bi-save"></i> Save Theme</>}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={mfStyle["manageProfileSidebar"]}>
            <div className={mfStyle["manageProfileSidebarInner"]}>
            sidebar
            </div>
        </div>
      </div>
    </div>
  )
}
