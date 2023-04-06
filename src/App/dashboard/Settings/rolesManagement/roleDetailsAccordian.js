import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { set, get, isEqual } from "lodash";
import accordianStyles from './accordianStyles.module.css'
import axios from 'axios';
import RoleDetailsAccordianStyle from './roleDetailsAccordian.module.css'

export default function RoleDetailsAccordian(props) {

    //creating a new memory instance
    const [originalPropState,setNewPropState] = useState(JSON.parse(JSON.stringify(props.roledata))); 

    const [permissions, setPermissions] = useState(props.roledata);
    const [saveState, setSaveState] = useState({
        enableSave: false,
        savingProgress: false,
        errors: []
    })

    const generateAccess = (roles) => {
        let items = [];
        for(let role in roles){
            items.push([role, roles[role]])
        }

        return items
    }

    // useEffect(()=>{

    // },[permissions])

    const saveUpdatedData = async () => {

        setSaveState({...saveState, savingProgress: true, errors: []});

        if(saveState.savingProgress){
            alert("Please wait the request is already going on.")
            return;
        }

        // if()
        // setSaveState({...saveState,  errors: [...saveState.errors, "Please Select at least one option"]});

        await axios.put('/api/update-role',{
            ...permissions
        },{
            headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
        }).then(response=>{

            console.log(response)
            setSaveState({...saveState, savingProgress: false, enableSave: false});
            setNewPropState(JSON.parse(JSON.stringify({...permissions})));

        }).catch(err => {
            alert("Unable to save, please try again.");
            setSaveState({...saveState, savingProgress: false, enableSave: true, errors: [...saveState.errors, err.messgae]});

        })
    }


    const updatePermission = (e) =>{
        let ___prop =(e.target.getAttribute("data-privilage"));
        let formattingString = "roleAccess." + ___prop;
        let newPropState = set({...permissions}, formattingString,!get(permissions, formattingString));
        setPermissions(newPropState);
        console.log(isEqual(originalPropState,newPropState),originalPropState, newPropState);
        if(!isEqual(originalPropState.roleAccess,newPropState.roleAccess)){
            setSaveState({...saveState, enableSave: true})
        }else{
            setSaveState({...saveState, enableSave: false})
        }
    }

  return (
 
  <Accordion.Item className={RoleDetailsAccordianStyle["roleManagementAccordian"]} eventKey={props.roledata._id}>
  <Accordion.Header className={RoleDetailsAccordianStyle["roleManagementAccordianTitle"]}>{props.roledata.roleName}</Accordion.Header>
  <Accordion.Body className={RoleDetailsAccordianStyle["roleManagementAccordianBody"]}>
   
        <div className={accordianStyles['accordionPermissionCheckboxParent']}>
    { 
    generateAccess(permissions.roleAccess).map((e,i)=>{
        return <div className="form-check">
        <input id={permissions._id + "-" + e[0]} className="form-check-input"  data-privilage={ e[0]  } onClick={(e)=>{ updatePermission(e) }} type="checkbox" name={e[0]}  checked={(e[1]) ? "checked" : ""}/>
        <label className={RoleDetailsAccordianStyle["accordionPermissionCheckboxLabel"]} for={permissions._id + "-" + e[0]}>
          { e[0] }
        </label>
      </div>
    })
    }
    </div>
    <div className={accordianStyles['accordionPermissionSaveBox']}>
       { (saveState.enableSave) && 
       <button onClick={()=>saveUpdatedData()} className={accordianStyles['accordionPermissionSaveBtn']}> 
            { 
            (saveState.savingProgress) ? 
                <>
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> Updating...</> 
                : 
                <>
                    <i className="fa fa-floppy-o"></i>Update Permissions
                </>
            }
        </button>}
    </div>
  </Accordion.Body>
</Accordion.Item>

  )
}
