
import axios from 'axios';
import { useState } from 'react';
import React from 'react'
import OtpView from './otp'
import './CSS/loading.css'


const loginPortal =  document.getElementById('loginPortal');
const root = document.getElementById('root');


const LoginUser= (user, pass, setu)=>{    
    axios.post('http://'+window.location.hostname+':8000/api/token/', 
    {'username':user,
     'password':pass}
    ).then(
        res=>{
            let token= res.data['access']
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('user', user)

            setu(user)
            loginPortal.style.display = 'None'
            root.style.filter = 'blur(0px)'
        }
    )
    .catch(function (error) {
        if(error.response){
            alert(
                'username or password is invalid please try again'
            )
            console.log(error.response, 'row');
        }
        else if(error.request){
            console.log(error.request);
        }
        else{
            console.log(error.message)
        }
        

      });    
}



export const Login = (props) => {
    const [signup, setSignup] = useState(false);
    const [password, setpassword] = useState(false)
    const [servererror, setservererror] = useState(false)
    const [passerror, setpasserror] = useState(false)
    const [resetpassword, setresetpassword] = useState(false)
    const [otpv, setotpv] = useState(false)
    const [email, setemailview] = useState(false)
    const [isrst, setisrst] = useState(false)
    const [load, setload] = useState(false)


    function toLogin(event){
        let username = event.target[0].value
        let password = event.target[1].value
        
        LoginUser(username, password, props.setuser)

        event.preventDefault();
    }

const checkPassword=(e)=>{

   let  l =  password.slice(0, e.target.value.length)
    if(e.target.value.indexOf(l) === -1){
        setpasserror(true)
    }
    else{
        setpasserror(false)
    }
    
}

const resetPassword=(e)=>{
    console.log('reseting... password')

}


    const HandleSubmit=(e)=>{

        
        let data = {
            'username': e.target[3].value,
            'password': e.target[4].value,
            'email': e.target[2].value,
            'first_name': e.target[0].value,
            'last_name': e.target[1].value,

            // 'username': 'ronak',
            // 'password': 'roank123',
            // 'email': 'sampat4123@gmail.com',
            // 'first_name': 'ronak',
            // 'last_name': 'sharma',
            
            
        }

        async function SignUpdjanog ()

        {       
            const send_mail = async(target) => {
                loginPortal.style.opacity = '80%'
                console.log('set load to try')
                setload(true)
                console.log(load)
                data = {'target': target}
                axios.post(`http://${window.location.hostname}:8000/resetOtp/`, data).then(
                    res => {
                        setload(false)
                        loginPortal.style.opacity = '100%'
                        if(res.data.status == 1){
                            
                            setSignup(false)
                            setotpv(true); 
                        }
                        else{
                            alert(
                                `can't send email n\plese recheck eamil or try again!!!!`
                            )
                        }
                    }

                )
            }


            axios.post('http://'+window.location.hostname+':8000/SignUp/', data)
            
            .then(
                res=>{
                    res.data.verified ?
                    send_mail(res.data.data)                    
                    
                    :
                    console.log(res)
                    setservererror(res.data)

                }
            )

            .catch(function (error){
                if(error.response){
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
                else if(error.request){
                    console.log(error.request);
                }
                else{
                    console.log('Error', error.message)
                }
                
                console.log(error.config)
            }
            
            )
        
        }

        SignUpdjanog()

        e.preventDefault()


    }


    const setresetmail= async (e)=>{
        e.preventDefault()
        setisrst(true)
        let data = {
            "target":e.target[0].value
        }
        setload(true)
        loginPortal.style.opacity = '80%'
        let res = await axios.post(`http://${window.location.hostname}:8000/resetOtp/`, data).then(
            res=>{
                loginPortal.style.opacity = '100%'
                setload(false)
                if(res.data.status === 1){
                    setservererror(res.data)
                    setemailview(false); 
                    setotpv(true); 
                }
                else{
                    servererror(res.data)
                }
            }
        )

        console.log('runnning. reset mainl')

        
    }



    return (
        <div id='portal' className="portal bg-light text-center border border-dark shadow-lg px-3 py-3 mx-auto" style={{
            position: "fixed",
            borderRadius: '10px',
            zIndex:4,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>

            {
                load == true &&
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>

            }
                

            {
            resetpassword === false && otpv === true && email === false &&
            <OtpView props={{reset:setresetpassword, otpv:setotpv, signv:setSignup, setem:setemailview, action:isrst, target:servererror}}/>
           }

            {
            resetpassword === false && otpv === false && email === true &&
            <form onSubmit={setresetmail} style={{maxWidth:'400px', minWidth:'300px'}}>
            <div className="d-flex flex-column text-start">
                <label htmlFor="email" className='text-uppercase' style={{ fontSize: '1.1em' }} name='username'>Email ID:</label>
                <input type="text" placeholder='email or username' className='form-control' required/>
                <div>otp will be sent to email id</div>
            </div>


            <div className='d-flex flex-column gap-0'>
                <button className="btn btn-sm  btn-success" type='submit'>Send Otp</button>
            </div>
        </form>

           }

            
           {
            resetpassword === true && otpv !== true &&
            <div className="login" style={{maxWidth:'350px', minWidth:'300px'}}>
                        <div className="header">
                            <h4>Reset Password</h4>
                        </div>
                        <form onSubmit={resetPassword}>
                        <div className="d-flex flex-column text-start">
                                    <label style={{ fontSize: '1.1em' }}>Password:</label>
                                    <input style={{ fontSize: '1.1em' }} type="text" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} className='form-control' required/>
                                </div>

                                <div className="d-flex flex-column text-start">
                                    <label style={{ fontSize: '1.1em' }}>Confirm Password:</label>
                                    <input style={{ fontSize: '1.1em' }} type="text" onChange={(e)=>{checkPassword(e)}} placeholder='Password' className='form-control border' required/>
                                    {
                                        passerror === true &&
                                        <span className='text-danger'>Please enter same passowrd as above</span>
                                    }
                                
                                </div> 

                            <div className='d-flex flex-column gap-0'>
                                <button className="btn btn-sm  btn-success" type='submit'>Reset Password</button>
                               
                            </div>
                        </form>
                    </div>
           }

            {
            resetpassword !== true && otpv !== true && email === false && 
                <React.Fragment>
                {signup ?
                    (<div className="login" style={{maxWidth:'350px', minWidth:'300px'}}>
                        <div className="header">
                            <h4>Login Account</h4>
                        </div>
                        <form onSubmit={toLogin}>
                            <div className="d-flex flex-column text-start">
                                <label htmlFor="email" className='text-uppercase' style={{ fontSize: '1.1em' }} name='username'>Username:</label>
                                <input type="text" placeholder='email or username' className='form-control' required/>
                            </div>

                            <div className="d-flex flex-column text-start">
                                <label htmlFor="Password" className='text-uppercase' style={{ fontSize: '1.1em' }}>Password:</label>
                                <input type="password" autoComplete='None' placeholder='password' className='form-control' required/>
                              <div className='text-primary' onClick={()=>{setemailview(true)}}>Forgot password</div>
                            </div>

                            <div className='d-flex flex-column gap-0'>
                                <button className="btn btn-sm  btn-success" type='submit'>Login</button>
                                <div className="btn btn-sm btn-success my-1 " onClick={() => {
                                    setSignup(false);
                                    document.getElementById('portal').style.transform = 'translate(-50%, -50%)';
                                }}>SignUp</div>
                                <div className="btn btn-sm btn-danger my-0" onClick={() => {
                                    loginPortal.style.display = 'None'
                                    root.style.filter = 'blur(0px)'
                                }}>Close</div>
                            </div>
                        </form>
                    </div>) :



                    (
                        <div className="signup" style={{maxWidth:'550px', minWidth:'330px'}}>
                            <div className="header">
                                <h4 className='fw-bold'>Create New Account</h4>
                            </div>
                            <form onSubmit={HandleSubmit}>
                                {   servererror &&
                                    servererror &&
                                    servererror.non_field_errors &&
                                    <div className='text-danger text-start'>{servererror.non_field_errors}</div>
                                }
                                <div className="demographics d-flex  flex-column flex-sm-row gap-0 gap-sm-3">
                                    <div className="d-flex flex-column text-start">
                                        <label style={{ fontSize: '1.1em' }}>First Name:</label>
                                        <input style={{ fontSize: '1.1em' }} type="text" placeholder='Enter first name' className='form-control' required/>
                                    </div>

                                    <div className="d-flex flex-column text-start">
                                        <label style={{ fontSize: '1.1em' }}>Last Name:</label>
                                        <input style={{ fontSize: '1.1em' }} type="text" placeholder='Enter last name' className='form-control' required/>
                                    </div>
                                </div>

                                <div className="d-flex flex-column text-start">
                                    <label style={{ fontSize: '1.1em' }}>Email ID Or Number:</label>
                                    <input style={{ fontSize: '1.1em' }} type="text" placeholder='Enter email id or phone number' className='form-control' required/>
                                    {
                                        servererror &&
                                        servererror &&
                                        servererror.email &&
                                        <div className='text-danger text-start'>{servererror.email}</div>   
                                    }
                                </div>

                                <div className="d-flex flex-column text-start">
                                        <label style={{ fontSize: '1.1em' }}> Username:</label>
                                        <input style={{ fontSize: '1.1em' }} type="text" placeholder='Enter unique user name' className='form-control' required/>
                                        {
                                        servererror &&
                                        servererror &&
                                        <div className='text-danger text-start'>{servererror.username}</div>   
                                    }
                                    </div>

                                <div className="d-flex flex-column text-start">
                                    <label style={{ fontSize: '1.1em' }}>Password:</label>
                                    <input style={{ fontSize: '1.1em' }} type="text" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}} className='form-control' required/>
                                </div>

                                <div className="d-flex flex-column text-start">
                                    <label style={{ fontSize: '1.1em' }}>Confirm Password:</label>
                                    <input style={{ fontSize: '1.1em' }} type="text" onChange={(e)=>{checkPassword(e)}} placeholder='Password' className='form-control border' required/>
                                    {
                                        passerror === true &&
                                        <span className='text-danger'>Please enter same passowrd as above</span>
                                    }
                                
                                </div> 

                                <div className='d-flex flex-column gap-1 mt-3'>
                                    <button className="btn btn-sm my-1  btn-primary" type='submit'>Submit</button>
                                    <div className="btn btn-sm my-0 btn-primary" onClick={()=>{setSignup(true);}}>Login</div>
                                    <div className="btn btn-sm my-0 btn-danger" onClick={() => {
                                        setSignup(true);
                                        loginPortal.style.display = 'None'
                                        root.style.filter = 'blur(0px)'
                                    }}>Close</div>
                                </div>
                            </form>
                        </div>)}
                    </React.Fragment>
                     }


        </div>
    )
}






