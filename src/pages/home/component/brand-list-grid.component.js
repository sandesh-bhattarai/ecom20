import { Container, Row, Col  } from "react-bootstrap";
import { Headings } from "../../../component/typography/text.component";
import SingleCardComponent from "../../../component/card/single-card.component";
import { useEffect, useState, useCallback } from "react";
import brandSvc from "../../../services/brand.service";

export const SingleBrandGridItem = ({image=null, title=null, link=null}) => {
    
    return (<>
    <Col sm={6} md={2} className="p-1">
            <SingleCardComponent 
                image={image}
                title={title}
                link={link}
            />
        </Col>
    </>)
}

const BrandListGridComponent = ({fluid=true}) => {

    let [brandList, setBrandList] = useState();

    let getActiveBrand = useCallback(async() =>{
        try{
            let response = await brandSvc.getBrandForHomePage();
            setBrandList(response.result)
        } catch(err) {
            console.log("err", err)
        }
    }, [])

    useEffect(() => {
        getActiveBrand()
    }, [])

    return (<>
    <Container className="my-3" fluid={fluid}>
            <Row>
            <Col sm={12} md={12}>
                <Headings level={3} title={"Featured Brand"} className={"bg-light text-danger text-center py-1"} />
            </Col>
            </Row>

            <Row>
                {
                    brandList && brandList.map((brand, ind) => (
                        <SingleBrandGridItem 
                            key={ind}
                            link={"/brand/"+brand.slug}
                            title={brand.title}
                            image={process.env.REACT_APP_IMAGE_URL+"/"+brand.image}
                        />
                    ))
                }
            </Row>
        </Container>
    </>)
}

export default BrandListGridComponent;