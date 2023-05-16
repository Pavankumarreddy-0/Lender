import React, {useEffect,useState}from 'react';
import DocStyles from './Documents.module.css'
import { Link } from 'react-router-dom'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';

function OrgDocuments() {

    const [OrgDoc,setOrgDoc] = useState({
        tagString:"",
        customTags:[]
    })

    const addCustomTags = () =>{
        if(OrgDoc.tagString.trim().length < 1 ){
            alert('text should not be empty');
            return
        }

        if(OrgDoc.customTags.length + OrgDoc.tagString.trim().split(",").length > 10){
            alert('cannot add more than 10 tags');
            return
        }

        setOrgDoc({...OrgDoc,customTags:[
            ...new Set([...OrgDoc.customTags,...OrgDoc.tagString.trim().split(",")])
        ]})
    }

    const removeTag = (e) => {
        let _idx = e.target.getAttribute("data-tagidx");
        let newTag = [];
        for(let id in OrgDoc.customTags){
            if(id !== _idx){
                newTag.push(OrgDoc.customTags[id])
            }
        }
        setOrgDoc({...OrgDoc,customTags:newTag})
    }

    return (
        <div className={DocStyles['card-Binfo']}>
            <div className={DocStyles['basicInfo-header']}>
                <div className={DocStyles['OrgHeader']}>
                    <Link to='/dashboard/community/organizations'>
                        <i class="bi bi-arrow-left"></i>Organizations
                    </Link>
                    <div className={DocStyles['headingSection_info']}>
                        <span>Document</span>
                    </div>
                </div>
                <div className={DocStyles['basic_info-button']}>
                </div>
            </div>
            <div className={DocStyles["basicCardFlexwrap"]}>
                <OrganisationDataSideBar />
                <div className={DocStyles['DiviCardMain']}>
                    <div className={DocStyles['DiviPaymentsInner']}>
                            <div className={DocStyles['']}>
                                Document
                            </div>
                            <div className={DocStyles['DivPaymentContent']}>
                                <div className={DocStyles['DivPaymentsContentInner']}>
                                <div className={DocStyles['']}>No data to Display</div>
                                <div className={DocStyles['']}>The data will appear once added</div>
                                </div>
                        </div>
                    </div>
                    </div>
                    <div className={DocStyles['Cards']}>
                        <div className={DocStyles['CardInner']}>
                            <div className={DocStyles['controlCard-header']}>
                                <i class="bi bi-sliders2-vertical"></i>
                                <div className={DocStyles['controlCardText']}></div>
                            </div>
                            <div className={DocStyles['controlCard-body']}>
                                <label for="statusCard" className={DocStyles['LabelClass']}>Status</label>
                                <select id="statusCard" className={DocStyles['Inputs_basic-info']}>
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                    <option>Pending</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className={DocStyles['CardInner']}>
                            <div className={DocStyles['customCard-header']}>
                                <i class="bi bi-bookmark"></i>
                                <div className={DocStyles['']}>Custom Tag</div>
                            </div>
                            <div className={DocStyles['customcardBody']}>
                                <label for='addCustomtags' className={DocStyles['LabelClass']}>Add Tag</label>
                                <input type="text" name=""  id="addCustomtags" className={DocStyles['addcustomtagInput']} onChange={(e) => setOrgDoc({...OrgDoc,tagString:e.target.value})}  />
                                <a href="javascript:void(0)" onClick={addCustomTags} className={DocStyles['addtagbtn']}>ADD</a>
                            </div>
                            <ul className={DocStyles['showcustomtags']}>
                                {OrgDoc.customTags.map((elem, i) => {
                                    return <li key={elem} className={DocStyles['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


    )
}

export default OrgDocuments
