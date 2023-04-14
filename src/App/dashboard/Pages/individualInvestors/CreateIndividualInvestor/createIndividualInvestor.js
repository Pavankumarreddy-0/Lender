import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../../../../auth/useUser';
import axios from 'axios';
import corgStyle from './createIndividualInvestor.module.css'
import ReactFlagsSelect from "react-flags-select";
import { Calendar } from 'react-date-range';

export default function CreateIndividualInvestor() {

    const user = useUser();
    const { id } = user;

    const [createOrg, setCreateOrg] = useState({
        currentStep: 1,
        showDOBSelector: false,
        createdDocId: "",
        stepNames: ["Basic Information", "Personal Information","Investor Created"],
        contactPoint: {
            title: "Mr.",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        },
        personalInfo: {
            dob: new Date(),
            countryOfResidence : "US",
            nationality: "US",
            birthPlace: "",
            insuranceNum: "",
            investorType: "highNetWorthInvestor"
        }
    })

    const showSecondStep = (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }

      e.target.classList.add('was-validated')

      setCreateOrg({...createOrg, currentStep: 2});

    }

    // const showThirdStep = (e) => {
    //   e.preventDefault();
    //   if (!e.target.checkValidity()) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //   }

    //   e.target.classList.add('was-validated')
    //   setCreateOrg({...createOrg, currentStep: 3});
    // }

    const showThirdStep = async (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }

      e.target.classList.add('was-validated');
      setCreateOrg({...createOrg, currentStep: 4});

      await axios.put('/api/create-individual-investor',{
        _id: id,
        contactPoint: createOrg.contactPoint,
        personalInfo: createOrg.personalInfo
      },{
          headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
      }).then(response=>{

          console.log(response)
          setCreateOrg({...createOrg, currentStep: 4, createdDocId: response.data.createdId});

      }).catch(err => {
          alert("Unable to create, please try again.");
          setCreateOrg({...createOrg, currentStep: 2});
      })


    }

    useEffect(()=>{

    },[createOrg.personalInfo.countryOfResidence])

  return (
    <div className={corgStyle["createOrganisationModule"]}>
      <div className={corgStyle["createOrganisationHeaderContainer"]}>
        <div className={corgStyle["createOrganisationHeaderContainerRegion"]}>
          <Link
            className={corgStyle["createOrganisationHeaderContainerLink"]}
            to="/dashboard/community/individual-investor/"
          >
            <i className="bi bi-arrow-left"></i> Individual Investors
          </Link>
          <p className={corgStyle["createOrganisationHeaderContainerName"]}>
            Create Individual Investor
          </p>
        </div>
      </div>
      <div className={corgStyle["createOrganisationFormModule"]}>
        <div className={corgStyle["createOrganisationFormProgress"]}>
        <ul className={corgStyle['progressFormList']}>
        {

          createOrg.stepNames.map((e,i)=>{
            return <li className={corgStyle[ ( i < (createOrg.currentStep - 1)) ? "stageActive" :  (i ==  (createOrg.currentStep - 1))  ? "semiActive" : "stageUnactive"]}><span className={corgStyle['thumb']}></span>
            {
              ( createOrg.currentStep > i+1 ) ?
                <a  className={corgStyle['progressFormListStepLink']} href='javscript:void(0)' data-step={i+1} onClick={(e)=>{setCreateOrg({...createOrg, currentStep: +e.target.getAttribute("data-step")})}}><span data-step={i+1} className={corgStyle['stageName']}>{e}</span></a>
              :
                <span className={corgStyle['stageName']}>{e}</span>
            }
            </li>
          })

        }
        </ul>

        </div>
        <div className={corgStyle["createOrganisationFormBody"]}>
          
          {
            /**
             * Step 1
             * Contact Point
             */
              ( createOrg.currentStep == 1) &&
              <div className={corgStyle["createOrganisationFormFirstStep"]}>
                  <h3 className={corgStyle["formModuleSectionTitle"]}>{createOrg.stepNames[createOrg.currentStep - 1]}</h3>
                  <div className={corgStyle["formModuleBody"]}>
                      <form className="needs-validation" onSubmit={(e)=>{showSecondStep(e)}}>
                      <div className='row'>
                        <div className="col-md-2">
                            <label for="nameTitle" className={corgStyle["formLabel"]}>Title</label>
                            <select onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,title: e.target.value}})}  id="nameTitle" required className={corgStyle["formInput"]} >
                                <option value="Mr.">Mr.</option>
                                <option value="Miss">Miss</option>
                                <option value="Mrs.">Mrs.</option>
                            </select>
                            <div class="invalid-feedback">
                              Please provide a First Name without any spaces.
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label for="firtNameInput" className={corgStyle["formLabel"]}>First Name</label>
                            <input type="text" value={createOrg.contactPoint.firstName} required onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,firstName: e.target.value}})}  pattern="[A-Za-z]{1,32}" className={corgStyle["formInput"]} id="firtNameInput" />
                            <div class="invalid-feedback">
                              Please provide a First Name without any spaces.
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label for="lastNameInput" className={corgStyle["formLabel"]}>Last Name</label>
                            <input type="text" value={createOrg.contactPoint.lastName} required onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,lastName: e.target.value}})} pattern="[A-Za-z]{1,32}" className={corgStyle["formInput"]} id="lastNameInput" />
                            <div class="invalid-feedback">
                              Please provide a Last Name without any spaces.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label for="emailInput" className={corgStyle["formLabel"]}>Email</label>
                            <input type="email" value={createOrg.contactPoint.email} required onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,email: e.target.value}})} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  className={corgStyle["formInput"]} id="emailInput" />
                            <div class="invalid-feedback">
                              Please provide email.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label for="phoneInput" className={corgStyle["formLabel"]}>Phone Number</label>
                            <input type="tel" value={createOrg.contactPoint.phoneNumber} required onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,phoneNumber: e.target.value}})} pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" className={corgStyle["formInput"]} id="phoneInput" />
                            <div class="invalid-feedback">
                                Please provide 10 digit phone number.
                            </div>
                        </div>
                      </div>
                      <div className={corgStyle["formModuleFooter"]}>
                        { ( createOrg.currentStep < createOrg.stepNames.length) && <button>Next <i className="bi bi-arrow-right"></i></button>}
                      </div>
                      </form>
                  </div>
              </div>
          }

          {
            /**
             * Step 2
             * Organization Details
             */
              ( createOrg.currentStep == 2) &&
              <div className={corgStyle["createOrganisationFormSecondStep"]}>
                <h3 className={corgStyle["formModuleSectionTitle"]}>{createOrg.stepNames[createOrg.currentStep - 1]}</h3>
                  <div className={corgStyle["formModuleBody"]}>
                      <form  className="needs-validation" onSubmit={(e)=>{showThirdStep(e)}}>
                      <div className='row'>
                        
                        <div className="col-md-6">
                            <label for="dobInput" className={corgStyle["formLabel"]}>Date of Birth</label>
                            <input type="text" 
                            value={createOrg.personalInfo.dob.toLocaleDateString()} 
                            readOnly 
                            onClick={()=> setCreateOrg({...createOrg, showDOBSelector: true})} 
                            onFocus={()=> setCreateOrg({...createOrg, showDOBSelector: true})} 
                            className={corgStyle["formInput"]} id="dobInput" />
                            {(createOrg.showDOBSelector) && <div className={corgStyle["dataModuleDateRange"]}>  
                                        <div 
                                            className={corgStyle["dataModuleDateRangeBackdrop"]} 
                                            onClick={()=>{setCreateOrg({...createOrg, showDOBSelector: false})}}
                                        ></div>
                                        <div   div className={corgStyle["rdrCalendarWrapper"]}>
                                        <button  className={corgStyle["rdrCalendarWrapperCloseBtn"]} onClick={()=>setCreateOrg({...createOrg, showDOBSelector: false})}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                        <Calendar onChange={item => {
                                            setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo, dob: item}});
                                        }} 
                                        date={createOrg.personalInfo.dob}
                                        maxDate={new Date()}
                                        color={"rgb(11,74,153)"}
                                         />
                                    </div>
                                </div>}
                        </div>
                        <div className="col-md-6">
                            <label for="CountryOfResidence" className={corgStyle["formLabel"]}>Country of Residence</label>
                            <ReactFlagsSelect
                                id="CountryOfResidence"
                                key={"CountryOfResidence"}
                                className={corgStyle["formInputCountry"]}
                                selected={createOrg.personalInfo.countryOfResidence}
                                showSelectedLabel={true}
                                showSecondarySelectedLabel={true}
                                showOptionLabel={true}
                                showSecondaryOptionLabel={true}
                                onSelect={ (code) => {
                                     setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo, countryOfResidence: code}});
                                }}
                                searchable={true}
                            ></ReactFlagsSelect>
                        </div>
                        <div className="col-md-6">
                        <label for="Nationality" className={corgStyle["formLabel"]}>Nationality</label>
                            <ReactFlagsSelect
                                id="Nationality"
                                key={"Nationality"}
                                className={corgStyle["formInputCountry"]}
                                selected={createOrg.personalInfo.nationality}
                                showSelectedLabel={true}
                                showSecondarySelectedLabel={true}
                                showOptionLabel={true}
                                showSecondaryOptionLabel={true}
                                onSelect={ (code) => {
                                     setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo, nationality: code}});
                                }}
                                searchable={true}
                            ></ReactFlagsSelect>
                        </div>
                        <div className="col-md-6">
                            <label for="phoneInput" className={corgStyle["formLabel"]}>Birth Place</label>
                            <input type="text" 
                            value={createOrg.personalInfo.birthPlace}  
                            onChange={(e)=> setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo,birthPlace: e.target.value}})} 
                             className={corgStyle["formInput"]} id="phoneInput" />
                            
                        </div>
                        <div className="col-md-12">
                            <label for="insNum" className={corgStyle["formLabel"]}>Insurance Number</label>
                            <input type="text" value={createOrg.personalInfo.insuranceNum} onChange={(e)=> setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo,insuranceNum: e.target.value}})} className={corgStyle["formInput"]} id="insNum" />
                          
                        </div>
                        <div className="col-md-12">
                            <label for="invType" className={corgStyle["formLabel"]}>Investor Type</label>
                            <select value={createOrg.personalInfo.investorType} onChange={(e)=> setCreateOrg({...createOrg, personalInfo: { ...createOrg.personalInfo,investorType: e.target.value}})} className={corgStyle["formInput"]} id="invType" >
                                <option value="highNetWorthInvestor" selected={(createOrg.personalInfo.investorType == "highNetWorthInvestor") && "selected"}>High Net Worth Investor</option>
                                <option value="Sophesticated" selected={(createOrg.personalInfo.investorType == "Sophesticated") && "selected"}>Sophesticated</option>
                                <option value="Restricted" selected={(createOrg.personalInfo.investorType == "Restricted") && "selected"}>Restricted</option>
                            </select>
                        </div>
                      </div>
                      <div className={corgStyle["formModuleFooterSpaceApart"]}>
                        {  <button><i className="bi bi-plus-square"></i> Create</button>}
                      </div>
                      </form>
                  </div>
              </div>
          }

          

          {
            /**
             * Step 3
             * Creating, Please Wait
             */
              ( createOrg.currentStep == 3) &&
              <div className={corgStyle["createOrganisationFormSecondStep"]}>
                <div class="spinner-border" style={{"color": "var(--link-color)"}} role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
          }

          {
            /**
             * Step 4
             * Created
             */
              ( createOrg.currentStep == 4) &&
              <div className={corgStyle["createOrganisationFormSecondStep"]}>
                <div className={corgStyle["createIndCheck"]}>
                    
                        <div className="animation-ctn">
                            <div className="icon icon--order-success svg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
                                    <g fill="none" stroke="#22AE73" stroke-width="2"> 
                                    <circle cx="77" cy="77" r="72" style={{"stroke-dasharray":"480px, 480px", "stroke-dashoffset": "960px"}}></circle>
                                    <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{"stroke-dasharray":"480px, 480px", "stroke-dashoffset": "960px"}}></circle>
                                    <polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style={{"stroke-dasharray":"100px, 100px", "stroke-dashoffset": "200px"}}/>   
                                    </g> 
                                </svg>
                                </div>
                        </div>

                </div>
                <div className={corgStyle["createIndCheckMessage"]}>
                    Individual Investor Created
                </div>
                <div className={corgStyle["createIndCheckOptions"]}>
                    <Link  className={corgStyle["createIndCheckOptionsBtn"]} to={`/dashboard/community/individual-investor/view/${ createOrg.createdDocId }/`}>View Created Investor</Link>
                    <Link  className={corgStyle["createIndCheckOptionsBtn"]} to={`/dashboard/community/individual-investor/`}>View All Investors</Link>
                </div>
              </div>
          }
         
        </div>        
      </div>
    </div>
  )
}
