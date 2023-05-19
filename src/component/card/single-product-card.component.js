import { Badge, Card, Col } from "react-bootstrap"
import {NavLink} from "react-router-dom"
import noImage from "../../assets/images/no-image.png";

const ProductCardGrid = ({product}) => {

    const imageErr = (e) => {
        e.target.src  = noImage
    }
    return (<>
    <Col sm={6} md={3}>
        <Card border="primary" >
            <img alt="" className="card-img-top" src={process.env.REACT_APP_IMAGE_URL+"/"+product.images[0]} onError={imageErr}></img>
            
                <Card.Body className="py-1">    
                    <Card.Title >
                        <NavLink
                        style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} 
                            to={"/product/"+product.slug} 
                            className="text-primary text-center nav-link">
                            {product.title}
                        </NavLink>
                    </Card.Title> 

                    <p>
                        Npr. {product.actualPrice} {
                            product.discount ? <><del className="text-danger">Npr. {product.price}</del></> : <></>
                        }
                    </p>

                    <p>
                        {
                            product.categories ? <>
                                {
                                    product.categories.map((item, ind) => {
                                        return <Badge bg="warning me-1" key={ind}>
                                            <NavLink className={"text-white"} style={{textDecoration: "none"}} to={'/category/'+item.slug}>
                                            {item.title}
                                            </NavLink>
                                        </Badge>
                                    })
                                }
                            </> : <></>
                        }
                    </p>

                    {/* Add to cart Button */}
                    
                    
                </Card.Body> 
            
        </Card>
    </Col>
    
    </>)
}

export default ProductCardGrid;