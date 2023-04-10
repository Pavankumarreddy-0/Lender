import React, { useState } from 'react'
import corgStyle from './createOrganisation.module.css'
import { Link } from 'react-router-dom'
import { useUser } from '../../../../auth/useUser';
import axios from 'axios';

export default function CreateOrganisation() {

    const user = useUser();
    const { id } = user;

    const [createOrg, setCreateOrg] = useState({
        currentStep: 1,
        stepNames: ["Contact Point", "Organizational Details", "Organization Interest"],
        contactPoint: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: ""
        },
        organizationDetails: {
            name: "",
            companyNumber: "",
            organizationInterest: "Fundraising",
            email: "",
            phone: "",
            website: ""
        },
        radioOpts: {
          fundraise: false,
          investment: false
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

    const showThirdStep = (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }

      e.target.classList.add('was-validated')
      setCreateOrg({...createOrg, currentStep: 3});
    }

    const createNewOrg = async (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
      }

      e.target.classList.add('was-validated');
      setCreateOrg({...createOrg, currentStep: 4});

      await axios.put('/api/create-organization',{
        _id: id,
        contactPoint: createOrg.contactPoint,
        organizationDetails: createOrg.organizationDetails
      },{
          headers: { authorization: `Bearer ${ localStorage.getItem("token") }` }
      }).then(response=>{

          console.log(response)
          

      }).catch(err => {
          alert("Unable to create, please try again.");
          setCreateOrg({...createOrg, currentStep: 3});
      })


    }
 

  return (
    <div className={corgStyle["createOrganisationModule"]}>
      <div className={corgStyle["createOrganisationHeaderContainer"]}>
        <div className={corgStyle["createOrganisationHeaderContainerRegion"]}>
          <Link
            className={corgStyle["createOrganisationHeaderContainerLink"]}
            to="/dashboard/community/organizations/"
          >
            <i className="bi bi-arrow-left"></i> Organizations
          </Link>
          <p className={corgStyle["createOrganisationHeaderContainerName"]}>
            Create Organization
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
                        <div className="col-md-6">
                            <label for="firtNameInput" className={corgStyle["formLabel"]}>First Name</label>
                            <input type="text" value={createOrg.contactPoint.firstName} required onChange={(e)=> setCreateOrg({...createOrg, contactPoint: { ...createOrg.contactPoint,firstName: e.target.value}})}  pattern="[A-Za-z]{1,32}" className={corgStyle["formInput"]} id="firtNameInput" />
                            <div class="invalid-feedback">
                              Please provide a First Name without any spaces.
                            </div>
                        </div>
                        <div className="col-md-6">
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
                            <label for="orgNameInput" className={corgStyle["formLabel"]}>Name</label>
                            <input type="text" required pattern="[A-Za-z]{1,32}" value={createOrg.organizationDetails.name} onChange={(e)=> setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails,name: e.target.value}})} className={corgStyle["formInput"]} id="orgNameInput" />
                        </div>
                        <div className="col-md-6">
                            <label for="comNumInput" className={corgStyle["formLabel"]}>Company Number</label>
                            <input type="text" pattern="[A-Za-z0-9]{1,32}" value={createOrg.organizationDetails.companyNumber} onChange={(e)=> setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails,companyNumber: e.target.value}})} className={corgStyle["formInput"]} id="comNumInput" />
                        </div>
                        <div className="col-md-12">
                            <label for="orgEmailInput" className={corgStyle["formLabel"]}>Organization Email</label>
                            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required value={createOrg.organizationDetails.email} onChange={(e)=> setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails,email: e.target.value}})} className={corgStyle["formInput"]} id="orgEmailInput" />
                        </div>
                        <div className="col-md-12">
                            <label for="orgPhInput" className={corgStyle["formLabel"]}>Organization Phone Number</label>
                            <input type="tel"  pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" required value={createOrg.organizationDetails.phone} onChange={(e)=> setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails,phone: e.target.value}})} className={corgStyle["formInput"]} id="orgPhInput" />
                        </div>
                        <div className="col-md-12">
                            <label for="orgWebInput" className={corgStyle["formLabel"]}>Organization Website</label>
                            <input type="text" pattern="^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$" value={createOrg.organizationDetails.website} onChange={(e)=> setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails,website: e.target.value}})} className={corgStyle["formInput"]} id="orgWebInput" />
                        </div>
                      </div>
                      <div className={corgStyle["formModuleFooterSpaceApart"]}>
                        { ( createOrg.currentStep < createOrg.stepNames.length) && <button>Next <i className="bi bi-arrow-right"></i></button>}
                      </div>
                      </form>
                  </div>
              </div>
          }

          {
            /**
             * Step 3
             * Organizational Interest
             */
              ( createOrg.currentStep == 3) &&
              <div className={corgStyle["createOrganisationFormSecondStep"]}>
               <h3 className={corgStyle["formModuleSectionTitle"]}>{createOrg.stepNames[createOrg.currentStep - 1]}</h3>
                <div className={corgStyle["formModuleBody"]}>
                  <form  className="needs-validation" onSubmit={(e)=>{ createNewOrg(e)  }}>
                  <div className='row'>
                    <div className="col-md-12">
                      <div className="form-check">
                        <input 
                        onClick={(e)=> {
                          setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails, organizationInterest: "Fundraising"}, radioOpts: { fundraise: true, investment: false }});
                        }
                        }
                         className="form-check-input" type="radio" required name="exampleRadios" id="exampleRadios1" value="Fundraising" checked={(createOrg.radioOpts.fundraise) ? "checked" : ""}/>
                        <label className={corgStyle["formModuleCheckLabel"]} htmlFor="exampleRadios1">
                          Fundraising
                        </label>
                        <p className={corgStyle["formModuleCheckDescription"]}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        </p>
                      </div>
                      <div className="form-check">
                        <input onClick={(e)=> {
                          setCreateOrg({...createOrg, organizationDetails: { ...createOrg.organizationDetails, organizationInterest: "Investing"}, radioOpts: { fundraise: false, investment: true }});
                        }
                        } 
                          className="form-check-input" requried type="radio" name="exampleRadios" id="exampleRadios2" value="Investing" checked={(createOrg.radioOpts.investment) ? "checked" : ""}/>
                        <label className={corgStyle["formModuleCheckLabel"]} htmlFor="exampleRadios2">
                          Investing
                        </label>
                        <p className={corgStyle["formModuleCheckDescription"]}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={corgStyle["formModuleFooterSpaceApart"]}>
                    {/* { ( createOrg.currentStep > 1 ) && <button><i className="bi bi-arrow-left"></i> Previous</button>} */}
                    { ( createOrg.currentStep == createOrg.stepNames.length) && <button><i className="bi bi-plus-square"></i> Create</button>}
                  </div>
                  </form>
                </div>
              </div>
          }

          {
            /**
             * Step 4
             * Creating, Please Wait
             */
              ( createOrg.currentStep == 4) &&
              <div className={corgStyle["createOrganisationFormSecondStep"]}>
                <div class="spinner-border" style={{"color": "var(--link-color)"}} role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
          }
         
        </div>        
      </div>
    </div>
  )
}
