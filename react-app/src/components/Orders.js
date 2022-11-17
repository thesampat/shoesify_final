import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Orders() {

  let token = JSON.parse(localStorage.getItem('token'))
  let config = {headers: {'Authorization' : `Bearer ${token}`}}
  const [data, setdata] = useState()

  useEffect(()=>{
    const getData = async ()=>{
      let res = await axios.get(`http://${window.location.hostname}:8000/pay/1`, config)
      setdata(res.data)
    }
    getData()

  }, [])

  
  return (
    data !== undefined &&
    
    Array.from(data).map(el=>{
      console.log(el)
      return (
        <div className="container-fluid my-sm-0 my-md-3 my-lg-5 d-sm-flex justify-content-center p-sm-0 p-md-1 pd-lg-4">
        <div className="card px-2 w-100">
          <div className="card-header bg-white">
            <div className="row">
              <div className="col d-flex flex-wrap justify-content-around align-items-center">
                <p className="text-muted">
                  {" "}
                  Order ID{" "}
                  <span className="font-weight-bold text-dark">{el.Order_id}</span>
                </p>
                <p className="text-muted">
                  {" "}
                  Place On{" "}
                  <span className="font-weight-bold text-dark">
                    12,March 2019
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>

          {(Array.from(el.Item).map(el=>{
            return(
              <React.Fragment>
              <div className="card-body">
              <div className="media flex-column flex-sm-row">
                <div className="media-body">
                  <div className="d-flex flex-wrap justify-content-start justify-md-content-start gap-3 gap-md-2 gap-lg-5 align-items-center">
              
                  <img
                  className="align-self-center img-fluid"
                  src= {'http://'+window.location.hostname+':8000'+el.image}
                  width="180 "
                  height="180"
                  />
                <h5 className="bold d-none d-md-block">{el.title}</h5>
                <h6 className="bold d-block d-md-none">{el.title}</h6>
                <p className="text-muted"> Qt: {el.qty}</p>
                <h4 className="mt-3 mb-4 bold d-none d-md-block ">
                  {" "}
                  <span className="mt-2">&#x20B9;</span> 1,500{" "}
                  <span className="small text-muted">via (COD) </span>
                </h4>
  
                <h5 className="mt-0 mb-4 bold d-block d-md-none">
                  {" "}
                  <span className="mt-2">&#x20B9;</span> 1,500{" "}
                  <span className="small text-muted">via (COD) </span>
                </h5>
  
                </div>
              <p className="text-muted">
                  Tracking Status on: <span className="Today">11:30pm, Today</span>
              </p>
                <button type="button" className="btn m-0 m-md-2 btn-outline-primary d-flex">
                  Reached Hub, Delhi
                </button>
              </div>
            </div>
          </div>
          <div className="row px-3">
            <div className="col">
              <ul id="progressbar">
                <li className="step0 active " id="step1">
                  PLACED
                </li>
                <li className="step0 active text-right" id="step2">
                  SHIPPED
                </li>
                <li className="step0  text-muted text-right" id="step3">
                  DELIVERED
                </li>
              </ul>
            </div>
          </div>
          <div className="card-footer p-0 p-md-2 bg-dark opacity-2 px-sm-3 pt-sm-4 px-0">
            <div className="row text-center">
              <div className="col  my-auto  border-line ">
                <div className="btn btn-sm d-inline px-5 btn-danger">Cancel Order</div>
              </div>
              <div className="col my-auto  border-line ">
                <div className='btn btn-sm d-inline px-5 btn-danger'>Pre-pay</div>
              </div>
            </div>
          </div>
          <br/>
          </React.Fragment>
            )
          }))}

          
        </div>
      </div>
      )

    })

  );
}
