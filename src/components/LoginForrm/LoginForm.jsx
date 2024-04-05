import { useEffect, useState } from 'react';
import { getData } from '../../services/firebase';
import styles from './LoginForm.module.css';


export default function LoginForm() {
    const [account, setAccount] = useState([]);
    const [loginState, setLoginState] = useState({
        Password: '',
        Username: '',
    })

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
            console.log('login success')
        }
        else {
            console.log('incorrect info')
        }


    }

    return (
        <div className={styles.background}>
            
            <div className={styles.wrapper}>
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

                    <button onClick={handleLogin} >Đăng nhập</button>

                    <div className={styles.registerLink}>
                        <p>Không có tài khoản? <a href="a">Đăng ký</a></p>
                    </div>
                </form >

            </div>
        </div>

    );
}