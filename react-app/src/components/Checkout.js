import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function   (){

  const [qty, setqty] = useState([]);
    const [cartdata, setcartdata] = useState();
    const [total, settotal] = useState(0)
    let token = JSON.parse(localStorage.getItem('token'))
    const navigate = useNavigate()


    useEffect(()=>{
        axios.get('http://'+window.location.hostname+':8000/Cart/', {headers: {'Authorization' : `Bearer ${token}`}}).then(
            res=>{setcartdata(res.data['data'])
            settotal(res.data['total'])
            }
            
        )
    }, [])


    const submitOrder = (e)=>{
      console.log(cartdata)
      let cartItems = Array.from(cartdata).map(el=>el.id)
      let data = {'Amount':total, "Order_id":1, 'Item':cartItems}
      let config = {headers: {'Authorization' : `Bearer ${token}`}}

      console.log('wroking...')

      async function sendRequest(){
        let res = await axios.post(`http://${window.location.hostname}:8000/pay/2`, data, config)
        console.log(res.data)
      }

      sendRequest()
      
      e.preventDefault()
      navigate('/razor')


    }

    return(
    <div className="container">
    <div className="py-5 text-center">
      <h2>Checkout form</h2>
    </div>

    <div className="row">
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Your cart</span>
          <span className="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul className="list-group mb-3">

          
          {
          cartdata != undefined?

          (cartdata.map((el, index)=>{
            return(
              <li className="list-group-item d-flex justify-content-between lh-condensed" key={index}>
              <div>
                <h6 className="my-0" style={{maxWidth:'300px'}}>{el.title}</h6>
                <small className="text-muted">qty: {el.qty}    Color:{el.color}</small>
              </div>
               <span className="text-muted">${el.qty*el.price}</span>
            </li>
            )
          })):(
            <li className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">No Cart Items</h6>
            </div>
          </li>
          )
        }
          <li className="list-group-item d-flex justify-content-between bg-light">
            <div className="text-success">
              <h6 className="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span className="text-success">-$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>${total-5}</strong>
          </li>
        </ul>

        <form className="card p-2">
          <div className="d-flex align-items-center gap-1">
            <input type="text" className="form-control" placeholder="Promo code"/>
            <div className="input-group-append al">
              <button type="submit" className="btn btn-secondary my-0">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-8 order-md-1">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" noValidate>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input type="text" className="form-control" id="firstName" placeholder=""  required/>
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input type="text" className="form-control" id="lastName" placeholder="" required/>
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input type="text" className="form-control" id="username" placeholder="Username" required/>
              <div className="invalid-feedback" style={{width: '100%'}}>
                Your username is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
            <input type="email" className="form-control" id="email" placeholder="you@example.com"/>
            <div className="invalid-feedback">
              Please enter a valid email address htmlFor shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
            <div className="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite"/>
          </div>

          <div className="row">
            <div className="col-md-5 mb-3">
              <label htmlFor="country">Country</label>
              <select className="custom-select d-block w-100" id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <select className="custom-select d-block w-100" id="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="zip">Zip</label>
              <input type="text" className="form-control" id="zip" placeholder="" required/>
              <div className="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>
          <hr className="mb-4"/>
          <div className="d-flex align-items-center">
            <label className="">Shipping address is the same as my billing address</label>
            <input type="checkbox" className="custom-control-input" id="same-address"/>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <label className="">Save this information htmlFor next time</label>
            <input type="checkbox" className="custom-control-input" id="save-info"/>
          </div>
          <button className="btn btn-primary btn-lg btn-block" onClick={(e)=>submitOrder(e)}>Continue to checkout</button>
        </form>
      </div>
    </div>

    <footer className="my-5 pt-5 text-muted text-center text-small">
      <p className="mb-1">&copy; 2017-2019 Company Name</p>
      <ul className="list-inline">
        <li className="list-inline-item"><a href="#">Privacy</a></li>
        <li className="list-inline-item"><a href="#">Terms</a></li>
        <li className="list-inline-item"><a href="#">Support</a></li>
      </ul>
    </footer>
  </div>
    )
}