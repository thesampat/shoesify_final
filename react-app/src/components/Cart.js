    import axios from "axios";
    import { useState } from "react";
    import "./CSS/cart.css";
    import { useEffect } from "react";
    import { useNavigate } from "react-router-dom";

    export default function Cart() {
    const [qty, setqty] = useState([]);
    const [cartdata, setcartdata] = useState();
    const [total, settotal] = useState(0)
    let token = JSON.parse(localStorage.getItem('token'))

    const navi = useNavigate()


    useEffect(()=>{
        console.log(token, 'token test')
        axios.get('http://'+window.location.hostname+':8000/Cart/', {headers: {'Authorization' : `Bearer ${token}`}}).then(
            res=>{setcartdata(res.data['data'])
            settotal(res.data['total'])

            let qtyArry = []
            res.data['data'].map(el=>{
                return qtyArry.push({'id':el.id, 'qty':el.qty})
            })

            setqty(qtyArry)

            }
            
        )
    }, [])


    const updateQty=(e, index, value ,type, title, color, maxQty)=>{

       if(value > maxQty){
        console.log('Stop here')
        alert(`${title} \n only ${value-1} item available for now`)
        return false
       }

       if(value < 0){
        return false
       }

       let newar = qty.map(item=>{

            if (item.id == index){
                return {...item, qty:value}
            }
            else{
                return item
            }
       })

       setqty(newar)

       async function updateData(){
        let data ={'qty':value, 'id':index, 'type':type, 'title':title, 'color':color}
        let config = {headers: {'Authorization' : `Bearer ${token}`}}
        let res = await axios.put(`http://${window.location.hostname}:8000/Cart/${index}/`,data, config)

        settotal(res.data)

    }

        updateData()
    }


    return (
    <div className="card-cart text-center my-1 p-2 p-md-0 my-lg-5">
    <div className="row m-0 p-0">
    <div className="col-md-8 cart m-0  px-0 px-md-1 px-lg-2">
    <div className="title">
    <div className="row m-0 p-0">
    <div className="col-12 d-none d-md-block bg-info">
        <h4>
        <b>Shopping Cart</b>
        </h4>
    </div>
    <div className="col-12 d-block d-md-none bg-info">
        <h6>
        <b>Shopping Cart</b>
        </h6>
    </div>
    </div>
    </div>

    {
        cartdata == '' &&
        <div>
            <h3 className="fw-bold">No Cart Items</h3>
        </div>
    }
    
    
    {cartdata != undefined &&
    cartdata.map((el, index) => {
    return (
    <div className="row m-0 p-0 border-top border-bottom" id={'item_'+el.id} key={index}>
        <div className="row m-0 p-0 main align-items-center">
        <div className="col-2">
            <img
            className="img-fluid"
            src={'http://'+window.location.hostname+':8000'+el.image}
            />
        </div>
        <div className="col-4 col-md-3 p-0 p-md-1 text-start">
            <div className="row m-0 p-0">{el.title}</div>
            <span
            className="row m-0 p-0 lead d-none d-md-block text-start"
            style={{ fontSize: "0.7em" }}
            >
            Color: {el.color}
            </span>
            <span className="row m-0 p-0">&euro;{el.price}</span>
        </div>
        <div className="col p-1 p-md-1">
            <div
            className="btn d-inline"
            onClick={(e) => updateQty(e, qty[index]['id'], (qty[index]['qty']-1), '+', el.title, el.color, el.max_qty)}
            >
            -
            </div>
            <a href="#" className="border">
            1
            </a>
            <div    
            className="btn d-inline"
            onClick={(e) => updateQty(e, qty[index]['id'], (qty[index]['qty']+1), '-', el.title, el.color, el.max_qty)}
            >
            +
            </div>
        </div>
        <div className="col qty m-0 p-0">{qty[index]['qty']}</div>
        <div className="col btn btn-inline border border-0 close" id={el.id} onClick={(e)=>{
            let item = document.getElementById('item_'+e.target.id)
            item.style.display = 'None'
            axios.delete(`http://${window.location.hostname}:8000/Cart/${e.target.id}`, {headers: {'Authorization' : `Bearer ${token}`}})
        }}>
            &#10005;
        </div>
        </div>
    </div>
    );
    })}
    

    <div className="back-to-shop">
    <a href="#">
    <span className="text-muted">Back to shop</span>
    </a>
    </div>
    </div>

    <div className="col-md-4 summary">
    <div>
    <h5>
    <b>Summary</b>
    </h5>
    </div>
    <hr />
    <div className="row m-0 p-0">
    <div className="col" style={{ paddingLeft: "0" }}>
    ITEMS {Array.from(qty).length}
    </div>
    <div className="col text-right">&euro;{total}</div>
    </div>
    <form>
    <p>SHIPPING</p>
    <select>
    <option className="text-muted">
        Standard-Delivery- &euro;5.00
    </option>
    </select>
    <p>GIVE CODE</p>
    <input id="code" placeholder="Enter your code" />
    </form>
    <div
    className="row m-0 p-0"
    style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
    >
    <div className="col">TOTAL PRICE</div>
    <div className="col text-right">&euro;{total+5}</div>
    </div>

    <button className="btn btn-primary" onClick={
        (e)=>{
            total == 0 ?
            (alert('No item for checkout')):
            (navi('/checkout'))
        }
    }>CHECKOUT</button>
    </div>
    </div>
    </div>
    );
    }
