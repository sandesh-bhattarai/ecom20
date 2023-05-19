import { Card } from "react-bootstrap"
import {NavLink} from "react-router-dom"
import noImage from "../../assets/images/no-image.png";

const SingleCardComponent = ({
    image="",
    title="",
    link=""
}) => {
    const imageErr = (e) => {
        e.target.src  = noImage
    }
    return (<>
        <Card border="primary" >
            <img alt="" className="card-img-top" src={image} onError={imageErr}></img>
            
                {
                    title ? <Card.Body className="py-1">
                            {
                                link 
                                    ? 
                                    <Card.Title>
                                        <NavLink to={link} className="text-primary text-center nav-link">{title}</NavLink>
                                    </Card.Title> 
                                    : <>
                                        <Card.Title className="text-primary text-center">{title}</Card.Title>
                                    </>
                            }
                        </Card.Body> : <></>
                }
            
        </Card>
    </>)
}

export default SingleCardComponent