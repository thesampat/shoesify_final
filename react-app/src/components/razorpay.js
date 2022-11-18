import React from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Razorpay() {
const naivgate = useNavigate()
let token = JSON.parse(localStorage.getItem('token'))

//Function to load razorpay script for the display of razorpay payment SDK.
  function loadRazorpayScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

//function will get called when clicked on the pay button.
async function displayRazorpayPaymentSdk() {

  const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
  }

  // creating a new order and sending order ID to backend
  let config = {headers: {'Authorization' : `Bearer ${token}`}}
  const result = await axios.get("http://"+window.location.hostname+":8000/pay/2", config);

  if (!result) {
      alert("Server error. please check are you onlin?");
      return;
  }

//   Getting the order details back
   const {Amount, razorpay_order_id,  merchantId=null, currency=null,order_Id=null} = result.data[0];

   console.log(Amount, razorpay_order_id, 'teset')

  const options = {
      key: 'rzp_test_QPGJfseF5g03Qp',
      amount: (Amount*100),
      currency: 'INR',
      name: "Razorpay Testing",
      description: "Test Transaction",
      order_id: razorpay_order_id,
      handler: async function (response) {
        const razorpay_payment_id = response.razorpay_payment_id
        const razorpay_order_id = response.razorpay_order_id
        const razorpay_signature = response.razorpay_signature

        const res = await axios.post(`http://${window.location.hostname}:8000/paymentHandle/`, {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature
        })

        if (res.data.status == 1){
            alert('Payment Successfull')
            let data2 = {'Status':2}
            for(let item of result.data[0].Item){
                const result = await axios.post("http://"+window.location.hostname+":8000/Cart/"+item.id+"/Status/", data2 ,config);
            }
            naivgate('/order')

        }
        else{
            let data2 = {'Status':3}
            for(let item of result.data[0].Item){
                const result = await axios.post("http://"+window.location.hostname+":8000/Cart/"+item.id+"/Status/", data2 ,config);
            }
            alert('Payment Failed')
            naivgate('/cart')
        }
        console.log(res)
    },
      prefill: {
        name: "Sampatl Pawar",
        email: "sampatPawar@example.com",
        contact: "9999999999",
    },
      notes: {
          address: "None",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

    return (
        <div className="App">
            <header className="App-header">
                <p>Razorpay Payments ! Try it Once </p>
                <button className="App-link btn btn-dark" onClick={displayRazorpayPaymentSdk}>
                    Pay Now To Test
                </button>
            </header>
        </div>
    );
}

export default Razorpay;