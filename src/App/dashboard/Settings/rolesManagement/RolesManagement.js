import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import rolesStyles from './rolesManagement.module.css';
import { Link } from 'react-router-dom';
import RoleDetailsAccordian from './roleDetailsAccordian';
import Accordion from 'react-bootstrap/Accordion';

export default function RolesManagement() {

  const [roleManagement, setRoleManagement] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);


  const loadRoles = async () => {
    console.log(localStorage.getItem("token"));
    await axios.post('/api/roles/', {}, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
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
      <div className={rolesStyles['rolesManageMentHeader']}>
        <div className={rolesStyles['rolesHeaderContainer']}>
          <div className={rolesStyles['rolesTitleRegion']}>
            <Link className={rolesStyles['rolesBackLink']} to="/dashboard/settings"><i className="bi bi-arrow-left"></i> Settings</Link>
            <p className={rolesStyles['rolesTitleName']}>Roles Management</p>
          </div>
          <div className={rolesStyles['roleManageHeader']}>
            <Link className={rolesStyles['createNewRoleButton']} to="/dashboard/settings/create-role"><i className="bi bi-plus-square"></i>Create New Role</Link>

          </div>
        </div>
        <div className={rolesStyles['roleManagementList']}>
          <div className={rolesStyles['roleManagementListInner']}>
            {
              (roleManagement.length > 0) ?
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                  {
                    roleManagement.map((e) => {
                      return <RoleDetailsAccordian roledata={e} key={e._id} />
                    })
                  }
                </Accordion>
                :
                <>
                  <div className='accordian placeholder-glow'>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                    <div className='accordion-item'>
                      <h2 className='accordion-header'>
                        <button type="button" aria-expanded="false" class="accordion-button collapsed "><span class="placeholder col-4">&nbsp;</span></button>
                      </h2>
                    </div>
                  </div>
                </>
            }

          </div>
        </div>
      </div>
    </>

  )
}
