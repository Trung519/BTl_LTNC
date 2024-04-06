import { useState, useEffect } from "react";
import { getData, writeUserData } from "../../services/firebase";
import { Link } from "react-router-dom";
import styles from './SignUpForm.module.css';
import doctorImage from '../assets/doctor_4x.png';
export default function SignUpForm() {
    const [account, setAccount] = useState([])
    const [signUpState, setSignUpState] = useState({
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

    const handleSignUp = () => {
        let isEmpty =false;
        Object.keys(signUpState).forEach(key =>{
            if (signUpState[key] ===""){
                isEmpty=true
                
            }
        })
        if(!isEmpty){

            // let found = account.find(item =>
            //     item.Username === loginState.Username && item.Password === loginState.Password
            // )
            // if (found) {
            //     isCorrect=true;
            // }
            // else {
            //     isCorrect=false;
            // }
            let newAcc = [...account, signUpState];
            writeUserData(newAcc, '/Account')
        }
        
    }


    return (
        <div className={styles.background}>
            <div className={styles.bigWrapper}>
                <div className={styles.left}>
                    <h1>Bệnh viện HCMUT </h1>
                    <img src={doctorImage} />
                </div>
                <div className={styles.wrapper}>
                    <form action=''>
                        <h1>Đăng ký</h1>
                        <div className={styles.inputBox}>
                            <input type='text' placeholder='Tên đăng nhập' name="Username" onChange={handleChange} required />
                        </div>

                        <div className={styles.inputBox}>
                            <input type='email' placeholder='Email' name="Email" onChange={handleChange} required />
                        </div>

                        <div className={styles.inputBox}>
                            <input type='password' placeholder='Mật khẩu' name="Password" onChange={handleChange} required />
                        </div>
                        <div className={styles.btnContainer}>
                            <button type='submit' onClick={handleSignUp}>Đăng ký</button>
                            <Link className={styles.link}  to='/login' >Đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}