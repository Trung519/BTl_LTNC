export default function SignUpForm() {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Sign Up</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required/>
                </div>

                <div className='input-box'>
                    <input type='email' placeholder='Email' required/>
                </div>

                <div className='input-box'>
                    <input type='passwprd' placeholder='Password' required/>
                </div>

                <button type='submit'>Sigh Up</button>

                <button type='submit'>Login</button>
            </form>
        </div>
    );
}