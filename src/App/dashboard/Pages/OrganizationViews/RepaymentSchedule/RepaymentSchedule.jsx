import React, {useEffect,useState}from 'react';
import RepaymentsStyles from './RepaymentSchedule.module.css'
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
        <div className={RepaymentsStyles['card-Binfo']}>
            <div className={RepaymentsStyles['basicInfo-header']}>
                <div className={RepaymentsStyles['OrgHeader']}>
                    <Link to='/dashboard/community/organizations'>
                        <i class="bi bi-arrow-left"></i>Organizations
                    </Link>
                    <div className={RepaymentsStyles['headingSection_info']}>
                        <span>Divident Payments</span>
                    </div>
                </div>
                <div className={RepaymentsStyles['basic_info-button']}>
                </div>
            </div>
            <div className={RepaymentsStyles["basicCardFlexwrap"]}>
                <OrganisationDataSideBar />
                <div className={RepaymentsStyles['DiviCardMain']}>
                    <div className={RepaymentsStyles['DiviPaymentsInner']}>
                            <div className={RepaymentsStyles['']}>
                                Repayments Schedule
                            </div>
                            <div className={RepaymentsStyles['DivPaymentContent']}>
                                <div className={RepaymentsStyles['DivPaymentsContentInner']}>
                                <div className={RepaymentsStyles['']}>No data to Display</div>
                                <div className={RepaymentsStyles['']}>The data will appear once added</div>
                                </div>
                        </div>
                    </div>
                    </div>
                    <div className={RepaymentsStyles['Cards']}>
                        <div className={RepaymentsStyles['CardInner']}>
                            <div className={RepaymentsStyles['controlCard-header']}>
                                <i class="bi bi-sliders2-vertical"></i>
                                <div className={RepaymentsStyles['controlCardText']}></div>
                            </div>
                            <div className={RepaymentsStyles['controlCard-body']}>
                                <label for="statusCard" className={RepaymentsStyles['LabelClass']}>Status</label>
                                <select id="statusCard" className={RepaymentsStyles['Inputs_basic-info']}>
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                    <option>Pending</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className={RepaymentsStyles['CardInner']}>
                            <div className={RepaymentsStyles['customCard-header']}>
                                <i class="bi bi-bookmark"></i>
                                <div className={RepaymentsStyles['']}>Custom Tag</div>
                            </div>
                            <div className={RepaymentsStyles['customcardBody']}>
                                <label for='addCustomtags' className={RepaymentsStyles['LabelClass']}>Add Tag</label>
                                <input type="text" name=""  id="addCustomtags" className={RepaymentsStyles['addcustomtagInput']} onChange={(e) => setRePayments({...rePayments,tagString:e.target.value})}  />
                                <a href="javascript:void(0)" onClick={addCustomTags} className={RepaymentsStyles['addtagbtn']}>ADD</a>
                            </div>
                            <ul className={RepaymentsStyles['showcustomtags']}>
                                {rePayments.customTags.map((elem, i) => {
                                    return <li key={elem} className={RepaymentsStyles['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


    )
}

export default RepaymentSchedule
