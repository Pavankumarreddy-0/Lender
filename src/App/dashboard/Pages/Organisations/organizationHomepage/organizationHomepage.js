import React from 'react'
import orgHomeStyle from './organizationHomepage.module.css'
import { Link } from 'react-router-dom'

export default function OrganizationHomepage() {
  return (
    <div className={orgHomeStyle["orgHomeModule"]}>
      <div className={orgHomeStyle["orgHomenHeaderContainer"]}>
        <div className={orgHomeStyle["orgHomeHeaderContainerRegion"]}>
          <Link
            className={orgHomeStyle["orgHomeHeaderContainerLink"]}
            to="/dashboard/community/"
          >
            <i className="bi bi-arrow-left"></i> Community
          </Link>
          <p className={orgHomeStyle["orgHomeHeaderContainerName"]}>
            Organizations
          </p>
        </div>
        <div className={orgHomeStyle['orgHomeHeaderHeader']}>
            <Link className={orgHomeStyle['createNewOrgButton']} to="/dashboard/community/organizations/create"><i className="bi bi-plus-square"></i>Create New Organization</Link>
          
        </div>
      </div>
      <div className={orgHomeStyle["orgHomeFilterRowContainer"]}>
        <button className={orgHomeStyle["orgHomeFilterButton"]}><i className="bi bi-funnel"></i> Filter</button>
        <button className={orgHomeStyle["orgHomeExportButton"]}><i className="bi bi-file-earmark-arrow-down"></i> Export</button>
      </div>
    </div>
  )
}
