import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { set, get, isEqual } from "lodash";
import accordianStyles from './accordianStyles.module.css'

export default function RoleDetailsAccordian(props) {

    const originalPropState = {...props.roledata}; 
    const [permissions, setPermissions] = useState(props.roledata);
    const [saveState, setSaveState] = useState({
        enableSave: false
    })

    const generateAccess = (roles) => {
        let items = [];
        for(let role in roles){
            items.push([role, roles[role]])
        }

        return items
    }

    useEffect(()=>{

    },[permissions])


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
 
  <Accordion.Item eventKey={props.roledata._id}>
  <Accordion.Header>{props.roledata.roleName}</Accordion.Header>
  <Accordion.Body>
    <form>
        <div className={accordianStyles['accordionPermissionCheckboxParent']}>
    { 
    generateAccess(permissions.roleAccess).map((e,i)=>{
        return <div className="form-check">
        <input id={permissions._id + "-" + e[0]} className="form-check-input"  data-privilage={ e[0]  } onClick={(e)=>{ updatePermission(e) }} type="checkbox" name={e[0]}  checked={(e[1]) ? "checked" : ""}/>
        <label classNAme="form-check-label" for={permissions._id + "-" + e[0]}>
          { e[0] }
        </label>
      </div>
    })
    }
    </div>
    <div className={accordianStyles['accordionPermissionSaveBox']}>
       { (saveState.enableSave) && <button className={accordianStyles['accordionPermissionSaveBtn']}> <i className="fa fa-floppy-o"></i>Update Permissions</button>}
    </div>
    </form>
  </Accordion.Body>
</Accordion.Item>

  )
}
