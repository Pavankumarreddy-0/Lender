import React, { useEffect,useState  } from 'react';
import AddressStyles from './Address.module.css';
import OrganisationDataSideBar from '../OrganizationSidebar/OrganisationDataSideBar';
import { Link, useParams } from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import axios from 'axios';



function Address() {
    const {organizationId} = useParams();
    const [addressValues,setAddressvalues] = useState({
        tagString:"",
        pageNum: 1,
        perPage: 10,
        currentPage: 1,
        control: "Control",
        bookmarks: "Custom Tag",
        readOnly:false,
        controlCardStatus: "",
        defaultAdress:true,
        AddressMode:"",
        activeAddId: "",
        allAddress:
        {
            defaultAddress:"",
            Country:"",
            companyNumber:"",
            Address1:"",
            Address2:"",
            zipCode:"",
            type:"",
            City:"",
            currentAddress:"",
        },
        addressCards: [
            {
                id: "",
                defaultAddress:"",
                Country:"",
                companyNumber:"",
                Address1:"",
                Address2:"",
                zipCode:"",
                type:"",
                City:"",
                currentAddress:"",
            }
        ],

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

    const fetchAddress = async () =>{
        await axios.post('/api/address',{
            orgID:organizationId,
            pageNum: addressValues.pageNum,
            perPage: addressValues.perPage
        },{
            headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            console.log("address list",response);
            setAddressvalues({...addressValues, addressCards: [ ...response.data.result[0].paginatedResults ],AddressMode:false})
            
        })
    }

    useEffect(()=>{
        fetchAddress();
    },[])

    useEffect(()=>{

    },[addressValues.addressCards])

    const resetAddressInputs = ()=>{
        setAddressvalues({...addressValues, allAddress: {defaultAddress:"US",
        Country:"",
        companyNumber:"",
        Address1:"",
        Address2:"",
        zipCode:"",
        type:"",
        City:"",
        currentAddress:""}})
    }

    const updateAddressValues = async () => {
        setAddressvalues({...addressValues,AddressMode:false,});

            let __obj = Object.values(addressValues.allAddress);
            for(let val of __obj){
            console.log(val)
            if(val == ""){
                return alert("cant add the data")
                }
            }
            await axios.put('/api/add-address',{
                orgID:organizationId,
                address:addressValues.allAddress,
                isCurrent:addressValues.allAddress.currentAddress,
            },{
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            }).then((reponse) => {
                resetAddressInputs();
                fetchAddress();
            });
        
    }

    const  newResetValues = () => {
        setAddressvalues({...addressValues,AddressMode:true, allAddress:
            {
                defaultAddress:"US",
                Country:"",
                companyNumber:"",
                Address1:"",
                Address2:"",
                zipCode:"",
                type:"",
                City:"",
                currentAddress:"",
            }});

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
            {
                !((addressValues.addressCards.length > 0)) ? "" : <a href="javascript:void(0)" className={AddressStyles['addAddressbtn']} onClick={() => newResetValues()}><i class="bi bi-plus-square"></i> Add Address</a>
            }
            </div>
        </div>
        <div className={AddressStyles["AddressCardFlexwrap"]}>
            <OrganisationDataSideBar />
            <div className={AddressStyles['AddressCardMain']}>
            {!((addressValues.addressCards.length > 0)) ? <div className={AddressStyles['addressCardInner']}>
                <div className={AddressStyles['addressCardHeader']}>
                    Address
                </div>
                <div className={AddressStyles['AddressCardMainBody']}>
                    <div className={AddressStyles['AddressCardbody']}>
                    <div className={AddressStyles['AddressCardContent']}>
                        <div className={AddressStyles['']}>No data yet.</div>
                        <div className={AddressStyles['']}>Once Added the data will appear here</div>
                    </div>
                    <a href="javascript:void(0)" className={AddressStyles['addAddressbtn']} onClick={() => setAddressvalues({...addressValues,AddressMode:true})}><i class="bi bi-plus-square"></i> Add Address</a>
                    </div>
                </div>
            </div> :
            <div className={AddressStyles['AddressDataCards']}>
                {(addressValues.addressCards.map((e)=>{
                return <div className={AddressStyles['AddressCardWrapper']}>
                            <div className={AddressStyles['AddressCardHeader']}>
                                <div className={AddressStyles['headerText']}>
                                    Address 
                                </div>
                                {
                                (e.currentAddress) === "Yes" ? <div className={AddressStyles['activeAddress']}><span>Active</span></div> : ""
                            }
                            </div>
                            <div className={AddressStyles['AddressCardIcon']}>
                                <div className={AddressStyles['']}>
                                <i class="bi bi-map"></i>
                                </div>
                            </div>
                            <div className={AddressStyles['AddressCardInnerBody']}>
                            <div className={AddressStyles['AddressCard-type']}>
                                    <span className={AddressStyles['']}>Company Number :</span>
                                    <span className={AddressStyles['']}>{e.companyNumber}</span>
                                </div>
                                <div className={AddressStyles['AddressCard-Add1']}>
                                    <span className={AddressStyles['']}>Address-1 :</span>
                                    <span className={AddressStyles['']}>{e.Address1}</span>
                                </div>
                                <div className={AddressStyles['AddressCard-Add2']}>
                                    <span className={AddressStyles['']}>Address-2</span>
                                    <span className={AddressStyles['']}>{e.Address2}</span>
                                </div>
                                <div className={AddressStyles['AddressCard-city']}>
                                    <span className={AddressStyles['']}>City :</span>
                                    <span className={AddressStyles['']}>{e.City}</span>
                                </div>
                                <div className={AddressStyles['AddressCard-type']}>
                                    <span className={AddressStyles['']}>Type :</span>
                                    <span className={AddressStyles['']}>{e.type}</span>
                                </div>
                                <div className={AddressStyles['AddressCard-ZipCode']}>
                                    <span className={AddressStyles['']}>Zip-Code :</span>
                                    <span className={AddressStyles['']}>{e.zipCode}</span>
                                </div>
                            </div>
                        </div>
            }))}</div>}
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
    {(addressValues.AddressMode) && <>
                <div className={AddressStyles['setAddressBackdrop']} onClick={() => setAddressvalues({...addressValues,AddressMode:false})}></div>
                <div className={AddressStyles['setAddressMainWrapper']}>
                    <div className={AddressStyles['setAddressheader']}>
                        <span>Add Address</span>
                        <a href="javascript:void(0)" className={AddressStyles['cancel-btn']} onClick={() => setAddressvalues({...addressValues,AddressMode:false})}>
                        <i class="bi bi-x-circle"></i>cancel
                        </a>
                    </div>
                    <div className={AddressStyles['setAddressInputs']}>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Company Number</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.companyNumber} readOnly ={(addressValues.readOnly) && "readonly"} className={AddressStyles['Inputs_Address']} onChange={(e) => setAddressvalues({...addressValues,allAddress:{companyNumber:e.target.value}})}/>
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
                            <input type="text" name="" id="" value={addressValues.allAddress.Address1} className={AddressStyles['Inputs_Address']} data-ipx="1" readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Address1:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Address Line-2</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.Address2} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Address2:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>City*</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.City} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,City:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Country</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.Country} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,Country:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Postal/Zipcode*</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.zipCode} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,zipCode:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Type</label>
                            <input type="text" name="" id="" value={addressValues.allAddress.type} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,allAddress:{...addressValues.allAddress,type:e.target.value}})}/>
                        </div>
                        <div className={AddressStyles['addressInputs']}>
                            <label htmlFor="" className={AddressStyles['LabelClass']}>Is current address</label>
                            <select type="text" name="" id="" value={addressValues.allAddress.currentAddress} className={AddressStyles['Inputs_Address']} readOnly={(addressValues.readOnly) && "readonly"} onChange={(e) => setAddressvalues({...addressValues,activeAddId:e.target.value,allAddress:{...addressValues.allAddress,currentAddress:e.target.value}})}>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <a href="javascript:void(0)" className={AddressStyles['addAddressSavebtn']} onClick={() => updateAddressValues()}>
                            <span className={AddressStyles['']}><i class="bi bi-save2"></i>Save</span>
                        </a>
                    </div>
                </div>
    </>}
</>
)
}

export default Address;
