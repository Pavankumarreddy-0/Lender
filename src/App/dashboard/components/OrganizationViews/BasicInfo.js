import React,{ useState } from 'react';
import BasicInfoStyle from './BasicInfo.module.css'
import FormCardStyle from './FormcardStyles/FormCardStyle';



export default function BasicInfo() {
    return (
        <div className={BasicInfoStyle['card-Binfo']}>
            <div className={BasicInfoStyle['BasicCardMain']}>
                <div className={BasicInfoStyle['headingSection_info']}>
                    <span>Basic Info</span>
                </div>
                {/* <div className={BasicInfoStyle['basic-info_innerHeading']}><span>Organisation Details</span></div> */}
                <div className={BasicInfoStyle['basic_info-inner']}>
                    <div className={BasicInfoStyle['basic-info_inputs']}>
                        <div className={BasicInfoStyle['basic-info_name']}>
                            <label for="name" className={BasicInfoStyle['LabelClass']}>Name</label>
                            <input type="text" id="name" className={BasicInfoStyle['Inputs_basic-info']} />
                        </div>
                        <div className={BasicInfoStyle['basic-info_companyName']}>
                            <label for="companyName" className={BasicInfoStyle['LabelClass']}>Company Name</label>
                            <input type="text" id="companyName" className={BasicInfoStyle['Inputs_basic-info']} />
                        </div>
                        <div className={BasicInfoStyle['basic-info_OrganisationI']}>
                            <label for="OrgIntrested" className={BasicInfoStyle['LabelClass']}>Organisation intrested in</label>
                            <select type="text" id="OrgIntrested" className={BasicInfoStyle['Inputs_basic-info']}>
                                <option>Investment</option>
                            </select>
                        </div>
                        <div className={BasicInfoStyle['basic-info_OrganisationE']}>
                            <label for="OrgEmail" className={BasicInfoStyle['LabelClass']}>Organisation email</label>
                            <input type="email" id="OrgEmail" className={BasicInfoStyle['Inputs_basic-info']} />
                        </div>
                        <div className={BasicInfoStyle['basic-info_OrganisationP']}>
                            <label for="OrgPhone" className={BasicInfoStyle['LabelClass']}>Organisation phone</label>
                            <input type="tel" id="OrgPhone" className={BasicInfoStyle['Inputs_basic-info']} />
                        </div>
                        <div className={BasicInfoStyle['basic-info_OrganisationWeb']}>
                            <label for="OrgWebSite" className={BasicInfoStyle['LabelClass']}>Organisation Website</label>
                            <input type="url" id="OrgWebSite" className={BasicInfoStyle['Inputs_basic-info']} />
                        </div>
                    </div>
                </div>
                <div className={BasicInfoStyle['basic_info-button']}>
                        <div className={BasicInfoStyle['basic-info-btn']}>Edit</div>
                    </div>
            </div>
        </div>
    )
}
