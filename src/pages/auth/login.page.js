import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap"
import { Headings } from "../../component/typography/text.component"
import { useFormik } from "formik"
import * as Yup from "yup";

import { toast } from "react-toastify";
import authSvc from "./auth.serivce";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaSpinner, FaTrash } from "react-icons/fa";
import AppConstants from "../../config/constants";
import LoadingComponent from "../../component/loading/loading.component";
import { useDispatch } from "react-redux";
import { setDetail } from "../../reducer/auth.reducer";

const LoginPage = () =>{
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [loading, setLoading]= useState(false);

    let rules = Yup.object({
        email: Yup.string().email().required("Email is required..."),
        password: Yup.string().required()
    })
    let formik = useFormik({
        initialValues: {
            email: null,
            password: null
        },
        validationSchema: rules,
        onSubmit: async (values) => {
            try{
                setLoading(true)
                let response = await authSvc.login(values)

                dispatch(setDetail(response.userDetail))
                toast.success(response.msg)
                navigate("/"+response.userDetail.role)
            } catch(err) {
                console.error({err});
                toast.error(err.data.msg)
            } finally{
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        let token = localStorage.getItem(AppConstants.AUTH_KEY);
        let user = JSON.parse(localStorage.getItem(AppConstants.AUTH_USER_KEY));
        if(token && user){
            navigate('/'+user.role)
        }
    }, [navigate])

    return (<>
        {
            loading ? <LoadingComponent /> : <Container>
            <Row>
                <Col>
                    <Headings level={2} title={"Login Page"} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">UserName: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="text"
                                    name="email"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    placeholder="Enter your username..."
                                    required
                                />
                                <span className="text-danger">
                                    {formik.errors.email}
                                </span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Password: </Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    placeholder="Enter your password..."
                                    required
                                />
                                <span className="text-danger"></span>
                            </Col>
 
                            <NavLink to="/forget-password">
                                Reset Your Password
                            </NavLink>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{offset:3, span:9}}>
                                <Button variant="danger" type="reset" size="sm" className="me-3">
                                    {/* <i className="fa fa-trash"></i>  */}
                                    <FaTrash /> Cancel
                                </Button>
                                <Button 
                                disabled={loading}
                                variant="success" type="submit" size="sm" className="me-3">
                                    {
                                        loading ? <><FaSpinner /> Loading...</> : <><FaPaperPlane /> Login</>
                                    }
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                   
                </Col>
            </Row>
        </Container>
        }
    </>)
}

export default LoginPage