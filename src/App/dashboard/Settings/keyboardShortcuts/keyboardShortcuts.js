import React, { useContext } from "react";
import keyStyle from "./keyboardShortcuts.module.css";
import { webAppContext } from "../../../contexts/contexts";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { set, get } from "lodash"
import { useEffect } from "react";
import { useHotkeys } from 'react-hotkeys-hook';
import axios from 'axios';

export default function KeyboardShortcuts() {

  const { __webAppSettings, __updateWebAppSettings } = useContext(webAppContext);
  const navigate = useNavigate();


  const [keyboardSetting, setKeyboardSetting] = useState({
    editMode: false,
    savingMode: false,
    pressedKeys: [],
    shortcuts: [
      {
        keyName: "Navigate to Dashboard",
        keyProp: "dashboardPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Community Page",
        keyProp: "communityPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Platform Page",
        keyProp: "platformPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Crowd Funding Page",
        keyProp: "crowdFundingPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Everything Page",
        keyProp: "everythingPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Investment Page",
        keyProp: "investmentPage",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Settings",
        keyProp: "settingsPage",
        keyDesc: ""
      },
      {
        keyName: "Show Table Filters",
        keyProp: "filterShowAction",
        keyDesc: ""
      },
      {
        keyName: "Table Column Visibility Panel",
        keyProp: "columnShowAction",
        keyDesc: ""
      },
      {
        keyName: "Create New",
        keyProp: "createNewObj",
        keyDesc: ""
      },
      {
        keyName: "Navigate to Parent Page",
        keyProp: "backButton",
        keyDesc: ""
      },
      {
        keyName: "Toggle Sidebar Menu",
        keyProp: "showenlargedmenu",
        keyDesc: ""
      },
      {
        keyName: "Open Search Panel",
        keyProp: "searchWebApp",
        keyDesc: ""
      },
      {
        keyName: "Save",
        keyProp: "saveSettings",
        keyDesc: ""
      },
      {
        keyName: "Edit/Modify",
        keyProp: "editSettings",
        keyDesc: ""
      },
      {
        keyName: "Cancel",
        keyProp: "cancelSettings",
        keyDesc: ""
      }
    ],
    modKeys: {
      ...__webAppSettings.keyboardShortcuts
    }
  })

  const updateGlobalKeyShortcuts = async () => {

    setKeyboardSetting({ ...keyboardSetting, savingMode: true })

    if (keyboardSetting.savingMode) {
      alert("Please wait.. the update request is already being sent..")
      return;
    }

    await axios.put('/api/save-keyboard-shortcut/', { keyboardShortcuts: { ...__webAppSettings.keyboardShortcuts, ...keyboardSetting.modKeys } }, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(response => {
      
      const result = response.data;
      __updateWebAppSettings({ ...__webAppSettings, keyboardShortcuts: result.keyboardShortcuts })
      setKeyboardSetting({ ...keyboardSetting, modKeys: result.keyboardShortcuts, editMode: false, savingMode: false })
    }).catch(error => {
      alert("Unable to save the shortcuts, please try again.")
      console.log(error, 'error')
      setKeyboardSetting({ ...keyboardSetting, editMode: true, savingMode: false })
    })

  }

  const generateKeyCombination = (e) => {
    e.preventDefault();
    let propKey = e.target.getAttribute("data-propkey");
    let combination = (e.ctrlKey ? "Control +" : "") +
      (e.shiftKey ? "Shift +" : "") +
      (e.altKey ? "Alt +" : "") +
      (e.metaKey ? "Meta +" : "");

    if (e.keyCode == 16 || e.keyCode == 17 || e.keyCode == 18 || e.keyCode == 91 || e.keyCode == 8) {
      return
    }
    if (combination.length < 1) {
      return;
    }
    let _upPath = "modKeys." + propKey;
    let newKeySetState = set({ ...keyboardSetting }, _upPath, combination + e.key)
    console.log(newKeySetState);
    setKeyboardSetting(newKeySetState);
  }

  useEffect(() => {
    setKeyboardSetting({ ...keyboardSetting, modKeys: { ...__webAppSettings.keyboardShortcuts }, editMode: false })
  }, [__webAppSettings.keyboardShortcuts])


  //hotkeys
  useHotkeys(__webAppSettings.keyboardShortcuts.saveSettings, (event) => {
    event.preventDefault();
    updateGlobalKeyShortcuts();
  })

  useHotkeys(__webAppSettings.keyboardShortcuts.editSettings, (event) => {
    console.log(event);
    event.preventDefault();
    setKeyboardSetting({ ...keyboardSetting, editMode: true, modKeys: { ...__webAppSettings.keyboardShortcuts } })
  })

  useHotkeys(__webAppSettings.keyboardShortcuts.cancelSettings, (event) => {
    event.preventDefault();
    setKeyboardSetting({ ...keyboardSetting, editMode: false, modKeys: { ...__webAppSettings.keyboardShortcuts } })
  })

  useHotkeys(__webAppSettings.keyboardShortcuts.backButton, (event) => {
    event.preventDefault();
    navigate('/dashboard/settings');
  })


  return (
    <div className={keyStyle["keyboardModuleWrap"]}>
      <div className={keyStyle["keyboardHeaderContainer"]}>
        <div className={keyStyle["keyboardTitleRegion"]}>
          <Link className={keyStyle["keyboardBackLink"]} to="/dashboard/settings">
            <i className="bi bi-arrow-left"></i> Settings
          </Link>
          <p className={keyStyle["keyboardTitleName"]}>Keyboard Shortcuts</p>
        </div>
        <div className={keyStyle['keyboardManageHeader']}>
          {(!keyboardSetting.editMode) && <a href="javascript:void(0)" className={keyStyle['editKeyshortcutButton']} onClick={() => { setKeyboardSetting({ ...keyboardSetting, editMode: true }) }}><i className="bi bi-pencil"></i>Edit</a>}
          {(keyboardSetting.editMode) && <a href="javascript:void(0)" className={keyStyle['editKeyshortcutButton']} onClick={() => { updateGlobalKeyShortcuts() }}>
            {(keyboardSetting.savingMode) ? <><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Saving..</> : <><i className="bi bi-save"></i>Save</>}
          </a>}
          {(keyboardSetting.editMode && !keyboardSetting.savingMode) && <a href="javascript:void(0)" className={keyStyle['editKeyshortcutButton']} onClick={() => { setKeyboardSetting({ ...keyboardSetting, editMode: false, modKeys: { ...__webAppSettings.keyboardShortcuts } }) }}><i className="bi bi-x-square"></i>Cancel</a>}
        </div>
      </div>
      <div className={keyStyle["keyboardBodyContainer"]}>
        <div className={keyStyle["keyboardBodyContainerInner"]}>
          {keyboardSetting.shortcuts.map((e, i) => {

            return <div key={e.keyName} className={keyStyle["keyboardShortcut"]}>
              <div className={keyStyle["keyboardShortcutInner"]}>
                <div className={keyStyle["keyboardShortcutText"]}>{e.keyName} </div>
                <div className={keyStyle["keyboardShortcutkey"]}>
                  {
                    (!keyboardSetting.editMode) ?
                      <div className={keyStyle["keyboardShortcutkeyGroup"]}>
                        {
                          __webAppSettings.keyboardShortcuts[e.keyProp].split("+").map((k, i, ar) => {
                            return <><kbd>{k}</kbd>{(i < ar.length - 1) && " + "}</>
                          })
                        }
                      </div>
                      :
                      <input className={keyStyle["keyboardShortcutkeyInput"]} type="text"
                        onKeyDown={(e) => { generateKeyCombination(e) }}
                        //  onChange={(e) => { updateShortcut(e) }} 
                        data-propkey={e.keyProp}
                        value={keyboardSetting.modKeys[e.keyProp]}
                      ></input>
                  }
                </div>
              </div>
            </div>
          })
          }
        </div>
      </div>
    </div>
  );
}
