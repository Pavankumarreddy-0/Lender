import React, { useEffect, useState } from 'react';
import BasicInfoStyle from './BasicInfo.module.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import { async } from 'q';
import axios from 'axios';
import OrganisationDataSideBar from './OrganizationSidebar/OrganisationDataSideBar';


export default function BasicInfo() {
    const { organizationId } = useParams();
    
    //? this function is to fetch user details using axios
    const LoadOrgDetails = async () => {
        await axios.post('/api/organization', {
            orgId: organizationId,
        }
            , {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            .then(response => {
                const { result } = response.data
                console.log(result[0])
                setNewOrgVal({ ...newOrgVal, basicState: result[0] });
            }).catch((err) => {
                console.log(`Unable to fetch the data ${err}`)
            })
    }
    useEffect(() => {
        LoadOrgDetails()
    }, [])

    const [OrgValues, setOrgValues] = useState({
        editMode: false,
        activeEditMode: false,
        tagString: "",
        basicState: {
            "_id": "",
            "name": "",
            "companyNumber": "",
            "organizationInterest": "",
            "email": "",
            "phone": "",
            "website": "",
            "kybStatus": "",
            "createdBy": "",
            "contactPoint": "",
            "createdAt": "",
            "firstName": "",
            "lastName": "",
            "creatorUsername": ""
        },
        control: "Control",
        bookmarks: "Custom Tag",
        controlCardStatus: "",
        customTags: []

    })

    const [newOrgVal,setNewOrgVal] = useState({
        editMode: false,
        activeEditMode: false,
        tagString: "",
        basicState: {
            "_id": "",
            "name": "",
            "companyNumber": "",
            "organizationInterest": "",
            "email": "",
            "phone": "",
            "website": "",
            "kybStatus": "",
            "createdBy": "",
            "contactPoint": "",
            "createdAt": "",
            "firstName": "",
            "lastName": "",
            "creatorUsername": ""
        },
        control: "Control",
        bookmarks: "Custom Tag",
        controlCardStatus: "",
        customTags: []
    });


    //? created a function to store the input tags values 
    const addCustomTags = (e) => {

        //? here we compared the tags array length with string length that we are directly setting it in input tag
        //? we dont want user to create more than 10 tags

        if (newOrgVal.tagString.trim().length < 1) {
            alert("Please enter a tag name to create tag");
            return;
        }

        if (newOrgVal.customTags.length + newOrgVal.tagString.trim().split(",").length > 10) {
            alert("Can not create more then 10 tags");
            return;
        }
        setNewOrgVal({
            ...newOrgVal, tagString: "", customTags: [
                ...new Set([...newOrgVal.customTags, ...newOrgVal.tagString.trim().split(",")])
            ]
        })
    }

    //? created a function to remove the tags 
    const removeTag = (e) => {

        //? we are storing the the index of the element using data attribute 
        //? we made a empty array to store the new custom tags 

        let _idx = +e.target.getAttribute("data-tagidx");
        let newTags = [];

        //? we use for in loop to get the property of array
        //? then we pushed the new values to the array and set a new state to update our state

        for (let id in newOrgVal.customTags) {
            if (id != _idx) {
                newTags.push(newOrgVal.customTags[id])
            }
        }

        setNewOrgVal({ ...newOrgVal, customTags: newTags })

    }


    return (
        <>
            <div className={BasicInfoStyle['card-Binfo']}>
                <div className={BasicInfoStyle['basicInfo-header']}>
                    <div className={BasicInfoStyle['OrgHeader']}>
                        <Link to='/dashboard/community/organizations'>
                            <i class="bi bi-arrow-left"></i>Organizations
                        </Link>
                        <div className={BasicInfoStyle['headingSection_info']}>
                            <span>Basic Info - {newOrgVal.basicState.name} </span>
                        </div>
                    </div>
                    <div className={BasicInfoStyle['basic_info-button']}>
                        {(newOrgVal.activeEditMode) && <div className={BasicInfoStyle['saveResults']} onClick={() => setNewOrgVal({ ...newOrgVal, activeEditMode: false, editMode: false,})} ><i class="fa fa-floppy-o" aria-hidden="true"></i>SaveResults</div>}
                        <a href="javascript:void(0)" className={BasicInfoStyle['headerEditable']} onClick={() => setNewOrgVal({ ...newOrgVal, activeEditMode: true, editMode: true })}><i class="bi bi-pencil-square"></i>Edit</a>
                    </div>
                </div>
                <div className={BasicInfoStyle["basicCardFlexwrap"]}>
                    <OrganisationDataSideBar />
                    <div className={BasicInfoStyle['BasicCardMain']}>
                        {/* <div className={BasicInfoStyle['basic-info_innerHeading']}><span>Organisation Details</span></div> */}
                        <div className={BasicInfoStyle['basic_info-inner']}>
                            <div className={BasicInfoStyle['basic-info_inputs']}>
                                <div className={BasicInfoStyle['basic-info_name']}>
                                    <label for="name" className={BasicInfoStyle['LabelClass']}>Name</label>
                                    <input type="text" id="name" readOnly={(!newOrgVal.editMode) && "readonly"} defaultValue={newOrgVal.basicState.name} onChange={(e) => setNewOrgVal({ ...newOrgVal, basicState: { ...newOrgVal.basicState, name: e.target.value } })} className={BasicInfoStyle['Inputs_basic-info']} />
                                </div>
                                <div className={BasicInfoStyle['basic-info_companyName']}>
                                    <label for="companyName" className={BasicInfoStyle['LabelClass']}>Company Name</label>
                                    <input type="text" id="companyName" defaultValue={newOrgVal.basicState.creatorUsername} readOnly={(!newOrgVal.editMode) && "readonly"} onChange={(e) => setNewOrgVal({ ...newOrgVal, basicState: { ...newOrgVal.basicState, creatorUsername: e.target.value } })} className={BasicInfoStyle['Inputs_basic-info']} />
                                </div>
                                <div className={BasicInfoStyle['basic-info_OrganisationI']}>
                                    <label for="OrgIntrested" className={BasicInfoStyle['LabelClass']}>Organisation intrested in</label>
                                    <select type="text" id="OrgIntrested" readOnly={(!newOrgVal.editMode) && "readonly"} className={BasicInfoStyle['Inputs_basic-info']}>
                                        <option value={newOrgVal.basicState.organizationInterest}>{newOrgVal.basicState.organizationInterest}</option>
                                    </select>
                                </div>
                                <div className={BasicInfoStyle['basic-info_OrganisationE']}>
                                    <label for="OrgEmail" className={BasicInfoStyle['LabelClass']}>Organisation email</label>
                                    <input type="email" id="OrgEmail" readOnly={(!newOrgVal.editMode) && "readonly"} value={newOrgVal.basicState.email} onChange={(e) => setNewOrgVal({ ...newOrgVal, basicState: { ...newOrgVal.basicState, email: e.target.value } })} className={BasicInfoStyle['Inputs_basic-info']} />
                                </div>
                                <div className={BasicInfoStyle['basic-info_OrganisationP']}>
                                    <label for="OrgPhone" className={BasicInfoStyle['LabelClass']}>Organisation phone</label>
                                    <input type="tel" id="OrgPhone" readOnly={(!newOrgVal.editMode) && "readonly"} value={newOrgVal.basicState.phone} onChange={(e) => setNewOrgVal({ ...newOrgVal, basicState: { ...newOrgVal.basicState, phone: e.target.value } })} className={BasicInfoStyle['Inputs_basic-info']} />
                                </div>
                                <div className={BasicInfoStyle['basic-info_OrganisationWeb']}>
                                    <label for="OrgWebSite" className={BasicInfoStyle['LabelClass']}>Organisation Website</label>
                                    <input type="url" id="OrgWebSite" readOnly={(!newOrgVal.editMode) && "readonly"} value={newOrgVal.basicState.website} onChange={(e) => setNewOrgVal({ ...newOrgVal, basicState: { ...newOrgVal.basicState, website: e.target.value } })} className={BasicInfoStyle['Inputs_basic-info']} />
                                </div>
                            </div>
                        </div>
                        <div className={BasicInfoStyle['Cards']}>
                            <div className={BasicInfoStyle['CardInner']}>
                                <div className={BasicInfoStyle['controlCard-header']}>
                                    <i class="bi bi-sliders2-vertical"></i>
                                    <div className={BasicInfoStyle['controlCardText']}>{newOrgVal.control}</div>
                                </div>
                                <div className={BasicInfoStyle['controlCard-body']}>
                                    <label for="statusCard" className={BasicInfoStyle['LabelClass']}>Status</label>
                                    <select id="statusCard" className={BasicInfoStyle['Inputs_basic-info']} onChange={(e) => setNewOrgVal({ ...newOrgVal, controlCardStatus: e.target.value })}>
                                        <option>Draft</option>
                                        <option>Submitted</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className={BasicInfoStyle['CardInner']}>
                                <div className={BasicInfoStyle['customCard-header']}>
                                    <i class="bi bi-bookmark"></i>
                                    <div className={BasicInfoStyle['']}>{newOrgVal.bookmarks}</div>
                                </div>
                                <div className={BasicInfoStyle['customcardBody']}>
                                    <label for='addCustomtags' className={BasicInfoStyle['LabelClass']}>Add Tag</label>
                                    <input type="text" name="" value={newOrgVal.tagString} id="addCustomtags" className={BasicInfoStyle['addcustomtagInput']} onChange={(e) => { setNewOrgVal({ ...newOrgVal, tagString: e.target.value }) }} />
                                    <a href="javascript:void(0)" onClick={addCustomTags} className={BasicInfoStyle['addtagbtn']}>ADD</a>
                                </div>
                                <ul className={BasicInfoStyle['showcustomtags']}>
                                    {newOrgVal.customTags.map((elem, i) => {
                                        return <li key={elem} className={BasicInfoStyle['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
