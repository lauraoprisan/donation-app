import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useLogin } from '../../hooks/useLogin'

const AuthPage = () => {
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:''
    })

    const {username, email, password} = formData
    const [isLogin, setIsLogin] = useState(false)
    const {signup, errorSignup, isSignningup} = useSignup()
    const {login, errorLogin, isLoggingin} = useLogin()


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isLogin){
            await login(email, password)
        } else {
            await signup(email, password, username)
        }

    }

  return (
    <section className="auth-section">
        <div className="auth-container">
            {/* <h2 className="auth-subtitle"> Hai sa ajutam Romania pas cu pas</h2> */}
            <h1>Autentificare</h1>
            {isLogin ?(
                <p>Nu ai un cont? Creeaza-ti unul apasand <span className="change-login-signup" onClick={()=>setIsLogin(false)}>aici</span>.</p>
            ):(
                <p>Ai deja un cont? Atunci schimba formularul apasand <span className="change-login-signup" onClick={()=>setIsLogin(true)}>aici</span>.</p>
            )}


                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin &&(
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onChange}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label for="password">Parola</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    
                    {isLogin ? (errorLogin && <span>{errorLogin}</span>) : (errorSignup && <span>{errorSignup}</span>)}

                    <div className="form-group">
                        <button type="submit" className="action-button highlight-button" disabled={isSignningup || isLoggingin}>
                            {isLogin ? "Log in" : "Sign up"}
                        </button>
                    </div>
                </form>

        </div>
    </section>
  )
}

export default AuthPage
