import React, {useEffect,useState}from 'react';
import DocumentsStyles from './Documents.module.css'
import { Link } from 'react-router-dom'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';

function RepaymentSchedule() {

    const [rePayments,setRePayments] = useState({
        tagString:"",
        customTags:[]
    })

    const addCustomTags = () =>{
        if(rePayments.tagString.trim().length < 1 ){
            alert('text should not be empty');
            return
        }

        if(rePayments.customTags.length + rePayments.tagString.trim().split(",").length > 10){
            alert('cannot add more than 10 tags');
            return
        }

        setRePayments({...rePayments,customTags:[
            ...new Set([...rePayments.customTags,...rePayments.tagString.trim().split(",")])
        ]})
    }

    const removeTag = (e) => {
        let _idx = e.target.getAttribute("data-tagidx");
        let newTag = [];
        for(let id in rePayments.customTags){
            if(id != _idx){
                newTag.push(rePayments.customTags[id])
            }
        }
        setRePayments({...rePayments,customTags:newTag})
    }

    return (
        <div className={DocumentsStyles['card-Binfo']}>
            <div className={DocumentsStyles['basicInfo-header']}>
                <div className={DocumentsStyles['OrgHeader']}>
                    <Link to='/dashboard/community/organizations'>
                        <i class="bi bi-arrow-left"></i>Organizations
                    </Link>
                    <div className={DocumentsStyles['headingSection_info']}>
                        <span>Divident Payments</span>
                    </div>
                </div>
                <div className={DocumentsStyles['basic_info-button']}>
                </div>
            </div>
            <div className={DocumentsStyles["basicCardFlexwrap"]}>
                <OrganisationDataSideBar />
                <div className={DocumentsStyles['DiviCardMain']}>
                    <div className={DocumentsStyles['DiviPaymentsInner']}>
                            <div className={DocumentsStyles['']}>
                                Repayments Schedule
                            </div>
                            <div className={DocumentsStyles['DivPaymentContent']}>
                                <div className={DocumentsStyles['DivPaymentsContentInner']}>
                                <div className={DocumentsStyles['']}>No data to Display</div>
                                <div className={DocumentsStyles['']}>The data will appear once added</div>
                                </div>
                        </div>
                    </div>
                    </div>
                    <div className={DocumentsStyles['Cards']}>
                        <div className={DocumentsStyles['CardInner']}>
                            <div className={DocumentsStyles['controlCard-header']}>
                                <i class="bi bi-sliders2-vertical"></i>
                                <div className={DocumentsStyles['controlCardText']}></div>
                            </div>
                            <div className={DocumentsStyles['controlCard-body']}>
                                <label for="statusCard" className={DocumentsStyles['LabelClass']}>Status</label>
                                <select id="statusCard" className={DocumentsStyles['Inputs_basic-info']}>
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                    <option>Pending</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className={DocumentsStyles['CardInner']}>
                            <div className={DocumentsStyles['customCard-header']}>
                                <i class="bi bi-bookmark"></i>
                                <div className={DocumentsStyles['']}>Custom Tag</div>
                            </div>
                            <div className={DocumentsStyles['customcardBody']}>
                                <label for='addCustomtags' className={DocumentsStyles['LabelClass']}>Add Tag</label>
                                <input type="text" name=""  id="addCustomtags" className={DocumentsStyles['addcustomtagInput']} onChange={(e) => setRePayments({...rePayments,tagString:e.target.value})}  />
                                <a href="javascript:void(0)" onClick={addCustomTags} className={DocumentsStyles['addtagbtn']}>ADD</a>
                            </div>
                            <ul className={DocumentsStyles['showcustomtags']}>
                                {rePayments.customTags.map((elem, i) => {
                                    return <li key={elem} className={DocumentsStyles['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


    )
}

export default RepaymentSchedule
