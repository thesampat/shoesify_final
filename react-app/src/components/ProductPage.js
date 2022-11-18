import React, { useState } from "react"
import './CSS/productpage.css'
import Axios  from "axios"
import {useEffect} from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

export default function ProductView(){
    const [data, setdata] = useState()
    const [mainimg, setmainimg] = useState(0)
    const [size, setsize] = useState()
    const [varientColor, setVarientColor] = useState()
    const [avcolors, setavcolors] = useState()
    const [avsizes, setavsizes] = useState(0)
    const [sizewarn, setsizewarn] = useState(false)
    const [iscartadded, setidcardadded] = useState(true)
    let token = JSON.parse(localStorage.getItem('token'))
    let user = localStorage.getItem('user')


    let {product_id} = useParams()

    useEffect(()=>{
        async function fetch(){
          let res = await Axios.get(`http://${window.location.hostname}:8000/products/`+String(product_id))
          setdata(res.data)
          setavcolors(res.data.varients)
          setVarientColor(res.data.varients[0].id)
          setsize(res.data.varients[0].sizes[0].choices)
        }
  
        fetch()
        
    }, [])
    

    if(data !== undefined){

        const addtocart = (e)=>{

            if (size == 'Size'){
                setsizewarn(true)
                return
                
            }
                

            let payload = 
            {
                "user":user,
                "title":data.title,
                "qty":1,
                "max_qty":data.varients[avsizes].qty,
                "color":data.varients[avsizes].color,
                "price":data.varients[avsizes].price,
                "size":size,
                "image":data.images[mainimg].images
            }


            axios.post('http://'+window.location.hostname+':8000/Cart/', payload, {headers: {'Authorization' : `Bearer ${token}`}}).then(
                res =>{
                    console.log(e.target.id)
                    e.target.innerHTML =  '&#10003;'+'Added To Cart'
                    e.target.style.backgroundColor ='green'
                }
            )

        }



        const AvailableVarients = (selectedSize)=>{
        let result= [];

         Array.from(data.varients).map(varient=>{
            return(
            Array.from(varient.sizes).map(svr=>{
                if(svr.choices===selectedSize){
                    return(
                        result.push(varient)
                    )
                }
            })
            )
        })

        setavcolors(result)
        }
        let im = Array.from(data.images).filter(i=>i.varient==varientColor)
        return(
            <React.Fragment>
            <div className="outer bg-light m-0 p-0">
                <div className="grid m-0">
                    <div className="row m-0 p-0">
                        <div className="col-12 col-lg-4 maincol1 m-0 p-0">
                            <div className="row p-0 m-0 py-0 py-md-3">
                                <div className="col-12 col-lg-2 p-0 order-1 order-lg-0 ps-0">
                                <div className="colrsvwrapper d-flex flex-lg-column flex-wrap px-0 w-75 px-md-3 ms-0 px-lg-0">

                                {
                                    im.map((el, index)=>{
                                        return(
                                            <button className="varientImageButton my-0 py-0" onClick={()=>setmainimg(index)} key={el.id}>
                                            <img className="vimg mb-1" src={`http://${window.location.hostname}:8000`+el.images} alt="" style={{width:'100%'}}/>
                                            </button>
                                        )
                                    })
                                    
                                }
                                
                                </div>
                                </div>
                                
                                <div className="col-12 col-lg-9 p-0 m-0 ms-lg-2 px-md-4 px-lg-0">
                                    <div className="textc p-0 m-0"> 
                                    <img className="spimg" src={`http://${window.location.hostname}:8000`+im[mainimg].images} alt="" />
                                    </div>
                        
                                    <div className="controlButtons d-flex flex-wrap flex-md-wrap flex-lg-nowrap gap-3 d-none d-lg-block text-center"><br />
                                    <Link to='/cart'>
                                        {
                                            iscartadded == true ?
                                            <div className="btn rounded rounded-0 btn-warning mb-lg-0 " style={{width:'80%'}} onClick={()=>addtocart()}>Add To Cart</div>:
                                            <div className="btn rounded rounded-0 btn-warning mb-lg-0 " style={{width:'80%'}} onClick={()=>addtocart()}>&#10003; Added</div>
                                        }

                                    </Link>
                                        
                                        <div className="btn rounded rounded-0 btn-danger my-lg-3" style={{width:'80%'}}>Buy Now</div>
                                    </div>
                                </div>
    
                                <div className="controlButtons d-flex justify-content-center gap-3 d-block d-lg-none mt-1 order-2 mt-2">
                                        <div className="btn rounded rounded-0 btn-warning"  id={'addcbtn'+data.pk}  style={{width:'40%'}} onClick={(e)=>{
                                            addtocart(e)
                                        }}>Add To Cart</div>:
                                        <div className="btn rounded rounded-0 btn-danger" style={{width:'40%'}}>Buy Now</div>
                                    </div>
    
                            </div>
                        </div>
    
                        <div className="col-12 col-lg-8 text-start mt-4">
                            <span className="wr1">{data.title}</span>  
                            <div className="rating wr2">Rating - 2.5/5</div>
                            <div className="my-2">
                            <span className="currentPrice pe-3 fs-4 fw-bold r1">Rs: {data.varients[0].discount_price}</span>
                            <del><span className="actualPrice fs-4 pe-3 r2">Rs: {data.varients[0].price}</span></del>
                            <span className="text-muted fs-5 r3 ">{data.varients[0].discount}% Off</span>
                            </div>
    
                            <div className="dropdown my-3 w-25">
                            {
                                sizewarn &&
                                <h6 className="text-danger">! Please Select Size</h6>
                            }

                            <button className="btn btn-light border border rounded rounded-0 dropdown-toggle my-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {size}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <React.Fragment>
                                {Array.from(data.varients[avsizes].sizes).map((el, index)=>{
                                    return(
                                        <button className="dropdown-item" onClick={()=>{setsize(el.choices); AvailableVarients(el.choices) }} key={index}  href="#">{el.choices}</button>
                                    )
                                })}
                                </React.Fragment>
                                
                            </div>
                            </div>
    
                            <div className="fs-6 lead">Select Color :</div>
    
    
    
                            <VarientColors avcolors={avcolors} setvar={setVarientColor} images={data.images} chsizesgroup={setavsizes} setindexsize={setsize}/>
                            <br />
    
                            {   
                                data.varients[avsizes].qty == 0 ? 
                                <h6 className="text-danger">Out Of Stock</h6> :
                                <h6 className="text-success">InStock: Only {data.varients[avsizes].qty} Products Left</h6>
                            }
    
                            <h6 style={{fontFamily:'sans-serif', fontWeight:'bold'}}>Description:</h6>
                            
                            <p style={{fontFamily:'sans'}}>
                                {data.description}
                            </p>
    
    
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
    
        )
    }
    
}

const VarientColors = (props)=>{
    return(
        <div className="gridwrapper">
            <div className="d-flex flex-wrap m-0 p-0">
                <React.Fragment>
                    {
                        props.avcolors.map((el, index)=>{
                            let image = Array.from(props.images).filter(i=>i.varient==el.id)
                            return(
                                <div className="d-flex flex-column text-center" key={el.id}>
                                <button className='varientImageButton' onClick={()=>{props.setvar(el.id); props.chsizesgroup(index) ; props.setindexsize('Size')}} key={el.id}>
                                <img src={`http://${window.location.hostname}:8000`+image[0].images} style={{width:'50px', height:'50px'}} alt=""/>
                                </button>
                                <div>{el.color}</div>
                                </div>
                            )
                        })
                    }
                </React.Fragment>
               
            </div>
        </div>
    )
}