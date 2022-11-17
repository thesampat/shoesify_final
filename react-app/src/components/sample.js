import React from 'react'
import { useState } from 'react'

export function Sample(){

    const[right, setright] = useState('0')

    return(
        <React.Fragment>
        <div className='text-center bg-warning is good'>
            <h1>Count It!!!</h1>
        </div>

        <div className=''>
            
            <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-4 justify-content-center p-2">
                    <button id='left' className='border border-dark p-2 btn stroke-none'>10</button>
                    <h4 id='right' className='border border-dark p-2'>{right}</h4>
                    <h3 id='equal' className='p-2'>=</h3>
                    <h3 id='answer' className='p-2'>{parseInt(right) + parseInt(10)}</h3>
                </div>
                    <div className="d-flex justify-content-center">
                        <label htmlFor="countCakes">Cakes :</label>
                        <input type="number" onChange={(e)=>{setright(e.target.value)}}/>
                    </div>
                <div>

                </div>
            </div>

        </div>

        </React.Fragment>

        
       )
    
    }