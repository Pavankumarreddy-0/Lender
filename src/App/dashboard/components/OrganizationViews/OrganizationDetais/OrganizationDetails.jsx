import React,{useState, useEffect} from 'react'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';
import OrganizationDetailsStyle from './OrgDetails.module.css';
import { Link } from 'react-router-dom';

function OrganizationDetails() {

    const [OrgDetails,setOrgDetails] = useState({
        editState:false,
        tagString:"",
        shortDes:"",
        Description:"",
        Directors:"",
        ShareHolders:"",
        customTag:[],

    })

    const  addcustomTags = () =>{

        if(OrgDetails.tagString.trim().length < 1){
            alert('Please enter a tag name to create tag');
            return;
        }

        if(OrgDetails.customTag.length + OrgDetails.tagString.trim().split(",").length > 10){
            alert("Cannot add more than 10 tags");
            return
        }

        setOrgDetails({...OrgDetails,customTag:[
            ...new Set([...OrgDetails.customTag,...OrgDetails.tagString.trim().split(",")])
        ]})
    }


    const removeTag = (e) =>{
        let _idx = +e.target.getAttribute(" data-tagidx");
        let newTag = []
        
        
        for(let id in _idx){
            newTag.push(OrgDetails.customTag[id])
        }
        setOrgDetails({...OrgDetails, customTag:newTag});
    }


  return (
    <>
      <div className={OrganizationDetailsStyle['card-Oinfo']}>
                <div className={OrganizationDetailsStyle['basicInfo-header']}>
                    <div className={OrganizationDetailsStyle['OrgHeader']}>
                        <Link to='/dashboard/community/organizations'>
                            <i class="bi bi-arrow-left"></i>Organizations
                        </Link>
                        <div className={OrganizationDetailsStyle['headingSection_info']}>
                            <span>Organization Details </span>
                        </div>
                    </div>
                    <div className={OrganizationDetailsStyle['basic_info-button']}>
                        
                    </div>
                </div>
                <div className={OrganizationDetailsStyle["basicCardFlexwrap"]}>
                    <OrganisationDataSideBar />
                    <div className={OrganizationDetailsStyle['BasicCardMain']}>
                        <div className={OrganizationDetailsStyle['orgDetails-inner']}>
                            <div className={OrganizationDetailsStyle['orgDetails_inputs']}>
                                <div className={OrganizationDetailsStyle['detailDesHeader']}>
                                    Short Description
                                </div>
                                <div className={OrganizationDetailsStyle['orgDetails_name']}>
                                    <label for="name" className={OrganizationDetailsStyle['LabelClass']}>Short Description</label>
                                    <input type="text" id="name" readOnly={(!OrgDetails.editState && "readonly")} className={OrganizationDetailsStyle['Inputs_basic-info']} onChange={(e) => setOrgDetails({...OrgDetails,shortDes:e.target.value})} />
                                </div>
                                <div className={OrganizationDetailsStyle['detailDescription']}>
                                    <div className={OrganizationDetailsStyle['detailDesHeader']}>
                                        Detail Description
                                    </div>
                                <div className={OrganizationDetailsStyle['basic-info_companyName']}>
                                    <label for="companyName" className={OrganizationDetailsStyle['LabelClass']}>Description</label>
                                    <input type="text" id="companyName"  className={OrganizationDetailsStyle['Inputs_basic-info']} onChange={(e) => setOrgDetails({...OrgDetails,Description:e.target.value})}/>
                                </div>
                                <div className={OrganizationDetailsStyle['basic-info_OrganisationE']}>
                                    <label for="OrgEmail" className={OrganizationDetailsStyle['LabelClass']}>Directors</label>
                                    <textarea type="email" id="OrgEmail"   className={OrganizationDetailsStyle['Inputs_basic-info']} onChange={(e) => setOrgDetails({...OrgDetails,Directors:e.target.value})}></textarea>
                                </div>
                                <div className={OrganizationDetailsStyle['basic-info_OrganisationP']}>
                                    <label for="OrgPhone" className={OrganizationDetailsStyle['LabelClass']}>ShareHolders</label>
                                    <textarea type="email" id="OrgEmail"   className={OrganizationDetailsStyle['Inputs_basic-info']} onChange={(e) => setOrgDetails({...OrgDetails,ShareHolders:e.target.value})}></textarea>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className={OrganizationDetailsStyle['Cards']}>
                            <div className={OrganizationDetailsStyle['CardInner']}>
                                <div className={OrganizationDetailsStyle['controlCard-header']}>
                                    <i class="bi bi-sliders2-vertical"></i>
                                    <div className={OrganizationDetailsStyle['controlCardText']}>Status</div>
                                </div>
                                <div className={OrganizationDetailsStyle['controlCard-body']}>
                                    <label for="statusCard" className={OrganizationDetailsStyle['LabelClass']}>Status</label>
                                    <select id="statusCard" className={OrganizationDetailsStyle['Inputs_basic-info']} >
                                        <option>Draft</option>
                                        <option>Submitted</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className={OrganizationDetailsStyle['CardInner']}>
                                <div className={OrganizationDetailsStyle['customCard-header']}>
                                    <i class="bi bi-bookmark"></i>
                                    <div className={OrganizationDetailsStyle['']}>Custom Tags</div>
                                </div>
                                <div className={OrganizationDetailsStyle['customcardBody']}>
                                    <label for='addCustomtags' className={OrganizationDetailsStyle['LabelClass']}>Add Tag</label>
                                    <input type="text" name=""  id="addCustomtags" className={OrganizationDetailsStyle['addcustomtagInput']} onChange={(e) => setOrgDetails({...OrgDetails,tagString:e.target.value})}  />
                                    <a href="javascript:void(0)" onClick={addcustomTags}  className={OrganizationDetailsStyle['addtagbtn']}>ADD</a>
                                </div>
                                <ul className={OrganizationDetailsStyle['showcustomtags']}>
                                    {
                                        OrgDetails.customTag.map((elem,i) => {
                                            return <li key={elem} className={OrganizationDetailsStyle['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default OrganizationDetails;
