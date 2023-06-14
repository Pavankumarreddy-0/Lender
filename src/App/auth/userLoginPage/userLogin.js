import React, { useState } from 'react'
import axios from 'axios';
import { useToken } from '../useToken';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../useUser';
export default function UserLoginPage() {

    const navigate = useNavigate();
    const user = useUser();

    const [token, setToken] = useToken();

    const [LoginDet, setLoginDet] = useState({
        email: "",
        password: "",
        err: []
    })

    useEffect(() => {
        if (token) {
            if(user && "userType" in user){
                switch(user.userType){
                    case "admin":
                        navigate('/dashboard');
                    break;
                    case "Individual Investor":
                        navigate('/investor/dashboard');
                    break;
                    case "Corporate Investor":
                        navigate('/investor/dashboard');
                    break;
                    case "Fundraiser":
                        navigate('/fundraiser/dashboard');
                    break;
                }
            }
        }
    }, [])

    const onLoginClicked = async (e) => {
        e.preventDefault();

        let _errs = [];

        await axios.post('/api/user/login', {
            email: LoginDet.email,
            password: LoginDet.password
        }).then(response => {
            if( "token" in response.data){
                const { token, userType } = response.data;
                setToken(token);
                if(userType.indexOf("Investor") != -1){
                    navigate('/investor/dashboard');
                }else{
                    navigate('/fundraiser/dashboard');
                }
            } 

            

        }).catch(error => {
            console.error(error);
            if (error.response.status == 401) _errs.push("Unauthorized");
            else _errs.push("Something went wrong. Try again.")
        })


        setLoginDet({ ...LoginDet, err: _errs })

    }

    return (
        <div className='create_account_page'>
            <form onSubmit={onLoginClicked} method="post">
                <div className="create_account_container">
                    <h1>Login</h1>
                    {(LoginDet.err.length > 0) && <div className='errorsPanel'>
                        <ul>
                            {
                                LoginDet.err.map((e) => {
                                    return <li key={e}>{e}</li>
                                })
                            }
                        </ul>
                    </div>}

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" onChange={(e) => setLoginDet({ ...LoginDet, email: e.target.value })} value={LoginDet.email} placeholder="Enter Email" name="email" required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" autoComplete="on" onChange={(e) => setLoginDet({ ...LoginDet, password: e.target.value })} value={LoginDet.password} placeholder="Enter Password" name="psw" required />

                    <div className="clearfix">
                        <button type="submit" className="signupbtn">Login</button>
                        <p className='border-bottom-0 mb-0 pb-1'>Don't have an Account? <Link to="/register/general-info">Sign Up</Link></p>
                        <p className='border-bottom-0'>Forgotten your password? <Link to="/register/general-info">Click here</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}
