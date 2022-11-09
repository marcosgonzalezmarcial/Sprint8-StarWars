import React, { useState } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import '../form.css'
import ReactLogo from '../../../assets/logosw.svg'

const initialUserDetailsState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const SignUpForm = ({ setUsers }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetailsState)
  const [isOpen, setIsOpen] = useState(true)
  // let history = useHistory();
  let navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    setUsers((prev) => [...prev, userDetails])
    setUserDetails(initialUserDetailsState)
    alert('Has creado el usuario correctamente, ya puedes logueate')
    navigate('/loginform')
  }

  const handleClick = () => {
    setIsOpen(false)
    navigate('/home')
  }

  const handleChangeFirstName = (e) => {
    const inputFirstName = e.target.value
    setUserDetails({ ...userDetails, firstName: inputFirstName })
  }
  const handleChangeLastName = (e) => {
    const inputLastName = e.target.value
    setUserDetails({ ...userDetails, lastName: inputLastName })
  }
  const handleChangeEmail = (e) => {
    const inputEmail = e.target.value
    setUserDetails({ ...userDetails, email: inputEmail })
  }
  const handleChangePassword = (e) => {
    const inputPassword = e.target.value
    setUserDetails({ ...userDetails, password: inputPassword })
  }

  const handleFormInnerClick = (e) => e.stopPropagation()

  return (
    // <div className="form-layer">
    <div
      onMouseDown={handleClick}
      className={`loginForm-container ${isOpen && 'is-open'}`}
    >
      <form onSubmit={handleSubmit} action="">
        <div
          onMouseDown={handleFormInnerClick}
          className="form-inner p-3  position-relative d-flex flex-column align-items-center text-center"
        >
          <img className="login-img my-4 p-2" src={ReactLogo} alt="logo" />
          <button
            className="login-close-btn position-absolute"
            onClick={handleClick}
          >
            X
          </button>
          <h1 className="log-in-title">CREATE YOUR ACCOUNT</h1>
          <div className="form-group w-100 my-3">
            <input
              onChange={handleChangeFirstName}
              placeholder="First Name"
              type="text"
              value={userDetails.firstName}
              required
            />
          </div>
          <div className="form-group w-100 my-3">
            <input
              onChange={handleChangeLastName}
              placeholder="Last Name"
              type="text"
              value={userDetails.lastName}
              required
            />
          </div>
          <div className="form-group w-100 my-3">
            <input
              onChange={handleChangeEmail}
              placeholder="Email Adress"
              type="email"
              value={userDetails.email}
              required
            />
          </div>
          <div className="form-group w-100 my-3">
            <input
              onChange={handleChangePassword}
              placeholder="Password"
              type="password"
              value={userDetails.password}
              required
            />
          </div>
          <input type="submit" value="Create Account" />
          <div className="signup-link-group">
            <p className="text-secondary d-inline-block">
              Already have an account?
            </p>
            <span className="m-3">
              <Link to="/loginform">Sign In</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
    // </div>
  )
}

export default SignUpForm
