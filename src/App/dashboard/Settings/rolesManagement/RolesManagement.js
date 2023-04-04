import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

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
    <div>
      {
        roleManagement.map(e=>{
          return <li>{e.roleName}</li>
        })
      }
    </div>
  )
}
