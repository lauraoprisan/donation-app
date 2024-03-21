import React, { useState } from 'react'

const AuthPage = () => {
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
        password2:'',
        isAdmin:false
    })

    const {username, email, password, password2, isAdmin} = formData
    const [isLogin, setIsLogin] = useState(false)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <section className="auth-section">
        <div className="auth-container">
            {/* <h2 className="auth-subtitle"> Hai sa ajutam Romania pas cu pas</h2> */}
            <h1>Autentificare</h1>
            {isLogin ?(
                <p>Nu ai un cont? Creeaza-ti unul apasand <span className="change-login-signup" onClick={()=>setIsLogin(false)}>aici</span></p>
            ):(
                <p>Ai deja un cont? Atunci schimba formularul apasand <span className="change-login-signup" onClick={()=>setIsLogin(true)}>aici</span></p>
            )}


                <form onSubmit={onSubmit} className="auth-form">
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
                    {!isLogin &&(
                        <div className="form-group">
                            <label for="password2">Confirmare parola</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label for="isAdmin">Admin?</label>
                        <input
                            type="radio"
                            className="form-control"
                            id="isAdmin"
                            name="isAdmin"
                            value={true}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="action-button highlight-button">
                            {isLogin ? "Log in" : "Sign up"}
                        </button>
                    </div>
                </form>

        </div>
    </section>
  )
}

export default AuthPage
