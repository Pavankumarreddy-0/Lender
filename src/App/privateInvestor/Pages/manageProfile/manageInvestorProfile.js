import React, { useState, useContext } from 'react'
import mfStyle from './manageProfile.module.css'
import { Link } from 'react-router-dom'
import { webAppContext } from '../../../contexts/contexts'
import { useEffect } from 'react';
import axios from 'axios';
export default function ManageInvestorProfile() {

    const {__webAppSettings, __updateWebAppSettings} = useContext(webAppContext);

    const [ profileData, setProfileData ] = useState({
        savingTheme: false,
        savingProfile: false,
        editProfile: false,
        savingPassword: false,
        showMode: "profile",
        personalData:{
           ...__webAppSettings.userProfile
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
        passwordChange: {
            oldPass: "",
            newPass: "",
            confNewPass: ""
        },
        sections: [
            {
                name: "Personal Profile",
                icon: "bi bi-person-bounding-box",
                showMode: "profile"
            },
            {
                name: "Themes",
                icon: "bi bi-palette2",
                showMode: "theme"
            },
            {
                name: "Change Password",
                icon: "bi bi-key-fill",
                showMode: "change-password"
            }
        ],
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

        await axios.put('/api/update-investor-settings/', { userSettings: {theme : { ...__webAppSettings.activeTheme }} }, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
          }).then(response => {
            setProfileData({...profileData, savingTheme: false});

          }).catch(error => {
            alert("Unable to save the shortcuts, please try again.")
            console.log(error, 'error')
            setProfileData({...profileData, savingTheme: false});
          })

    }

    const saveProfile = async () => {
        if(profileData.savingProfile){
            alert("Saving is already in progress, please wait..")
            return;
        }

        let usernameRegex = /^[a-zA-Z0-9]{6,12}$/;

        if(!usernameRegex.test(profileData.personalData.username)){
            alert("Username should be at least 6 characters and should not contain any special characters.");
            return;
        }

        let phoneregex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if(!phoneregex.test(profileData.personalData.phoneNumber)){
            alert("Please provide a proper phone number");
            return;
        }

        setProfileData({...profileData, savingProfile: true});

        await axios.put('/api/update-user-settings/', { userSettings: { ...profileData.personalData } }, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
          }).then(response => {
            setProfileData({...profileData, savingProfile: false, editProfile: false});
            __updateWebAppSettings({...__webAppSettings, userProfile: {  ...__webAppSettings.userProfile, ...profileData.personalData }});

          }).catch(error => {
            alert("Unable to save the shortcuts, please try again.")
            console.log(error, 'error')
            setProfileData({...profileData, savingProfile: false, editProfile: true});

          })
    }

    const changeTab = (e) =>{
        let showSec = e.target.getAttribute("data-showpanel");
        setProfileData({...profileData, showMode: showSec});
    }

    const updatePassword = async () => {

        if(profileData.savingPassword){
            alert("Updating request is already in progress please wait..")
            return;
        }

        if(profileData.passwordChange.oldPass == profileData.passwordChange.newPass){
            alert("New password can not be same as old password.")
        }

        let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(!passRegex.test(profileData.passwordChange.newPass)){
            alert("Password should be at least 8 characters long, should contain a number and a special character.")
            return;
        }
        if(profileData.passwordChange.newPass != profileData.passwordChange.confNewPass){
            alert("New Passwords do not match.");
            return;
        }
        //update the passwords

        setProfileData({...profileData, savingPassword: true});

        await axios.put('/api/investor-update-password/', {  ...profileData.passwordChange }, {
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(response => {
            setProfileData({...profileData, savingPassword: false, passwordChange: {oldPass: "", newPass: "", confNewPass: "" }});

        }).catch(error => {
            alert("Unable to update the password, please try again.")
            console.log(error, 'error')
            setProfileData({...profileData, savingPassword: false});

        })
    }

    const resetProfileValues = () => {
        setProfileData({...profileData, personalData: {...profileData.personalData, ...__webAppSettings.userProfile}, savingProfile: false, editProfile: false})
    }
 
    useEffect(()=>{
        setProfileData({...profileData, personalData: {...profileData.personalData, ...__webAppSettings.userProfile}})
    },[__webAppSettings.userProfile])

    useEffect(()=>{
        setProfileData({...profileData, personalData: {...profileData.personalData, ...__webAppSettings.userProfile}})
    },[])

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
        <div className={mfStyle["manageProfileSidebar"]}>
            <div className={mfStyle["manageProfileSidebarInner"]}>
                {
                    profileData.sections.map(e=>{
                        return <a onClick={changeTab} className={ (e.showMode != profileData.showMode) ? mfStyle["panelLinks"] :  mfStyle["panelLinksActive"]} data-showpanel={e.showMode} key={e.name}>
                                <i className={e.icon} data-showpanel={e.showMode}></i>{e.name}
                            </a>      
                    })
                }
            </div>
        </div>
        <div className={mfStyle["manageProfilePersonal"]}>
            <div className={mfStyle["manageProfilePersonalInner"]}>  
                {(profileData.showMode == "profile") && <>
                <h3  className={mfStyle["manageProfileSubTitle"]}>Personal Info</h3>
                <div className={mfStyle["manageProfilePersonalInfo"]}>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfUsername" className={mfStyle["formLabel"]}>Username</label>
                            <input type="text" 
                                value={profileData.personalData.username} 
                                required 
                                readOnly={ (!profileData.editProfile) ? "readonly" : "" }
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
                            <label for="mfEmail" className={mfStyle["formLabel"]}>Email</label>
                            <input type="text" 
                                value={profileData.personalData.email} 
                                required 
                                disabled
                                className={mfStyle["formInput"]} id="mfEmail" />
                            <div class="invalid-feedback">
                                Please provide a valid email
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfPhone" className={mfStyle["formLabel"]}>Phone Number</label>
                            <input type="text" 
                                value={profileData.personalData.phoneNumber} 
                                required 
                                readOnly={ (!profileData.editProfile) ? "readonly" : "" }
                                onChange={(e) => setProfileData({ ...profileData, personalData: { ...profileData.personalData, phoneNumber: e.target.value } })} 
                                className={mfStyle["formInput"]} id="mfPhone" />
                            <div class="invalid-feedback">
                                Please provide a valid email
                            </div>
                        </div>
                        <div className='col-md-12'>

                            {(!profileData.editProfile) && <a href='javascript:void(0)' className={mfStyle["manageProfileSaveThemeButton"]} onClick={()=>{ setProfileData({...profileData, editProfile: true}) } }><i class="bi bi-pencil-square"></i> Edit Profile</a>}
                            {(profileData.editProfile) && <a href='javascript:void(0)' className={mfStyle["manageProfileSaveThemeButton"]} onClick={saveProfile}>
                                
                                { (profileData.savingProfile ) ? <><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...</>: <><i class="bi bi-save"></i> Update Profile</>}
                            </a>}
                            {
                              (profileData.editProfile && !profileData.savingProfile) &&   
                                <a href='javascript:void(0)' className={mfStyle["manageProfileSaveThemeButton"]} onClick={resetProfileValues}><i class="bi bi-x-square-fill"></i> Cancel</a>
                            }
                        </div>
                        </div>
                    </div>
                </div>
                </>}
                {(profileData.showMode == "theme") && <div className={mfStyle["manageProfilePersonalTheme"]}>
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
                </div>}
                {
                    (profileData.showMode == "change-password") &&  <div className={mfStyle["manageProfileChangePassword"]}>
                        <h3  className={mfStyle["manageProfileSubTitle"]}>Change Password</h3>
                <div className={mfStyle["manageProfilePersonalInfo"]}>
                    <div className='row'>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfOldPass" className={mfStyle["formLabel"]}>Old Password</label>
                            <input type="password" 
                                value={profileData.passwordChange.oldPass} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, passwordChange: { ...profileData.passwordChange, oldPass: e.target.value } })}  
                                className={mfStyle["formInput"]} id="mfOldPass" />
                          
                        </div>
                        </div>
                        
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfNewPass" className={mfStyle["formLabel"]}>New Password</label>
                            <input type="password" 
                                value={profileData.passwordChange.newPass} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, passwordChange: { ...profileData.passwordChange, newPass: e.target.value } })}  
                                className={mfStyle["formInput"]} id="mfNewPass" />
                            
                        </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                            <div className={mfStyle["manageProfileInputGroup"]}>
                            <label for="mfCNewPass" className={mfStyle["formLabel"]}>Confirm New Password</label>
                            <input type="password" 
                                value={profileData.passwordChange.confNewPass} 
                                required 
                                onChange={(e) => setProfileData({ ...profileData, passwordChange: { ...profileData.passwordChange, confNewPass: e.target.value } })} 
                                className={mfStyle["formInput"]} id="mfCNewPass" />
                           
                        </div>
                        <div className='col-md-12'>

                            <a href='javascript:void(0)' className={mfStyle["manageProfileSaveThemeButton"]} onClick={updatePassword}>
                                { (profileData.savingPassword ) ? <><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...</>: <><i class="bi bi-save"></i> Update Password</>}
                            </a>
                            
                        </div>
                        </div>
                    </div>
                </div>
                    </div>
                }
            </div>
        </div>
      </div>
    </div>
  )
}
