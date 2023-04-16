import { useState } from "react";
import { webAppContext } from "../contexts";

const WebAppState = (props) => {
    const InitialWebAppState = {
        enlargedMenu: false,
        searchMode: false,
        keyboardShortcuts: {
            dashboardPage: "ctrl+shift+d",
            communityPage: "ctrl+shift+c",
            platformPage: "ctrl+shift+p",
            crowdFundingPage: "ctrl+shift+f",
            everythingPage: "ctrl+shift+e",
            investmentPage: "ctrl+shift+i",
            settingsPage: "ctrl+shift+s",
            filterShowAction: "ctrl+alt+f",
            columnShowAction: "ctrl+alt+c",
            createNewObj: "shift+n",
            backButton: "shift+b",
            showenlargedmenu: "ctrl+m",
            searchWebApp: "ctrl+s",
            saveSettings: "shift+s",
            editSettings: "shift+e",
            cancelSettings: "shift+w",
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