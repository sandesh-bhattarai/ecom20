import { Container, Row, Col } from "react-bootstrap"
import { InfinitySpin } from "react-loader-spinner"

const LoadingComponent = () => {
    return (<>
    <Container>
    
    <Row>
        <Col style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <InfinitySpin />
        </Col>
    </Row>

    </Container>
    </>)
}

export default LoadingComponent;