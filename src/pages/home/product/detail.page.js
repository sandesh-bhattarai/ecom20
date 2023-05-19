import { useCallback, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import productSvc from "../../../services/product.service";
import LoadingComponent from "../../../component/loading/loading.component";
import { Badge, Col, Container, Row, Form, Button } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import { Headings } from "../../../component/typography/text.component";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCartList } from "../../../reducer/cart.reducer";

const ProductDetailPage = () => {
    let [detail, setDetail] = useState();
    let params = useParams();
    let [loading, setLoading] = useState(true);
    let [images, setImages] = useState();
    let [qty, setQty] = useState(0);
    const dispatch = useDispatch();

    const loadProductDetail = useCallback(async() => {
        try {
            let response = await productSvc.getProductBySlug(params.slug)
            let product = response.result

            let allImages = [];

            allImages = product.images.map((img) => {
                return {
                    original: process.env.REACT_APP_IMAGE_URL+"/"+img,
                    thumbnail: process.env.REACT_APP_IMAGE_URL+"/"+img
                }
            })
            setImages(allImages)
            setDetail(product)
        } catch(error) {
            console.log("exceptionL: ", error)
        } finally{
            setLoading(false)
        }
    }, [])

    const handleAddToCart = (e) => {
        e.preventDefault();
        let cartItem = {
            productId: detail._id,
            qty: qty
        }
        dispatch(setCartList(cartItem));
    }
    useEffect(() =>{
        loadProductDetail()
    },[loadProductDetail])
    
    return (<>
        {
            loading ? <LoadingComponent /> :<>
                <Container className="my-5">
                    <Row>
                        <Col sm={12} md={4}>
                            {
                                images && <ImageGallery items={images} />
                            }
                        </Col>
                        <Col sm={12} md={8}>
                            <Headings level={1} className={"text-center"} title={detail.title}/>
                            <hr />
                            <p>
                                <strong>Categories: </strong>
                                {
                                detail.categories && detail.categories.map((cat,index) => (
                                    <Badge key={index} bg="warning me-1" >
                                        <NavLink className={"text-white"} to={'/category/'+cat.slug} style={{textDecoration: "none"}}>
                                            {cat.title}
                                        </NavLink>
                                    </Badge>
                                ))
                            }
                            </p>
                            {
                                detail.brand 
                                 && 
                                 <p>
                                    <strong>Brand: </strong>
                                    <Badge bg="info">
                                        <NavLink className={"text-white"} to={'/brand/'+detail.brand.slug} style={{textDecoration: "none"}}>
                                            {detail.brand.title}
                                        </NavLink>
                                    </Badge>
                                 </p>
                            }
                            <p>
                                <strong>Price: </strong>
                                <span className="me-2">
                                    Npr. {detail.actualPrice}
                                </span>
                                {
                                    detail.discount ? <>
                                        <del className="text-danger">
                                            Npr. {detail.price}
                                        </del>
                                    </> : <></>
                                }
                            </p>
                            <div>
                                <Form onSubmit={handleAddToCart}>
                                    <Form.Group className="row mb-3">
                                        <Col sm={12} md={8}>
                                            <Form.Control 
                                                type="number"
                                                size="sm"
                                                name="qty"
                                                onChange={(e) => {
                                                    setQty(e.target.value)
                                                }}
                                                placeholder="Enter your Quantity..."
                                                required
                                            />
                                        </Col>
                                        <Col sm={12} md={4}>
                                            <Button variant="warning" type="submit" size="sm">
                                                <FaPlus /> Add to Cart
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={12}>
                            <Headings level={4} title="Description" />
                        </Col>
                        <Col sm={12} dangerouslySetInnerHTML={{
                            __html: detail.description
                        }}>
                            
                        </Col>
                    </Row>

                </Container>
            </>
        }
    
    </>)
}

export default ProductDetailPage;