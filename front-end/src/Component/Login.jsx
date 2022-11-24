import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Services/axiosInterceptor'

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const errorRef = useRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const response = await axiosInstance.post("api/auth/users/login",input) 
      console.log(response.data)
      if(response.status === 200){
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('username',response.data.username)
        navigate('/home')
      }

    }catch(error){
      errorRef.current.innerText = error.message.response.data
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form"
                  className="img-fluid"
                  style={{ borderRadius: "1rem 0 0 1rem" }}
                />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form onSubmit={handleLogin}>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i
                        className="fas fa-cubes fa-2x me-3"
                        style={{ color: " #ff6219" }}
                      ></i>
                      <span className="h1 fw-bold mb-0">Login</span>
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      Sign into your account
                    </h5>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id=""
                        placeholder="Enter Email"
                        className="form-control form-control-lg"
                        name="email"
                        value={input.email}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        placeholder="Enter Password"
                        type="password"
                        id="form2Example27"
                        className="form-control form-control-lg"
                        name="password"
                        value={input.password}
                        onChange={(e) =>
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                      
                    </div>
                    <p ref={errorRef}></p>
                    Forget Password ?
                    <Link to={"/reset-password"}>Click Here</Link>
                    <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <Link to="/register" style={{ color: "#393f81" }}>
                        Register here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login