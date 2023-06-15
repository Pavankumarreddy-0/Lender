import React, { useState } from 'react'
import './register.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'

const General = () => {
    const [stepperFuns] = useOutletContext();

    const { setGeneralInfo } = stepperFuns
    const navigate = useNavigate()

    const [generalData, setGeneralData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

    const [data, setData] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setData([...data, generalData])
        setGeneralInfo(true)
        navigate("/register/role")
    }
    return (
        <>
            <div className='details px-5'>
                <div className='mb-5'>
                    <h1 className='my-3'>Registration </h1>
                    <p>Your Account will be verified faster if you fill in your full name as it appears on your ID. All fields are required</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>First Name</label>
                            <input type='text' value={generalData.firstName} onChange={(e) => setGeneralData({ ...generalData, firstName: e.target.value })} placeholder='First Name' className='px-2 py-2 d-block w-100' required />
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Last Name</label>
                            <input type='text' value={generalData.lastName} onChange={(e) => setGeneralData({ ...generalData, lastName: e.target.value })} placeholder='Last Name' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                    </div>
                    <div className='d-flex mt-4 w-100'>
                        <div className='w-50 me-3'>
                            <label className='mb-2'>Password</label>
                            <input type='password' value={generalData.password} onChange={(e) => setGeneralData({ ...generalData, password: e.target.value })} placeholder='Password' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                        <div className='w-50'>
                            <label className='mb-2'>Confirm Password</label>
                            <input type='password' value={generalData.confirmPassword} onChange={(e) => setGeneralData({ ...generalData, confirmPassword: e.target.value })} placeholder='Confirm Password' className='me-5 px-2 py-2 d-block w-100' required />
                        </div>
                    </div>
                    <div className='mt-4 w-100'>
                        <label className='mb-2'>E-Mail Address</label>
                        <input type='email' value={generalData.email} onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })} placeholder='Email' className='me-5 px-2 py-2 d-block w-100' required />
                    </div>
                    <div className='my-5 next_step'>
                        <div>
                            <p>Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                        <div>
                            <button className='form_button'>Next step</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default General