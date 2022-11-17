import React, { useState } from 'react'

export default function About(){
    const [arr, setarr] = useState(
        [
            {'id':1, 'qty':10},{'id':2, 'qty':20},{'id':3, 'qty':30} 
        ]
    )

    return(
        <React.Fragment>
        <h1>Hello</h1>
        
        {console.log(...arr)}
        <div className='text-center d-flex justify-content-center gap-1'>
        {arr.map((el, index)=>{
            return(
                <div className='btn btn-dark text-center fw-bold' style={{width:'40px'}} key={index}>{el['qty']}</div>
            )
        })}
        </div>

        <input type="number" className='form-control mx-auto my-2' value={0} id='1' onChange={(e)=>{
            let newarr = 
                arr.map(item=>{
                        if(item.id == e.target.id) 
                            {
                             return {...item, qty:(item.qty+1)}
                        }
                        else{
                            return item
                        }
                    })
                setarr(newarr)
                
        }} name="" style={{width:'100px'}} />

<input type="number" className='form-control mx-auto my-2' value={0} id='2' onChange={(e)=>{
            let newarr = 
                arr.map(item=>{
                        if(item.id == e.target.id) 
                            {
                             return {...item, qty:(item.qty+1)}
                        }
                        else{
                            return item
                        }
                    })
                setarr(newarr)
                
        }} name="" style={{width:'100px'}} />

<input type="number" className='form-control mx-auto my-2' value={0} id='3' onChange={(e)=>{
            let newarr = 
                arr.map(item=>{
                        if(item.id == e.target.id) 
                            {
                             return {...item, qty:(item.qty+1)}
                        }
                        else{
                            return item
                        }
                    })
                setarr(newarr)
                
        }} name="" style={{width:'100px'}} />

    </React.Fragment>
    )
}