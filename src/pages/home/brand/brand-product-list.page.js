import { Container, Row, Col, Alert } from "react-bootstrap"
import { Headings } from "../../../component/typography/text.component"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import brandSvc from "../../../services/brand.service"
import LoadingComponent from "../../../component/loading/loading.component"
import ProductCardGrid from "../../../component/card/single-product-card.component"

const BrandProductList = () => {
    let [products, setProducts] = useState()
    let params = useParams()
    let [loading, setLoading] = useState(true);

    let loadAllProducts = useCallback(async() => {
        try {
            
            let response = await brandSvc.getProductsByBrandSlug(params.brandSlug)
            setProducts(response.result)
        } catch(error) {
            console.log(error)
            toast.warning(error?.msg)
        } finally{
            setLoading(false);
        }
    }, [params.brandSlug])
    useEffect(() => {
        loadAllProducts()
    }, [])
    return (<>
        <Container>
            {
                loading ? <LoadingComponent /> : <>
                
                <Row className="my-5 bg-light">
                        <Col>
                            <Headings level={1} className={"text-center"} title={"Brand Detail"}>
                            </Headings>
                        </Col>
                    </Row>
                    <Row>
                        {
                            products && products.length ? <>
                                {
                                    products.map((product, index) => (
                                        <ProductCardGrid 
                                            product={product}
                                            key={index}
                                        />
                                    ))
                                }
                            </> : <>
                            <Alert variant="danger">
                                Product does not exists on the brand. Try another brand...    
                            </Alert></>
                        }
                    </Row>
                </>
            }
        </Container>
    </>)
}

export default BrandProductList