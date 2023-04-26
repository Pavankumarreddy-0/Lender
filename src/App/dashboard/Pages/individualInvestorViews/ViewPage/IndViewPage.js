import React from 'react'
import { Outlet } from 'react-router-dom';
import ViewPageStyles from './IndViewPage.module.css'

function IndViewPage() {
  return (
    <>
      <section className={ViewPageStyles['orgFormViewSection']}>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default IndViewPage;