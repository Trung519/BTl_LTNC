import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Fade from '@mui/material/Fade';
import { getData } from '../../services/firebase';
import styles from './LoginForm.module.css';

export default function LoginForm(props) {
    const [account, setAccount] = useState([]);
    const [loginState, setLoginState] = useState({
        Password: '',
        Username: '',
    })
    const [displayAlert, setDisplayAlert] = useState(false);

    function handleChange(e) {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        });
    };


    useEffect(() => {
        getData().then((post) => {
            if (post != null) {
                setAccount(post["Account"] ?? []);
            }
        });
    }, []);

    const [msgError, setMsgError] = useState('');
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    function checkInput() {
        let username = document.getElementById("input-username");
        let password = document.getElementById("input-password");
        let isEmpty = false;
        if (loginState.Username === "") {
            username.style.borderColor = 'red';
            setErrorUsername(true);
            isEmpty = true;
        }
        else {
            username.style.borderColor = 'rgba(255,255,255,0.2)';
            setErrorUsername(false);
        }
        if (loginState.Password === "") {
            password.style.borderColor = 'red';
            setErrorPassword(true);
            isEmpty = true;
        }
        else {
            password.style.borderColor = 'rgba(255,255,255,0.2)';
            setErrorPassword(false);
        }
        return isEmpty;
    }
    const handleLogin = () => {
        if (checkInput()) return;

        const user = {};

        let found = account.find(item => {
            user.id = item.ID;
            return item.Username === loginState.Username && item.Password === loginState.Password
        })

        if (found) {
            getData().then((post) => {
                if (post != null) {
                    const listEmployee = post["Employee"] ?? [];

                    
                    const employee = listEmployee.find(item => {
                        return item.ID === user.id;
                    })
                    
                    localStorage.setItem("typeEmp", employee.typeEmp ? employee.typeEmp : " ");
                    localStorage.setItem("name", employee.LastName && employee.FirstName ? employee.LastName + " " + employee.FirstName : " ");
                    localStorage.setItem("id", employee.ID ? employee.ID : " ");
                    localStorage.setItem("department", employee.Department ? employee.Department : " ");

                    window.location.assign("/home");
                }
            });
        }
        else {
            console.log('loginstart', loginState);
            if (!loginState || (loginState.Password !== '' && loginState.Username !== '')) {
                setMsgError('Thông tin tài khoản hoặc mật khẩu không chính xác!')
            }

            setDisplayAlert(true);
            setTimeout(() => {
                setDisplayAlert(false)
            }, 3000);
        }
    }

    return (
        <div className={styles.background}>

            <div className={styles.wrapper}>
                <Fade in={displayAlert}>
                    <Alert severity="error">{msgError}</Alert>
                </Fade>
                <form action=''>
                    <h1>Đăng nhập</h1>
                    <div className={styles.inputBox}>
                        <input id='input-username' type='text' placeholder='Tên đăng nhập' name='Username' value={loginState.Username} onChange={(e) => handleChange(e)} required />
                        {errorUsername && <div className={styles.errorUsername} >Vui lòng nhập tên đăng nhập</div>}
                    </div>

                    <div className={styles.inputBox}>
                        <input id='input-password' type='password' placeholder='Mật khẩu' name='Password' value={loginState.Password} onChange={(e) => handleChange(e)} required />
                        {errorPassword && <div className={styles.errorPassword}>Vui lòng nhập mật khẩu</div>}
                    </div>

                    <div className={styles.rememberForgot}>
                        <label><input type='checkbox' />Ghi nhớ tôi </label>
                        <a href="a">Quên mật khẩu? </a>
                    </div>

                    <div className={styles.btnLogin} onClick={handleLogin} >
                        Đăng nhập
                    </div>

                    <div className={styles.registerLink}>
                        <p>Không có tài khoản? <a href="signup">Đăng ký</a></p>
                    </div>
                </form >

            </div>
        </div>

    );
}