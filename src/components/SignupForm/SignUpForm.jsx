import { useState, useEffect } from "react";
import { getData, writeUserData } from "../../services/firebase";
import { Link } from "react-router-dom";
import styles from './SignUpForm.module.css';
import doctorImage from '../assets/doctor_4x.png';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { Newspaper } from "@mui/icons-material";

export default function SignUpForm() {
    const [account, setAccount] = useState([])
    const [signUpState, setSignUpState] = useState({
        Password: '',
        Username: '',
        Email: '',

    })
    const [displayAlert, setDisplayAlert] =useState(false);

    useEffect(() => {
        getData().then((post) => {
            if (post != null) {
                setAccount(post["Account"] ?? []);
            }
        });
    }, []);



    const [errorInput, setErrorInput] = useState([
         {
            display: false,
            msg: "",
        },
         {
            display: false,
            msg: "",
        },
         {
            display: false,
            msg: "",
        },


])

    // console.log('re-render');
    const [state,setState] =useState(true);
    function checkInvalid (){
        let form = document.getElementById('registerForm');
        var inputs = form.getElementsByTagName("input");
        let isError = false;
        let newState = errorInput;
        setState(pre=> !pre);
        
        for (var i = 0; i < inputs.length; i++) {

            // DUYỆT QUA TỪNG INPUT NẾU TRỐNG THÌ HIỆN LỖI VUI LÒNG NHẬP 
            // NẾU KHÔNG TRỐNG
                // NẾU USERNAME CÓ NGƯỜI DÙNG HIÊNJ LỖI
                // NẾU EMAIL K  HỢP LỆ HIỆN LỖI
            
            if (inputs[i].value === "") {
                isError=true;
                inputs[i].style.borderColor = "red";
                newState[i].msg = `Vui lòng nhập ${inputs[i].placeholder}`
                newState[i].display=true;
                // setErrorInput(newState);
            }
            else{
                inputs[i].style.borderColor = "rgba(255,255,255,0.2)";
                
                newState[i].display=false;


                if (i===0){
                    // username
                    
                    let findacc = account.find(acc=> acc.Username===signUpState.Username)
                    if(findacc){
                        newState[i].msg= "Tên tài khoản đã có người sử dụng";
                        newState[i].display=true;
                        inputs[i].style.borderColor = "red";
                        // setErrorInput(newState);
                        isError=true;
                    }
                    
                }
                else if (i===1){
                    // Email
                     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                     if(!regex.test(signUpState.Email)){
                         newState[i].msg="Email không hợp lệ!"
                         newState[i].display=true;
                         inputs[i].style.borderColor = "red";
                        //  setErrorInput(newState);
                        isError=true;
                     }
                     else{
                        let findEmail =account.find(acc=>acc.Email===signUpState.Email);
                        if(findEmail){
                            newState[i].msg="Email đã có người sử dụng";
                            newState[i].display=true;
                            inputs[i].style.borderColor = "red";
                            isError=true;
                        }
                     }

                }
                
            }
            
        }
       
        setErrorInput(newState);
        return isError;
    }

    function handleChange(e) {
        setSignUpState({
            ...signUpState,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = () => {
        if(!checkInvalid()){

            let newAcc = [...account, signUpState];
            writeUserData(newAcc, '/Account')
            setDisplayAlert(true);
            setTimeout(() => {
                setDisplayAlert(false);
            }, 3000);
        }
    }


    return (
        <div className={styles.background}>
            <div className={styles.bigWrapper}>
                <div className={styles.left}>
                    <h1>Bệnh viện HCMUT </h1>
                    <img src={doctorImage} alt="not found" />
                </div>
                <div className={styles.wrapper}>
                    <form action='' id="registerForm">
                        <Fade    in={displayAlert}>
                            <Alert severity="success">Đăng ký tài khoản thành công</Alert>
                         </Fade>
                        <h1>Đăng ký</h1>
                        <div className={styles.inputBox }>
                            <input type='text' placeholder='Tên đăng nhập' name="Username" onChange={handleChange} required />
                            {errorInput[0].display && <div className={styles.msgError}>{errorInput[0].msg}</div>}                  
                        </div>

                        <div className={styles.inputBox }>  
                            {/* <div className={styles.msgError}>Email không hợp lệ</div>  */}
                            <input type='email' placeholder='Email' name="Email" onChange={handleChange} required />
                             {errorInput[1].display && <div className={styles.msgErrorEmail}>{errorInput[1].msg}</div> }
                        </div>

                        <div className={styles.inputBox}>
                            <input type='password' placeholder='Mật khẩu' name="Password" onChange={handleChange} required />
                            {errorInput[2].display && <div className={styles.msgErrorPassword}>{errorInput[2].msg}</div>} 

                        </div>
                        <div className={styles.btnContainer}>
                            <div className={styles.btn} onClick={handleSignUp}>Đăng ký</div>
                            <Link className={styles.link}  to='/login' >Đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}