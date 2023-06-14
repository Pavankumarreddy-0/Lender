import React, { useState } from 'react'
import './register.css'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Documents() {
    const [stepperFuns] = useOutletContext()
    const { setCompanyDetails, setDocuments } = stepperFuns
    const [documentName, setDocumentName] = useState('')
    const [associationName, setAssociationName] = useState('')
    const [registrationName, setRegistrationName] = useState('')
    const navigate = useNavigate()
    const hanldeNextstep = () => {
        setDocuments(true)
        navigate('/register/success')
    }
    const handlePreviewStep = () => {
        setCompanyDetails(false)
        navigate("/register/company-details")
    }

    const handleDocumentImg = (e) => {
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name;
            setDocumentName(filename)
        }
    }
    const handleAssociationDoc = (e) => {
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name;
            setAssociationName(filename)
        }
    }
    const handleRegistrationDoc = (e) => {
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name;
            setRegistrationName(filename)
        }
    }
    return (
        <>
            <div className='details px-5'>
                <div className='mb-5'>
                    <h1 className='my-3'>Upload Documents</h1>
                    <p>Please upload your identity doucuments and provide proof of address. The maximum size per file is 7mb. The following formats are accepted: pdf, jpeg, png, jpg, gif</p>
                </div>
                <div>
                    <h5 className='mb-4'>Stakeholders identity documents</h5>
                </div>

                <div className='document_upload'>
                    <div className='mb-3'>
                        <p className='mb-2'>Scan of Passport, Driving License, Or International Address</p>
                        {
                            documentName &&
                            <div className='document_name'>
                                <div>
                                    <span>{documentName}</span>
                                </div>
                                <div>
                                    <span onClick={() => setDocumentName('')} className='delete_icon'><i className="bi bi-x-lg"></i></span>
                                </div>
                            </div>
                        }
                        <label htmlFor="images" className="drop-container">
                            <i className="bi bi-upload fs-2"></i>
                            <input type="file" id="images" className='border-0' onChange={handleDocumentImg} accept="image/*" required />
                        </label>
                    </div>
                    <div className='mb-3'>
                        <p className='mb-2'>Articals of association</p>
                        {
                            associationName &&
                            <div className='document_name'>
                                <div>
                                    <span>{associationName}</span>
                                </div>
                                <div>
                                    <span onClick={() => setAssociationName('')} className='delete_icon'><i className="bi bi-x-lg"></i></span>
                                </div>
                            </div>
                        }
                        <label htmlFor="images" className="drop-container">
                            <i className="bi bi-upload fs-2"></i>
                            <input type="file" id="images" className='border-0' onChange={handleAssociationDoc} accept="image/*" required />
                        </label>
                    </div>
                    <div>
                        <p className='mb-2'>Proof of Registration</p>
                        {
                            registrationName &&
                            <div className='document_name'>
                                <div>
                                    <span>{registrationName}</span>
                                </div>
                                <div>
                                    <span onClick={() => setRegistrationName('')} className='delete_icon'><i className="bi bi-x-lg"></i></span>
                                </div>
                            </div>
                        }
                        <label htmlFor="images" className="drop-container">
                            <i className="bi bi-upload fs-2"></i>
                            <input type="file" id="images" className='border-0' onChange={handleRegistrationDoc} accept="image/*" required />
                        </label>
                    </div>
                </div>
                <div className='text-end my-5 next_step'>
                    <button className='me-5' onClick={handlePreviewStep}>Previews step</button>
                    <button onClick={hanldeNextstep}>Next step</button>
                </div>
            </div>
        </>
    )
}

export default Documents