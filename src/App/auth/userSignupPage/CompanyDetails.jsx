import React, { useState } from 'react'
import './register.css'
import { useNavigate, useOutletContext } from 'react-router-dom'

function CompanyDetails() {
    const [stepperFuns] = useOutletContext()
    const { setCompanyDetails, setPersonalDetails } = stepperFuns
    const navigate = useNavigate()
    const [companyInfo, setCompanyInfo] = useState({
        companyName: "",
        companyNumber: "",
        phoneNumber: "",
        companyEmail: "",
        companyWebsiteUrl: ""
    })
    const handleCompanyDetails = (e) => {
        e.preventDefault()
        navigate('/register/documents')
        setCompanyDetails(true)
    }

    const handlePreviewPage = () => {
        navigate("/register/personal-details")
        setPersonalDetails(false)
    }
    return (
        <>
            <div className='details px-5'>
                <div className='mb-5'>
                    <h1 className='my-3'>Details</h1>
                    <p>Please provide following details to verify your identity</p>
                </div>
                <div>
                    <h4 className='mt-5 mb-4'>Orginization info. All fields are required</h4>
                </div>
                <form onSubmit={handleCompanyDetails}>
                    <div className='d-flex'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>Company Name</label>
                            <input type='text' value={companyInfo.companyName} onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })} placeholder='Company Name' className='px-2 py-2 d-block w-100' required />
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Company Number</label>
                            <input type='text' value={companyInfo.companyNumber} onChange={(e) => setCompanyInfo({ ...companyInfo, companyNumber: e.target.value })} placeholder='Company Number' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                    </div>
                    <div className='d-flex mt-4 w-100'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>Phone Number</label>
                            <input type='tel' value={companyInfo.phoneNumber} onChange={(e) => setCompanyInfo({ ...companyInfo, phoneNumber: e.target.value })} placeholder='Phone Number' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Company E-mail</label>
                            <input type='email' value={companyInfo.companyEmail} onChange={(e) => setCompanyInfo({ ...companyInfo, companyEmail: e.target.value })} placeholder='Company E-mail' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                    </div>
                    <div className='mt-4 w-100'>
                        <label className='mb-2'>Compnay Website URL</label>
                        <input type='url' value={companyInfo.companyWebsiteUrl} onChange={(e) => setCompanyInfo({ ...companyInfo, companyWebsiteUrl: e.target.value })} placeholder='Compnay Website URL' className='me-5 px-2 py-2 d-block w-100' required />
                    </div>
                    <div className='text-end my-5 next_step'>
                        <button className='me-5' onClick={handlePreviewPage}>Previews step</button>
                        <button type='submit'>Next step</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CompanyDetails