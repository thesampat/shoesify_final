import React from 'react'
import NavBar from './components/Navbar';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';
import ProductView from './components/ProductPage';
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Orders from './components/Orders';
import About from './components/About';
import Razorpay from './components/razorpay';


function App() {
    return(
        <React.Fragment>
            <NavBar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='product/:product_id' element={<ProductView/>}></Route>
                <Route path='cart' element={<Cart/>}></Route>
                <Route path='checkout' element={<Checkout/>}></Route>
                <Route path='order' element={<Orders/>}></Route>
                <Route path='About' element={<About/>}></Route>
                <Route path='razor' element={<Razorpay/>}></Route>
            </Routes>
            
        </React.Fragment>
    )
}
    

export default App;