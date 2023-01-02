import React from 'react';
import { useFormik } from 'formik';
import wrt_logo from '../assets/images/wrt-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import * as Yup from 'yup';

async function AuthenticateUser(values, loading, setLoading, setUserLoggedIn, setUserDetails){
  let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/users/'
  const response = await fetch(url, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(values)});
  const data = await response.json();
 
  if(data['token']){
    window.localStorage.setItem('user', data['token'])
    window.localStorage.setItem('firstName', data['first_name'])
    window.localStorage.setItem('lastName', data['last_name'])
    setUserDetails({'firstName': data['first_name'], 'lastName': data['last_name'], 'token': data['token']})
    setLoading(false)
    setUserLoggedIn(true)
    window.location.href = "/deployments"    
  }
  else{
    setLoading(false)
    alert('Invalid user credentials. Please try again.')
  }
}

const LoginPage = (props) => {

  let [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '', password: ''
    },
    validationSchema: Yup.object({
        password: Yup.string()
          .min(8, 'Password must contain at least 8 characters')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      }),
    onSubmit: values => {
      setLoading(true)
      AuthenticateUser(values, loading, setLoading, props.setUserLoggedIn, props.setUserDetails)
    },
  });

  let spinner
  if(loading){
    spinner = <FontAwesomeIcon className='LoginSpinner' icon={faSpinner} size={'sm'} spin/>
  }
  return (
    <form onSubmit={formik.handleSubmit} className='LoginFormWrapper'>
       <div className='LoginForm'> 
        <div className='WrtLoginLogoWrapper'>
          <img src={wrt_logo} style={{width: '150px'}}></img>
          <h3>APEX Dashboard</h3>
        </div>
          <div className='LoginEntry'>
          {/* <label className='LoginInput' htmlFor="email">Email Address</label> */}
          <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='InputFormatting'
              placeholder='Email'
          />
          {formik.touched.email && formik.errors.email ? (
              <div className='FormErrorMessage'>{formik.errors.email}</div>
          ) : null}
          </div>
              
          <div className='LoginEntry'>
              {/* <label className='LoginInput' htmlFor="password">Password</label> */}
          <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className='InputFormatting'
              placeholder='Password'
          />
          {formik.touched.password && formik.errors.password ? (
              <div className='FormErrorMessage'>{formik.errors.password}</div>
          ) : null}
              </div>
              <button type="submit" className='LoginButton'>
                <div className='buttonText'>Login</div>
                {spinner}
              </button>
        </div>
    </form>
  );
};

export default LoginPage