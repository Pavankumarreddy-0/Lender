import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './register.css'

const Register = () => {
  const [generalInfo, setGeneralInfo] = useState(false)
  const [categorization, setCategorization] = useState(false)
  const [personalDetails, setPersonalDetails] = useState(false)
  const [documents, setDocuments] = useState(false)
  const [companyDetails, setCompanyDetails] = useState(false)

  const currentpath = window.location.pathname

  const handleRegisterRoutes = () => {
    if (currentpath === "/register/general-info") {
      setGeneralInfo(false)
    } else if (currentpath === "/register/role") {
      setCategorization(false)
      setGeneralInfo(true)
    } else if (currentpath === "/register/personal-details") {
      setPersonalDetails(false)
      setGeneralInfo(true)
      setCategorization(true)
    } else if(currentpath === "/register/company-details"){
      setCompanyDetails(false)
      setGeneralInfo(true)
      setCategorization(true)
      setPersonalDetails(true)
    } else if (currentpath === "/register/documents") {
      setDocuments(false)
      setGeneralInfo(true)
      setCategorization(true)
      setPersonalDetails(true)
      setCompanyDetails(true)
    } else if (currentpath === "/register/success") {
      setGeneralInfo(true)
      setCategorization(true)
      setPersonalDetails(true)
      setCompanyDetails(true)
      setDocuments(true)
    } else {
      return null
    }
  }

  useEffect(() => {
    handleRegisterRoutes()
  }, [])

  const stepperFuns = {
    setGeneralInfo, setCategorization, setPersonalDetails, setDocuments, setCompanyDetails
  }
  return (
    <>
      <div className='register'>
        <div className='register_left'>
          {
            generalInfo ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>General</span>
              <div className='vertical_line'></div>
            </div> : <div className='stepper_div_d'>
              <span className={`${currentpath === '/register/general-info' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/general-info' ? `stage_name` : ``}`}>General</span>
              <div className='vertical_line_d'></div>
            </div>
          }

          {
            categorization ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>Role</span>
              <div className='vertical_line'></div>
            </div> : <div className='stepper_div_d' >
              <span className={`${currentpath === '/register/role' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/role' ? `stage_name` : ``}`}>Role</span>
              <div className='vertical_line_d'></div>
            </div>
          }

          {
            personalDetails ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>Personal Details</span>
              <div className='vertical_line'></div>
            </div> : <div className='stepper_div_d' >
              <span className={`${currentpath === '/register/personal-details' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/personal-details' ? `stage_name` : ``}`}>Personal Details</span>
              <div className='vertical_line_d'></div>
            </div>
          }

          {
            companyDetails ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>Company Details</span>
              <div className='vertical_line'></div>
            </div> : <div className='stepper_div_d' >
              <span className={`${currentpath === '/register/company-details' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/company-details' ? `stage_name` : ``}`}>Company Details</span>
              <div className='vertical_line_d'></div>
            </div>
          }

          {
            documents ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>Documents</span>
              <div className='vertical_line'></div>
            </div> : <div className='stepper_div_d'>
              <span className={`${currentpath === '/register/documents' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/documents' ? `stage_name` : ``}`}>Documents</span>
              <div className='vertical_line_d'></div>
            </div>
          }

          {
            documents ? <div className='stepper_div'>
              <span className='circle_diagram'></span>
              <span className='stage_name'>Success</span>
            </div> : <div className='stepper_div_d'>
              <span className={`${currentpath === '/register/success' ? `circle_diagram_d` : `circle_diagram_d_bg`}`}></span>
              <span className={`${currentpath === '/register/success' ? `stage_name` : ``}`}>Success</span>
            </div>
          }
        </div>
        <div className='register_right w-100'>
          <Outlet context={[stepperFuns]} />
        </div>
      </div>
    </>
  )
}

export default Register;
