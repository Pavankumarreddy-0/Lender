import React from 'react'
import './register.css'
import { useOutletContext, useNavigate } from 'react-router-dom'

function PersonalDetails() {
    const [stepperFuns] = useOutletContext()
    const { setGeneralInfo, setCategorization, setPersonalDetails, setDocuments } = stepperFuns
    const navigate = useNavigate()
    const handleAllFun = () => {
        setGeneralInfo(false)
        setCategorization(false)
        setPersonalDetails(false)
        setDocuments(false)
        navigate('/login')
    }
    return (
        <>
            <div className='success details py-5 text-center'>
                <h1>Thank you for you Registration</h1>
                <p>you have successfully registered the account. The manager will verify your details very soon</p>
                <p>Your personal data was saved if you have any questions, please contact DPO:</p>
                <p>Lenderkit@justcode.com</p>
                <p>+44 20 4577 0571</p>
                <div className='text-center my-5 next_step'>
                    <button onClick={handleAllFun}>My Account</button>
                </div>
            </div>
        </>
    )
}

export default PersonalDetails