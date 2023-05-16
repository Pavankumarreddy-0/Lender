import { useState } from "react";
import { webAppContext } from "../contexts";



const WebAppState = (props) => {
    const InitialWebAppState = {
        enlargedMenu: false,
        searchMode: false,
        activeTheme: {
            themeName: "classic",
            themeType: "colorTheme",
            themeColor: "#f0f0f0",
            textColor: "#212529",
            logoMode: "dark"
        },
        userProfile: {
            email: "",
            username: "", 
            phoneNumber: "",
            firstName: ""
        },
        keyboardShortcuts: {
            dashboardPage: "Control +Shift +D",
            communityPage: "Control +Shift +C",
            platformPage: "Control +Shift +P",
            crowdFundingPage: "Control +Shift +F",
            everythingPage: "Control +Shift +E",
            investmentPage: "Control +Shift +I",
            settingsPage: "Control +Shift +S",
            filterShowAction: "Control +Alt +f",
            columnShowAction: "Control +Alt +c",
            createNewObj: "Shift +N",
            backButton: "Shift +B",
            showenlargedmenu: "Control +m",
            searchWebApp: "Control +s",
            saveSettings: "Shift +S",
            editSettings: "Shift +E",
            cancelSettings: "Shift +W",
            pVIWallet: "Control +Shift +K",
            pVIInvestment: "Control +Shift +I",
            pVIIndInt: "Control +Shift +L",
            pVITrans: "Control +Shift +T",
            pVIAutoInv: "Control +Shift +A",
            pVIAgree: "Control +Shift +M",
            pVINoti: "Control +Shift +O",
            pVIInvst: "Shift +I"

        },
        pageAccess: {
            "Dashboard": true,
            "Platform": true,
            "CrowdFunding": true,
            "Community": true,
            "Everything": true,
            "Investment": true
        }
    }

    const [__webAppSettings, __updateWebAppSettings] = useState(InitialWebAppState);

    return (
        <webAppContext.Provider value={{ __webAppSettings, __updateWebAppSettings }}>
            {props.children}
        </webAppContext.Provider>
    )
}


export default WebAppState;