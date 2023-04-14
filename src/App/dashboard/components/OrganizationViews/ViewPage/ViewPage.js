import React from 'react'
import BasicInfo from '../BasicInfo';
import { Outlet } from 'react-router-dom';
import ViewPageStyles from './ViewPage.module.css'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';

 function ViewPage() {
  return (
    <>
        <section className={ViewPageStyles['orgFormViewSection']}>
        <OrganisationDataSideBar/>
        <Outlet></Outlet>
        </section>
    </>
  )
}

export default  ViewPage;