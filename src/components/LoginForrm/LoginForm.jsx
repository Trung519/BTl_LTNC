import { useEffect, useState } from 'react';
import { getData } from '../../services/firebase';
import './LoginForm.css';


export default function LoginForm() {
    const [account,setAccount] =useState([]);
    const [loginState,setLoginState] =useState({
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
    const handleLogin= ()=>{
        let found = account.find(item => 
            item.Username===loginState.Username && item.Password===loginState.Password
        )
        if(found){
            console.log('login success')
        }
        else{
            console.log('incorrect info')
        }
    

    }

    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' name='Username' value={loginState.Username} onChange={(e)=>handleChange(e)} required/> 
                </div>

                <div className='input-box'>
                    <input type='password' placeholder='Password' name='Password' value={loginState.Password} onChange={(e) => handleChange(e)} required/> 
                </div>

                    <div className={styles.rememberForgot}>
                        <label><input type='checkbox' />Ghi nhớ tôi </label>
                        <a href="a">Quên mật khẩu? </a>
                    </div>

                <button  onClick={handleLogin}  >Login</button>

                    <div className={styles.registerLink}>
                        <p>Không có tài khoản? <a href="a">Đăng ký</a></p>
                    </div>
                </form >

            </div>
    );
}