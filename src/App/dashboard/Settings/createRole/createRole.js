import React, { useState } from 'react';
import { set, get, isEqual } from "lodash";
import {Link} from 'react-router-dom';
import createRoleStyle from './createRole.module.css'

export default function CreateRole() {
 


  const[createRole,setCreateRole] =useState({
    previlages:{
      dashboard:true,
      platform:true,
      crowdFunding:true,
      community:true,
      everything:true,
      investment:true,
      
    }
  })

  const generateAccess = (roles) => {
    let items = [];
    for(let role in roles){
        items.push([role, roles[role]])
    }

    return items
}

const updateRole = (e) =>{
  let ___prop =(e.target.getAttribute("data-privilage"));
  let formattingString = "previlages." + ___prop;
  let newPropState = set({...createRole}, formattingString,!get(createRole, formattingString));
  setCreateRole(newPropState);
  
  
}

  return (
    <div className={createRoleStyle['createRoleModule']}>

 <div className={createRoleStyle['CreateRolesHeaderContainer']}>
        <div className={createRoleStyle['CreateRolesHeaderContainerRegion']}>
          <Link className={createRoleStyle['CreateRolesHeaderContainerLink']} to="/dashboard/settings"><i class="bi bi-arrow-left"></i> Settings</Link>
          <p className={createRoleStyle['CreateRolesHeaderContainerName']}>Roles Management</p>
        </div>
       
      </div>

                 <section className={createRoleStyle['roleName__section']}>
                  <div >
                        <label className={createRoleStyle['roleName__label']}>Role name:</label>
                        <input className={createRoleStyle['roleName__input']} type='text'/>
                  </div>
                 </section>

                 <div className={createRoleStyle['role__permission']}>
                <label className={createRoleStyle['role__permission__label']}> Permissions:</label>
                <div className={createRoleStyle['checkbox__permission']}>

                  {
                    generateAccess(createRole.previlages).map((e)=>{
                        return <div className={createRoleStyle['checkbox__style']}>
                        <input id={e[0]} data-privilage={ e[0]}  class="form-check-input" onClick={(e)=>{ updateRole(e) }} value="createRole" type="checkbox" name={e[0]}  checked={(e[1]) ? "checked" : ""} />
                        <label className={createRoleStyle['checkbox__label']} for={e[0]} > { e[0] }</label>
                        </div>
                    })
                  }
                  
                  
                </div>
                <div className={createRoleStyle['checkbox__button']}>
                  <button  className={createRoleStyle['style__button']}>
                  <i class="fa fa-floppy-o"></i>Create
                  </button>
                </div>
                 </div>
    </div>
  )
}
