import { Alert, Col, Container, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (<>
        
        <Container className="mt-5">
            <Row>
                <Col>
                    <Alert variant="danger">
                        The page you are looking for does not exists!!
                        <NavLink className="alert-link" to="/"> Go to Home</NavLink>
                    </Alert>
                </Col>
            </Row>
        </Container>
    </>)
}

export default ErrorPage;