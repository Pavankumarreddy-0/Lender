import React from 'react'
import BasicInfo from '../BasicInfo';
import { Outlet } from 'react-router-dom';
import ViewPageStyles from './ViewPage.module.css'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';

 function ViewPage() {
  return (
    <>
        <div className={ViewPageStyles['Content_header']}>
        <h6>Organisation Int Investing </h6>
        </div>
        <section className={ViewPageStyles['orgFormViewSection']}>
        <OrganisationDataSideBar/>
        <Outlet></Outlet>
        </section>
       
    </>
  )
}

export default  ViewPage;