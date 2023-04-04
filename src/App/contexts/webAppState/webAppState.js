import { useState } from "react";
import { webAppContext } from "../contexts";

const WebAppState = (props) => {
    const InitialWebAppState = {
        enlargedMenu: false
    }

    const [__webAppSettings, __updateWebAppSettings] = useState(InitialWebAppState);

    return (
        <webAppContext.Provider value={{ __webAppSettings, __updateWebAppSettings }}>
            {props.children}
        </webAppContext.Provider>
    )
}


export default WebAppState;