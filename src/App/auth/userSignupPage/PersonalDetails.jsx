import React, { useState } from 'react'
import './register.css'
import { useNavigate, useOutletContext } from 'react-router-dom'

function PersonalDetails() {
    const [stepperFuns] = useOutletContext()
    const { setPersonalDetails, setCategorization } = stepperFuns
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        title: "",
        DateOfBirth: "",
        CountryResidence: "",
        nationality: "",
        phoneNumber: ""
    })
    const handlePersonalDetails = (e) => {
          e.preventDefault()
          navigate('/register/company-details')
          setPersonalDetails(true)
    }

    const handlePreviewPage = () => {
        navigate("/register/role")
        setCategorization(false)
    }
    return (
        <>
            <div className='details px-5'>
                <div className='mb-5'>
                    <h1 className='my-3'>Details</h1>
                    <p>Please provide following details to verify your identity</p>
                </div>
                <div>
                    <h4 className='mt-5 mb-4'>Personal info. All fields are required</h4>
                </div>
                <form onSubmit={handlePersonalDetails}>
                    <div className='d-flex'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>Title</label>
                            <select className="form-select px-2 py-2" onChange={(e)=> setUserDetails({...userDetails, title : e.target.value})} required>
                                <option value={""}>Select Title</option>
                                <option defaultValue={"Mr."}>Mr.</option>
                                <option defaultValue={"Miss"}>Miss</option>
                                <option defaultValue={"Mrs"}>Mrs</option>
                            </select>
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Date of Birth</label>
                            <input type='date' placeholder='Enter Details' className='me-5 px-2 py-2 d-block w-100' onChange={(e)=> setUserDetails({...userDetails, DateOfBirth: e.target.value})} required />
                        </div>
                    </div>
                    <div className='d-flex mt-4'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>Country Residence</label>
                            <select className="form-select px-2 py-2" onChange={(e)=> setUserDetails({...userDetails, CountryResidence : e.target.value})} required>
                                <option value={""}>Select Country</option>
                                <option defaultValue="1">Country 1</option>
                                <option defaultValue="2">Country 2</option>
                                <option defaultValue="3">Country 3</option>
                            </select>
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Nationality</label>
                            <select className="form-select px-2 py-2"onChange={(e)=> setUserDetails({...userDetails, nationality : e.target.value})} required>
                                <option value={""}>Select Nationality</option>
                                <option defaultValue="1">Nationality 1</option>
                                <option defaultValue="2">Nationality 2</option>
                                <option defaultValue="3">Nationality 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='mb-2'>Phone Number</label>
                        <input type='text' placeholder='Phone Number' className='me-5 px-2 py-2 d-block w-100' onChange={(e)=> setUserDetails({...userDetails, phoneNumber : e.target.value})} required />
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

export default PersonalDetails