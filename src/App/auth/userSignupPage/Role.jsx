import React, { useState } from 'react'
import './register.css'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Role() {
    const [stepperFuns] = useOutletContext();
    const { setGeneralInfo, setCategorization } = stepperFuns
    const navigate = useNavigate()
    const [role, setRole] = useState({ userRole: "" })
    const [errorMsg, setErrorMsg] = useState({msg : ""})

    const handlePreviewPage = () => {
        setGeneralInfo(false)
        navigate('/register/general-info')
    }
    const hanldeRoles = () => {
        console.log("role::", role.userRole);
        if(role.userRole === ""){
             setErrorMsg({msg : "Please select the Role"})
        }else{
            setCategorization(true)
            navigate('/register/personal-details')
        }
    } 
    return (
        <>
            <div className='details px-5'>
                <div className='mb-5'>
                    <h1 className='my-3'>Categorization</h1>
                    <p>Please choose the category that applies to you by clicking the appropriate button below</p>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" value={"Individual Investor"} onChange={(e) => setRole({ ...role, userRole: e.target.value })} id="flexRadioDefault1"/>
                    <label className="form-check-label fs-2" htmlFor="flexRadioDefault1">Individual Investor</label>
                    <div>
                        <p className='mb-0 pb-0'>You plan to invest using your own personal account rather then an account of an organization</p>
                    </div>
                    {
                        errorMsg && errorMsg.msg === "" ? null : <label className='text-danger'>{errorMsg.msg}</label> 
                    }
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" value={"Institutional Investor"} onChange={(e) => setRole({ ...role, userRole: e.target.value })} id="flexRadioDefault2" />
                    <label className="form-check-label fs-2" htmlFor="flexRadioDefault2">Institutional Investor</label>
                    <div>
                        <p className='mb-0 pb-0'>You are a bank, insurance company, pension, hedge fund, REIT, investment adviser, endowment or mutual fund</p>
                    </div>
                    {
                        errorMsg && errorMsg.msg === "" ? null : <label className='text-danger'>{errorMsg.msg}</label> 
                    }
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" value={"Fundraiser"} onChange={(e) => setRole({ ...role, userRole: e.target.value })} id="flexRadioDefault2" />
                    <label className="form-check-label fs-2" htmlFor="flexRadioDefault3">Fundraiser</label>
                    <div>
                        <p className='mb-0 pb-0'>You plan to raise funds for your project</p>
                    </div>
                    {
                        errorMsg && errorMsg.msg === "" ? null : <label className='text-danger'>{errorMsg.msg}</label> 
                    }
                </div>
                <div className='text-end my-5 next_step'>
                    <button className='me-5' onClick={handlePreviewPage}>Previews</button>
                    <button onClick={hanldeRoles}>NextStep</button>
                </div>
            </div>
        </>
    )
}

export default Role