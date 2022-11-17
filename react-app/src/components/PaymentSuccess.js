<<<<<<< HEAD
=======
import React from "react";
import axios from "axios";

function paymentSuccess() {

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
  const result = await axios.get("http://127.0.0.1:8000/pay");

  if (!result) {
      alert("Server error. please check are you onlin?");
      return;
  }

//   Getting the order details back
   const {id, merchantId=null , amount=null,currency=null,orderId=null } = result.data;

   console.log(result.data['id'], 'teset')

  const options = {
      key: 'rzp_test_QPGJfseF5g03Qp',
      amount: amount,
      currency: 'INR',
      name: "Razorpay Testing",
      description: "Test Transaction",
      order_id: id,
      callback_url: "http://127.0.0.1:8000/paymentHandle/",
      redirect: true,
      prefill: {
        name: "Swapnil Pawar",
        email: "swapnil@example.com",
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

export default paymentSuccess;
>>>>>>> parent of 034df02... 1. Fixed axios network error in other devices
