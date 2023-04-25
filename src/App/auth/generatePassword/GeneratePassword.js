import axios from 'axios';
import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function GeneratePassword() {
    const navigate = useNavigate();
    const {encryptedHash} = useParams();
    const [generatePassword, setGeneratePassword] = useState({
        password: "",
        confirmPassword: "",
        generatingPassword: false
    })

    const genNewPassword = async (event) => {

        event.preventDefault();

        if(generatePassword.generatingPassword){
            alert("Generating request is already in progress please wait..")
            return;
        }

        let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(!passRegex.test(generatePassword.password)){
            alert("Password should be at least 8 characters long, should contain a number and a special character.")
            return;
        }

        if(generatePassword.password != generatePassword.confirmPassword){
            alert("Passwords do not match.");
            return;
        }

        setGeneratePassword({...generatePassword, generatingPassword: true});

        await axios.put('/api/generate-password/', {  ...generatePassword, encryptedHash }, {
            
        }).then(response => {
            // setProfileData({...profileData, savingPassword: false, passwordChange: {oldPass: "", newPass: "", confNewPass: "" }});
            navigate("/login");
        }).catch(error => {
            alert("Unable to generate the password, please try again or contact the admin.")
            setGeneratePassword({...generatePassword, generatingPassword: false});
        })

    }

  return (
    <div>
      <div className='create_account_page'>
            <form onSubmit={genNewPassword} method="post">
                <div className="create_account_container">
                    <h1>Generate Password</h1>

                    <label htmlFor="email"><b>Password</b></label>
                    <input type="password" onChange={(e) => setGeneratePassword({ ...generatePassword, password: e.target.value })} value={generatePassword.password} name="psw" required />

                    <label htmlFor="psw"><b>Confirm Password</b></label>
                    <input type="password" autoComplete="on" onChange={(e) => setGeneratePassword({ ...generatePassword, confirmPassword: e.target.value })} value={generatePassword.confirmPassword}  name="psw" required />

                    <div className="clearfix">
                        <button type="submit" className="signupbtn">Generate Password</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
