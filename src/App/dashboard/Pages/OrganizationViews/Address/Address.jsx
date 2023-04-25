import React, { useEffect,useState  } from 'react';
import AddressStyles from './Address.module.css';
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';
import { Link } from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";



function Address() {
    const [addressValues,setAddressvalues] = useState({
        tagString:"",
        control: "Control",
        bookmarks: "Custom Tag",
        readOnly:false,
        controlCardStatus: "",
        AddressMode:false,
        allAddress:{
            defaultAddress:"US",
            Country:"",
            companyNumber:"",
            Address1:"",
            Address2:"",
            zipCode:"",
            type:"",
            City:"",
            currentAddress:"",

        },

        customTags: []
    })

    const addCustomTags = () =>{
        if(addressValues.tagString.trim().length < 1 ){
            alert('text should not be empty');
            return
        }

        if(addressValues.customTags.length + addressValues.tagString.trim().split(",").length > 10){
            alert('cannot add more than 10 tags');
            return
        }

        setAddressvalues({...addressValues,customTags:[
            ...new Set([...addressValues.customTags,...addressValues.tagString.trim().split(",")])
        ]})
    }

    const removeTag = (e) => {
        let _idx = e.target.getAttribute("data-tagidx");
        let newTag = [];
        for(let id in addressValues.customTags){
            if(id != _idx){
                newTag.push(addressValues.customTags[id])
            }
        }
        setAddressvalues({...addressValues,customTags:newTag})
    }

return (
    <>
    <div className={AddressStyles['card-Binfo']}>
        <div className={AddressStyles['basicInfo-header']}>
            <div className={AddressStyles['OrgHeader']}>
                <Link to='/dashboard/community/organizations'>
                    <i class="bi bi-arrow-left"></i>Organizations
                </Link>
                <div className={AddressStyles['headingSection_address']}>
                    <span>Address</span>
                </div>
            </div>
            <div className={AddressStyles['basic_info-button']}>
            </div>
        </div>
        <div className={AddressStyles["AddressCardFlexwrap"]}>
            <OrganisationDataSideBar />
            <div className={AddressStyles['AddressCardMain']}>
            <div className={AddressStyles['addressCardInner']}>
                <div className={AddressStyles['addressCardHeader']}>
                    Address
                </div>
                <div className={AddressStyles['AddressCardMainBody']}>
                    <div className={AddressStyles['AddressCardbody']}>
                    <div className={AddressStyles['AddressCardContent']}>
                        <div className={AddressStyles['']}>No data yet.</div>
                        <div className={AddressStyles['']}>Once Added the data will appear here</div>
                    </div>
                    <a href="javascript:void(0)" className={AddressStyles['addAddressbtn']} onClick={() => setAddressvalues({...addressValues,AddressMode:"AddAddress"})}><i class="bi bi-plus-square"></i> Add Address</a>
                    </div>
                </div>
            </div>
            <div className={AddressStyles['Cards']}>
                            <div className={AddressStyles['CardInner']}>
                                <div className={AddressStyles['controlCard-header']}>
                                    <i class="bi bi-sliders2-vertical"></i>Control
                                    <div className={AddressStyles['controlCardText']}></div>
                                </div>
                                <div className={AddressStyles['controlCard-body']}>
                                    <label for="statusCard" className={AddressStyles['LabelClass']}>Status</label>
                                    <select id="statusCard" className={AddressStyles['Inputs_Address']}>
                                        <option>Draft</option>
                                        <option>Submitted</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className={AddressStyles['CardInner']}>
                                <div className={AddressStyles['customCard-header']}>
                                    <i class="bi bi-bookmark"></i>
                                    <div className={AddressStyles['']}>Custom Tag</div>
                                </div>
                                <div className={AddressStyles['customcardBody']}>
                                    <label for='addCustomtags' className={AddressStyles['LabelClass']}>Add Tag</label>
                                    <input type="text" name="" value={addressValues.tagString}id="addCustomtags" className={AddressStyles['addcustomtagInput']} onChange={(e) => setAddressvalues({...addressValues,tagString:e.target.value})} />
                                    <a href="javascript:void(0)" onClick={addCustomTags} className={AddressStyles['addtagbtn']}>ADD</a>
                                </div>
                                <ul className={AddressStyles['showcustomtags']}>
                                    {addressValues.customTags.map((elem, i) => {
                                        return <li key={elem} className={AddressStyles['Tagname']}><span>{elem}</span><a href='javascript:void(0)' data-tagidx={i} onClick={(e) => removeTag(e)}><i data-tagidx={i} class="bi bi-x"></i></a></li>
                                    })}
                                </ul>
                            </div>
                        </div>
            </div>
        </div>
    </div>
    {(addressValues.AddressMode == 'AddAddress') && <>
                <div className={AddressStyles['setAddressBackdrop']} onClick={() => setAddressvalues({...addressValues,AddressMode:""})}></div>
                <div className={AddressStyles['setAddressMainWrapper']}>
                    <div className={AddressStyles['setAddressheader']}>
                        <span>Add Address</span>
                        <a href="javascript:void(0)" className={AddressStyles['cancel-btn']} onClick={() => setAddressvalues({...addressValues,AddressMode:true})}>
                        <i class="bi bi-x-circle"></i>cancel
                        </a>
                    </div>
                    <div className={AddressStyles['setAddressInputs']}>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Company Number</label>
                            <input type="text" name="" id="" readOnly ={(addressValues.readOnly) && "readonly"} className={AddressStyles['Inputs_Address']} onChange={(e) => setAddressvalues({...addressValues,allAddress:{companyNumber:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>County*</label>
                            <ReactFlagsSelect
                            id="CountryOfResidence"
                            key={"CountryOfResidence"}
                            className={AddressStyles["formInputCountry"]}
                            showSelectedLabel={true}
                            showSecondarySelectedLabel={true}
                            showOptionLabel={true}
                            showSecondaryOptionLabel={true}
                            searchable={true}
                            selected={addressValues.allAddress.Country}
                            onSelect={(code) => {
                                setAddressvalues({...addressValues, allAddress:{...addressValues.allAddress,Country:code}})
                            }}
                            ></ReactFlagsSelect>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Address Line-1</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Address1:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Address Line-2</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Address2:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>City*</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,City:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Country</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Country:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Postal/Zipcode*</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,zipCode:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Type</label>
                            <input type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,type:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Is current address</label>
                            <select type="text" name="" id="" className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,currentAddress:e.target.value}})}>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <a href="javascript:void(0)" className={AddressStyles['addAddressSavebtn']} onClick={() => setAddressvalues({...addressValues,readOnly:true,AddressMode:""})}>
                            <span className={AddressStyles['']}><i class="bi bi-save2"></i>Save</span>
                        </a>
                    </div>
                </div>
    </>}
</>
  )
}

export default Address
