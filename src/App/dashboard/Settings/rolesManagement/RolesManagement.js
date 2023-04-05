import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import rolesStyles from './rolesManagement.module.css';


export default function RolesManagement() {

  const [roleManagement, setRoleManagement] = useState([]);

  useEffect(()=>{
      loadRoles();
  },[]);


  const loadRoles = async () =>{
      console.log(localStorage.getItem("token"));
      await axios.post('/api/roles/', { },{
          headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
      }).then(response => {

          const { result } = response.data;
          console.log(result);
          setRoleManagement(result)

      }).catch(error => {
          console.error(error);
  })
  }

  return (
    <>
    <div className={rolesStyles['headerDiv']}>

    <i class="fa fa-arrow-left"></i>
    <div>
    <h1 className={rolesStyles['heading']}>Manager Role</h1>
    <button className={rolesStyles['createButton']}><i class="fa fa-plus"></i>Create</button>
    </div>
    <div className={rolesStyles['cardDiv']}>
      <h1>Investor Role</h1>
      <i class="fa fa-arrow-right"></i>

    </div>
    </div>


    
   </>

  )
}
