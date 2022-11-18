import React, { useState } from "react";
import './CSS/NavBar.css'
import { Login } from "./login";
import ReactDOM from 'react-dom'
import axios from "axios";



export default function NavBar() {
  let token = JSON.parse(localStorage.getItem('token'))

  let currentUser = localStorage.getItem('user')
  if (currentUser == null){
    currentUser = 'None'
  }

  let User_Name = localStorage.getItem('user')
  let [user, setuser] = useState(currentUser)
  const [cartqty, setcartqty] = useState(0)


  if (user !== 'None'){
      axios.get(`http://${window.location.hostname}:8000/Cart/qty/`, {headers: {'Authorization' : `Bearer ${token}`}}).then(
      res=>{
        if (res.data.qty__sum >=1){
          setcartqty(res.data.qty__sum)
        } 
        else{
          setcartqty(0)
        }
        }

    )
  }

  
    
 
  

  const loginPortal =  document.getElementById('loginPortal');
  
  const[show, setShow] = useState(false)

  const logout = async()=>{
    localStorage.removeItem('user')
    let token = localStorage.getItem('token')
    await axios.post('http://'+window.location.hostname+':8000/api/token/refresh/', {'token':token})
    localStorage.removeItem('token')
    setuser('None')
  }


  return ( 
    <React.Fragment>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark pe-3 ps-1 d-flex py-sm-1 py-md-0">
      <div className="justify-content-center d-none d-sm-oblock" href="#">          
      <span className="badge text-light fs-5 lh-0">ShoesIt</span>
      </div>

      <button className="btn border-0 m-0 d-block d-sm-none my-auto"  style={{width:'10%'}} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="navigation">     
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-list text-light" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
      </button>

      <div className="justify-content-center d-block d-sm-none" href="#">          
        <span className="badge text-light fs-5 lh-0 ps-2">ShoesIt</span>
      </div>
      
      <div className="offcanvas offcanvas-start bg-dark" style={{width:'260px'}} id="offcanvasNavbar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-light" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" className="btn-close bg-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-start flex-grow-1 pe-3 p-1">
            <li className="nav-item ps-2">
              <a className="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item ps-2">
              <a className="nav-link" aria-current="page" href="/">Products</a>
            </li>
            <li className="nav-item ps-2">
              <a className="nav-link" aria-current="page" href="about">About</a>
            </li>
            <li className="nav-item ps-2">
              <a className="nav-link" aria-current="page" href="contacts">Contacts</a>
            </li>
          </ul>
        </div>
      </div>

        

      <div className="authentication">
            <div className="innerStrip d-flex justify-content-between gap-1">
              {user == 'None' &&
              <div className='Login-signup button'>
                <button className="btn btn-sm border border-2 border-dark bg-light fw-bold rounded-pill text-light text-dark m-0" onClick={()=>{setShow(true); loginPortal.style.display = 'Block'}}>Login</button>
              </div>
              }
            {user !== 'None' &&
            (
              <React.Fragment>
                <div className="d-flex gap-2">
                  <a href="/cart" style={{textDecoration:'none'}}>
                  <span className="Cart d-flex order-0 align-items-around text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart2 text-light" viewBox="0 0 16 16">
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
                <span className="d-flex align-items-center">
                ({cartqty})
                </span>
              </span>
                  </a>
               

              <div className="AccountButton d-flex align-items-center d-none d-sm-block">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle text-light me-1" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
              </span>
              <span className="text-light">
                {User_Name}
              </span>
              </div>

                <a href="/" style={{textDecoration:"none"}}>
                <div className="btn btn-sm btn-danger my-auto d-sm-none d-md-block" onClick={()=>logout()}>Logout</div>
                </a>
              

              </div>
              </React.Fragment>
              )
              }
              </div>
      </div>
    </nav>

  {show && ReactDOM.createPortal(
    <Login windowState={setShow} setuser={setuser}/>, 
    loginPortal)}

  </React.Fragment>

  );
}
