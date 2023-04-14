import React, {useEffect, useState } from 'react'
import OrgDataSidebarStyles from './OrganisationDataSidebar.module.css'
import { Link,useParams } from 'react-router-dom'






function OrganisationDataSideBar() {
    const { organizationId } = useParams()

    const SidebarData = [
        {
            Orgtext:"Basic Info",
            OrgIcon:"bi bi-info-circle",
            Surl:'basic-info'
        },
        {
            Orgtext:"Organization Details",
            OrgIcon:"bi bi-book",
            Surl:'details'
        },
        {
            Orgtext:"Address",
            OrgIcon:"bi bi-geo-alt",
            Surl:'address'
        },
        {
            Orgtext:"Dividend repayments",
            OrgIcon:"bi bi-cash-stack",
            Surl:'payments'
        },
        {
            Orgtext:"Repayments schedule",
            OrgIcon:"bi bi-calendar",
            Surl:'repayments'
        },
        {
            Orgtext:"Documents",
            OrgIcon:"bi bi-file-earmark",
            Surl:'documents'
        },
        {
            Orgtext:"Investments",
            OrgIcon:"bi bi-currency-dollar",
            Surl:'investments'
        },
        {
            Orgtext:"Deals",
            OrgIcon:"fa fa-handshake-o",
            Surl:'deals'
        },
        {
            Orgtext:"Custom feilds",
            OrgIcon:"bi bi-box",
            Surl:'customfeilds'
        },
        {
            Orgtext:"History",
            OrgIcon:"fa fa-history",
            Surl:'history'
        }
    ]
    const [OrgSideData,setOrgData] = useState(SidebarData);

    useEffect(()=>{

    },[OrgSideData])
    return (
    <div className={OrgDataSidebarStyles['orgSideBarMain']}>
        <div className={OrgDataSidebarStyles['orgSideBarInner']}>
        {OrgSideData.map((e) => {
            return (
                <Link className={ (window.location.href.indexOf(   organizationId + "/" + e.Surl) != -1 ) ? OrgDataSidebarStyles['orgsideContentLinkActive'] : OrgDataSidebarStyles['orgsideContentLink']} to={`/dashboard/community/organizations/view/${organizationId}/${e.Surl}/`}>
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
