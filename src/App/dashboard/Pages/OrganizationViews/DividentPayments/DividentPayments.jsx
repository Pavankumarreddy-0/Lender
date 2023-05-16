import React, {useEffect,useState}from 'react';
import DiviPaymentStyles from './DividentPayments.module.css'
import { Link } from 'react-router-dom'
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';

function DividentPayments() {

    const [DivPayments,setDivPayments] = useState({
        tagString:"",
        customTags:[]
    })

    const addCustomTags = () =>{
        if(DivPayments.tagString.trim().length < 1 ){
            alert('text should not be empty');
            return
        }

        if(DivPayments.customTags.length + DivPayments.tagString.trim().split(",").length > 10){
            alert('cannot add more than 10 tags');
            return
        }

        setDivPayments({...DivPayments,customTags:[
            ...new Set([...DivPayments.customTags,...DivPayments.tagString.trim().split(",")])
        ]})
    }

    const removeTag = (e) => {
        let _idx = e.target.getAttribute("data-tagidx");
        let newTag = [];
        for(let id in DivPayments.customTags){
            if(id != _idx){
                newTag.push(DivPayments.customTags[id])
            }
        }
        setDivPayments({...DivPayments,customTags:newTag})
    }

    return (
        <div className={DiviPaymentStyles['card-Binfo']}>
            <div className={DiviPaymentStyles['basicInfo-header']}>
                <div className={DiviPaymentStyles['OrgHeader']}>
                    <Link to='/dashboard/community/organizations'>
                        <i class="bi bi-arrow-left"></i>Organizations
                    </Link>
                    <div className={DiviPaymentStyles['headingSection_info']}>
                        <span>Divident Payments</span>
                    </div>
                </div>
                <div className={DiviPaymentStyles['basic_info-button']}>
                </div>
            </div>
            <div className={DiviPaymentStyles["basicCardFlexwrap"]}>
                <OrganisationDataSideBar />
                <div className={DiviPaymentStyles['DiviCardMain']}>
                    <div className={DiviPaymentStyles['DiviPaymentsInner']}>
                            <div className={DiviPaymentStyles['']}>
                                Divident Payments
                            </div>
                            <div className={DiviPaymentStyles['DivPaymentContent']}>
                                <div className={DiviPaymentStyles['DivPaymentsContentInner']}>
                                <div className={DiviPaymentStyles['']}>No data to Display</div>
                                <div className={DiviPaymentStyles['']}>The data will appear once added</div>
                                </div>
                        </div>
                    </div>
                    </div>
                    <div className={DiviPaymentStyles['Cards']}>
                        <div className={DiviPaymentStyles['CardInner']}>
                            <div className={DiviPaymentStyles['controlCard-header']}>
                                <i class="bi bi-sliders2-vertical"></i>
                                <div className={DiviPaymentStyles['controlCardText']}></div>
                            </div>
                            <div className={DiviPaymentStyles['controlCard-body']}>
                                <label for="statusCard" className={DiviPaymentStyles['LabelClass']}>Status</label>
                                <select id="statusCard" className={DiviPaymentStyles['Inputs_basic-info']}>
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                    <option>Pending</option>
                                    <option>Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className={DiviPaymentStyles['CardInner']}>
                            <div className={DiviPaymentStyles['customCard-header']}>
                                <i class="bi bi-bookmark"></i>
                                <div className={DiviPaymentStyles['']}>Custom Tag</div>
                            </div>
                            <div className={DiviPaymentStyles['customcardBody']}>
                                <label for='addCustomtags' className={DiviPaymentStyles['LabelClass']}>Add Tag</label>
                                <input type="text" name=""  id="addCustomtags" className={DiviPaymentStyles['addcustomtagInput']} onChange={(e) => setDivPayments({...DivPayments,tagString:e.target.value})}  />
                                <a href="javascript:void(0)" onClick={addCustomTags} className={DiviPaymentStyles['addtagbtn']}>ADD</a>
                            </div>
                            <ul className={DiviPaymentStyles['showcustomtags']}>
                                {DivPayments.customTags.map((elem, i) => {
                                    return <li key={elem} className={DiviPaymentStyles['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


    )
}

export default DividentPayments
