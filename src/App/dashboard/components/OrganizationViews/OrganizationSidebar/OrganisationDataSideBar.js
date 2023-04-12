import React, {useEffect, useState} from 'react'
import OrgDataSidebarStyles from './OrganisationDataSidebar.module.css'
import { Link } from 'react-router-dom'


const SidebarData = [
    {
        Orgtext:"Basic Info",
        OrgIcon:"bi bi-info-circle",
        Surl:'/dashboard/community/organizations/view/:organizationId/basic-info'
    },
    {
        Orgtext:"Organization Details",
        OrgIcon:"bi bi-book",
        Surl:'/dashboard/community/organizations/view/:organizationId/details'
    },
    {
        Orgtext:"Address",
        OrgIcon:"bi bi-geo-alt",
        Surl:'/dashboard/community/organizations/view/:organizationId/address'
    },
    {
        Orgtext:"Dividend repayments",
        OrgIcon:"bi bi-cash-stack",
        Surl:'/dashboard/community/organizations/view/:organizationId/payments'
    },
    {
        Orgtext:"Repayments schedule",
        OrgIcon:"bi bi-calendar",
        Surl:'/dashboard/community/organizations/view/:organizationId/repayments'
    },
    {
        Orgtext:"Documents",
        OrgIcon:"bi bi-file-earmark",
        Surl:'/dashboard/community/organizations/view/:organizationId/documents'
    },
    {
        Orgtext:"Investments",
        OrgIcon:"bi bi-currency-dollar",
        Surl:'/dashboard/community/organizations/view/:organizationId/investments'
    },
    {
        Orgtext:"Deals",
        OrgIcon:"fa fa-handshake-o",
        Surl:'/dashboard/community/organizations/view/:organizationId/deals'
    },
    {
        Orgtext:"Custom feilds",
        OrgIcon:"bi bi-box",
        Surl:'/dashboard/community/organizations/view/:organizationId/customfeilds'
    },
    {
        Orgtext:"History",
        OrgIcon:"fa fa-history",
        Surl:'/dashboard/community/organizations/view/:organizationId/history'
    }
]


function OrganisationDataSideBar() {
    const [OrgSideData,setOrgData] = useState(SidebarData);

    useEffect(()=>{

    },[OrgSideData])
    return (
    <div className={OrgDataSidebarStyles['orgSideBarMain']}>
        <div className={OrgDataSidebarStyles['orgSideBarInner']}>
        {OrgSideData.map((e) => {
            return (
                <Link to={e.Surl}>
                <div className={OrgDataSidebarStyles['orgsideContent']}>
                    <div className={OrgDataSidebarStyles['orgIcons']}><i className={e.OrgIcon}></i></div>
                    <div className={OrgDataSidebarStyles['orgText']}>{e.Orgtext}</div>
                </div>
                </Link>
            )
        })}
        </div>
    </div>
    )
}

export default OrganisationDataSideBar
