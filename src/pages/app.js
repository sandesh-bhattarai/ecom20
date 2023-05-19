import React, { useCallback, useState, useEffect } from "react";
import "./app.css";
import "../assets/css/main.css"
import { Headings } from "../component/typography/text.component";
import {  Container,  Row, Col,  } from "react-bootstrap";
import HomeBanner from "../component/banner/home.banner";
import BrandListGridComponent from "./home/component/brand-list-grid.component";
import productSvc from "../services/product.service";
import ProductCardGrid from "../component/card/single-product-card.component";


function HomePage({ name }) {
  // let [data, setData] = useState({
  //     email: "",
  //     password: ""
  // });
  //let [loading, setLoading] =useState(false);

  // useEffect(()=>{
  //     // triggers whenever any state varibale changes on the component
  //     console.log("I am always triggers")
  // })

  // useEffect(() => {
  //     console.log("I am only once when component loads")
  //     // this hook executes only once when the component first renders
  //     setLoading(true)
  // },[])
  // const getUsers = useCallback(async() => {
  //     // API call
  // }, [])
  // useEffect(()=>{
  //     // async
  //     getUsers()
  //     console.log("Only loads when loading is chaged")
  //     // this hook only executes when loading state is changed
  // }, [data])

  let [products, setProducts] = useState()
  let [loading, setLoading] = useState(true)

  const getProductLists = useCallback(async() => {
    try {
      let allProducts = await productSvc.getProductForHomePage();
      console.log(allProducts)
      setProducts(allProducts.result);
    } catch(err) {
      console.log(err)
    } finally{
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    getProductLists()
  },[getProductLists])

  return (
    <>
      
        <div className="banner-wrapper">
            <HomeBanner />
        </div>
        
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <a href="http://play.google.com/applink">
              <Headings level={4} title={"Download Andriod App"}/>
            </a>
          </Col>
          <Col sm={12} md={6}>
            <a href="http://apple.com/market/applink">
              <Headings level={4} title={"Download ios App"}/>
            </a>
          </Col>
        </Row>
      </Container>

      <BrandListGridComponent />

      <Container className="my-3 bg-light">
        <Row>
          <Col>
            <Headings level={1} title={"Featured Products"}/>
          </Col>
        </Row>
        <Row>
          {
            !loading && products && 
            products.map((product, index) => (
              <ProductCardGrid 
                key={index}
                product={product}
              />
            ))
          }
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
