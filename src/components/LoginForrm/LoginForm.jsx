import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Fade from '@mui/material/Fade';
import { getData } from '../../services/firebase';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';


export default function LoginForm() {
    const [account, setAccount] = useState([]);
    const [loginState, setLoginState] = useState({
        Password: '',
        Username: '',
    })
    const [displayAlert, setDisplayAlert] =useState(false);

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

    
    const handleLogin = () => {
        let found = account.find(item =>
            item.Username === loginState.Username && item.Password === loginState.Password
        )
        if (found) {
            window.location.href= '/';
        }
        else {
            console.log('incorrect')
            setDisplayAlert(true);
            setTimeout(() => {
                setDisplayAlert(false)
            }, 2000);
        }
       


    }

    return (
        <div className={styles.background}>
            
            <div className={styles.wrapper}>
            <Fade in={displayAlert}>
                    <Alert severity="error">Tên đăng nhập hoặc mật khẩu không chính xác</Alert>
                </Fade>
                <form action=''>
                    <h1>Đăng nhập</h1>
                    <div className={styles.inputBox}>
                        <input type='text' placeholder='Tên đăng nhập' name='Username' value={loginState.Username} onChange={(e) => handleChange(e)} required />
                       
                    </div>

                    <div className={styles.inputBox}>
                        <input type='password' placeholder='Mật khẩu' name='Password' value={loginState.Password} onChange={(e) => handleChange(e)} required />
                       
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