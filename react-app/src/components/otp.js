import axios from 'axios'
import React, {useState } from 'react'
import './CSS/loading.css'


axios.defaults.withCredentials = true;

const loginPortal =  document.getElementById('loginPortal');



export default function OtpView(props){

    const [data, setdata] = useState()
    const [load, setload] = useState(false)

     const resend= async(e)=>{
        async function post(){
            setload(true)
            loginPortal.style.opacity = '90%'
            console.log(props.props.target.data)
            let data = {"target":props.props.target.data}
            let res = await axios.post(`http://${window.location.hostname}:8000/resetOtp/`, data).then(
                res => {
                    setload(false)
                    loginPortal.style.opacity = '100%'
                    if(res.data.status == 1){
                        
                        alert('otp send to eamil')
                    }
                    else{
                        alert(
                            `can't send email n\plese recheck eamil or try again!!!!`
                        )
                    }
                }

            )
           
        }

        post()
        e.preventDefault()
    }


    async function otpEnter(e){
        let token = document.getElementById('inputotp')
        let data = {
            "target":props.props.target.data,
            "token":parseInt(token.value)
          }


        console.log(data)
       
        let res = await axios.post(`http://${window.location.hostname}:8000/verify/`, data)
        console.log(res.data)
        setdata(res.data)
        if (res.data.status === 1){
            console.log(props.props.action, '-----------------------------')
            alert('otp verified successsfuly')

            if (props.props.action === false){
                props.props.otpv(false)
                const loginPortal =  document.getElementById('loginPortal');
                loginPortal.style.display = 'None'
                alert('please login ?? account created')
            }
            else{
                console.log('reset/////////////')
                props.props.otpv(false)
                props.props.reset(true)
            }
        }
    

        e.preventDefault()
    }

    let seconds = 30
    let min = 1

    const countdown=()=>{

        seconds -= 1
        
        if(seconds === -1){
            min -= 1
            seconds = 30
        }

        if (tm !==null ){
            tm.innerText = `0${min}:${seconds}`

        }
       
        if (seconds === 0 && min === 0) {
            console.log('--------------')
            clearInterval(rund)
            min = 3
            seconds = 60
        }
    }

    
    let tm = document.getElementById('timer')
    let rund= setInterval(countdown, 1000)

    return(
            load == true ?
            (<div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>):
            (<div className="login" style={{maxWidth:'350px', minWidth:'300px'}}>
            <div className="header">
                <h4>Otp Enter</h4>
            </div>
            <form>
            <div className="d-flex flex-column text-start">
                        <label style={{ fontSize: '1.1em' }}><div>Enter the otp sent to you</div></label>
                        <input style={{ fontSize: '1.1em' }} type="text" id='inputotp' placeholder='Password' className='form-control' required/>
                        {
                            data &&

                            <div className='text-danger'>{data.message}</div>

                        }
                        <button className='btn my-1 d-inline resendbtn' required={false} id='resend' onClick={(e)=>{resend(e)}}>Resend: <span id='timer' className='text-dark'></span></button>
                    </div>

                <div className='d-flex flex-column gap-0'>
                <button className="btn btn-sm  btn-success" onClick={(e)=>{props.props.setem(true); props.props.otpv(false)}} type='button'>Chage Detail</button>
                    <button className="btn btn-sm  btn-success" onClick={(e)=>{otpEnter(e)}} type='button'>Verify Otp</button>
                </div>
            </form>
        </div>
)
       
    )
}