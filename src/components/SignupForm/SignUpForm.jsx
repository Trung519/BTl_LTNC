import { useState, useEffect} from "react";
import { getData, writeUserData } from "../../services/firebase";


export default function SignUpForm() {
    const [account,setAccount] =useState([])
    const [signUpState,setSignUpState] =useState({
        Password: '',
        Username: '',
        Email: '',

    })

    useEffect(() => {
        getData().then((post) => {
          if (post != null) {
            setAccount(post["Account"] ?? []);
          }
        });
      }, []);

    function handleChange(e) {
        setSignUpState({
            ...signUpState,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp =()=> {
        let newAcc = [...account,signUpState];
        writeUserData(newAcc,'/Account')
    }


    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' name="Username" onChange={handleChange} required/>
                </div>

                <div className='input-box'>
                    <input type='email' placeholder='Email' name="Email" onChange={handleChange} required/>
                </div>

                <div className='input-box'>
                    <input type='password' placeholder='Password' name="Password" onChange={handleChange} required/>
                </div>

                <button type='submit' onClick={handleSignUp}>Sigh Up</button>

                <button type='submit'>Login</button>
            </form>
        </div>
    );
}