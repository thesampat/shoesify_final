import React, { useEffect, useState } from "react";
import "./CSS/home.css";
import Axios from 'axios'
import axios from "axios";

var backend = `http://${window.location.hostname}:8000`

export default function Home() {
  const [data, setdata] = useState()
  const [banners, setbanners] = useState()

  useEffect(()=>{
      async function fetch(){
        let res = await Axios.get(`http://${window.location.hostname}:8000/products/`)
        setdata(res.data)
        

        let res2 = await axios.get(`http://${window.location.hostname}:8000/CarouselP/`)
        setbanners(res2.data)
      }

      fetch()

      
  }, [])


  if (data !== undefined && banners !== undefined){
    let banners1 = Array.from(banners).filter(el=>el.title==1)
    let banners2 = Array.from(banners).filter(el=>el.title==2)
    return (
      <div className="HomeWrapper mx-0 mx-md-1">
        <div className="carosule">
          <div className="carocontainer d-flex">
            <div className="w-100"> 
              <Carosule props={{'data':banners1}}/>
            </div>
            <div className="w-100 d-none d-lg-block">
              <Carosule props={{'data':banners2, 'id':2}}/>
            </div>
          </div>
        </div>
  
        <div className="Quad mx-0 mx-md-2 bg-light pt-1">
          <Quad />
        </div> 
  
        <div className="horizontalSlider">
          <Slider />
        </div>
        <div className="gridProducts bg-light pt-1">
          <GridRep pros={data}/>
        </div>
  
        <footer></footer>
      </div>
    );
  }
  
}

function Carosule(props) {
  let payload = props.props.data
  let cid = props.props.id

  return (

  <div id={'carouselExampleIndicators'+cid} class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target={'#carouselExampleIndicators'+cid} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target={'#carouselExampleIndicators'+cid} data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target={'#carouselExampleIndicators'+cid} data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" style={{minHeight:'220px', maxHeight:'300px'}}>

    <div class="carousel-item active">
      {console.log(payload[0].image)}
      <img src={backend+payload[0].image} class="d-block w-100 cimg" alt="..."/>
    </div>
    {
      Array.from(payload).slice(1, ).map(el=>{  
        return(
          <div class="carousel-item">
        <img src={backend+el.image} class="d-block w-100 cimg" alt="..."/>
      </div>
        )
        
      })
    }
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target={'#carouselExampleIndicators'+cid} data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target={'#carouselExampleIndicators'+cid} data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>



  );
}

function Quad() {
  return (
    <div className="container-block d-none d-md-block">
      <div className="row mx-auto p-0 px-md-1 p-lg-2 p-xl-1 g-1">
            <div className="col-3"> 
              <div className="card my-0  border border-none rounded rounded-0 shadow shadow-4 cardq text-white">
                <img
                  className="card-img imgq rounded rounded-0"
                  src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg"
                  alt="Main"
                />
                <div className="card-img-overlay text-dark text-dark">
                  <h3 className="card-title d-none d-md-block">Card title</h3>
                  <p className="card-text d-none d-md-block">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>

                  <div className="text">Get it on Best Price</div>
                  <div>$50</div>

                </div>
              </div>
            </div>
            <div className="col-6"> 
              <div className="card my-0  border border-none rounded rounded-0 shadow shadow-4 cardq text-white">
                <img
                  className="card-img imgq rounded rounded-0"
                  src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg"
                  alt="Main"
                />
                <div className="card-img-overlay text-dark text-dark">
                  <h3 className="card-title d-none d-md-block">Card title</h3>
                  <p className="card-text d-none d-md-block">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>

                  <div className="text">Get it on Best Price</div>
                  <div>$50</div>

                </div>
              </div>
            </div>
            <div className="col-3"> 
              <div className="card my-0  border border-none rounded rounded-0 shadow shadow-4 cardq text-white">
                <img
                  className="card-img imgq rounded rounded-0"
                  src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg"
                  alt="Main"
                />
                <div className="card-img-overlay text-dark text-dark">
                  <h3 className="card-title d-none d-md-block">Card title</h3>
                  <p className="card-text d-none d-md-block">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>

                  <div className="text">Get it on Best Price</div>
                  <div>$50</div>

                </div>
              </div>
            </div>
      </div>
    </div>
  );
}

function Slider() {
  const counts = [1, 2];
  return (
    <div
      id="carouselExampleDark"
      className="carousel carousel-dark slide"
      data-bs-ride="true"
    > 
      <div className="carousel-inner p-0">
      <div className="carousel-item active">
            <div className="poductList d-flex justify-content-center p-1 rounded rounded-0">
              <div className="h-100 d-none d-xl-block">
                <Card />
              </div>
              <div className="h-100 d-none d-md-block">
                <Card />
              </div>
              <div className="h-100 d-none d-xxl-block">
                <Card />
              </div>
              <div className="h-100 d-none">
                <Card />
              </div>
              <div className="h-100">
                <Card />
              </div>
              <div className="h-100">
                <Card />
              </div>
            </div>
          </div> 
        {counts.map((el) => {
          return (
            <div className="carousel-item" key={el}>
            <div className="poductList d-flex justify-content-center p-1 rounded rounded-0">
              <div className="h-100 d-none d-xl-block">
                <Card />
              </div>
              <div className="h-100 d-none d-md-block">
                <Card />
              </div>
              <div className="h-100 d-none d-xxl-block">
                <Card />
              </div>
              <div className="h-100 d-none">
                <Card />
              </div>
              <div className="h-100">
                <Card />
              </div>
              <div className="h-100">
                <Card />
              </div>
            </div>
          </div> 
          );
        })}
      </div>
      <div className="carousel-indicators my-0" style={{position:'initial', zIndex:'0'}}>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
    </div>
  );
}

function GridRep(props) {
 
  let product = props.pros
  return (
    <div className="grid px-3 px-md-2">
      <div className="row g-2 justify-content-around">
        {product.map((p, index)=>{
          return(
            <Cardi product={p} key={index}/>
          )
        })}
      </div>
    </div>
  );
}

function Card() {


  return (
    <div
      className="card my-0 mt-1 mx-md-2 mx-1 rounded-0"
      style={{ minWidth: "8rem", maxHeight: "10%" }}
    >
      <img
        src="https://www.greensole.com/asset/site_images/slider/924388file1.png?v=0.1"
        className="card-img rounded-0"
        style={{ height: "150px" }}
        alt="..."
      />
      <div className="cardi p-1">
        <div className="card-title slidertitle lh-0 m-0 fw-bold">Shoes Blue Shoes Blue Shoes Blue Shoes Blue Shoes Blue Shoes Blue Shoes Blue Shoes Blue</div>
        <p
          className="card-text d-none"
          style={{ overflow: "hidden", maxHeight: "50%", height: "50px" }}
        >
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className="d-flex justify-content-around">
          <div className="text-center">140$</div>
          <div className="lead fs-6 text-center">Shoes</div>
        </div>
      </div>
    </div>
  );
}

function Cardi(props) {

  let product= props.product
  
  return (
    <React.Fragment>     
          <a href={'product/'+product.pk} className="gx-1" style={{color:'black', textDecoration:'none', width:'unset'}}>
          <div className="col gridcard border p-0">
          <div className="card my-0 cardgrid rounded rounded-0 border border-0 w-100" style={{height: "fit-content"}}>
            <i className="bi bi-heart-fill"></i>
            <img
              style={{ height: "160px" }}
              src={backend+product.images[0].images}
              className="card-img-top rounded rounded-0"
              alt="..."
            />
            <div className="card-body p-2 text-start">
              <h6 className="card-title mb-0 gridcardtitle text-start" style={{height:'40px'}}>
                {product.title}
              </h6>
              
              <h4 className="card-text d-inline text-danger">Rs: {product.varients[0].discount_price}</h4>
              <span className="ps-3">{product.varients[0].discount}% off</span>
            </div>
          </div>
        </div>
        </a>
    </React.Fragment>
  );
  
}
