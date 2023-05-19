import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Headings } from "../../component/typography/text.component";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import AppConstants from "../../config/constants";
import { useNavigate } from "react-router-dom";
import authSvc from "./auth.serivce";
// const DisplayImage = ({image}) => {
//     return <Image src={URL.createObjectURL(image)} fluid/>
// }

const RegisterPage = () =>{
    const navigate = useNavigate()

    let defaultData = {
        name: "",
        email: "",
        password: "",
        address: {
            temp: {
                state: "",
                district: "",
                municipalityName: "",
                wardNo: "",
            },
            perm: {
                state: "",
                district: "",
                municipalityName: "",
                wardNo: "",
            },
        },
        role: "",
        phone: "",
        image: '',
        status: "inactive"
    };

    let rules = Yup.object({
        name: Yup.string().min(2).required("Name is required..."),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        address: Yup.object({
            temp: Yup.object({
                state: Yup.string().matches(/(koshi|madhesh)/, "State name does not match").default(null),
                district: Yup.string().default(null),
                municipalityName: Yup.string().default(null),
                wardNo: Yup.number().default(null)
            }),
            perm: Yup.object({
                state: Yup.string().matches(/(koshi|madhesh)/, "State name does not match").default(null),
                district: Yup.string().default(null),
                municipalityName: Yup.string().default(null),
                wardNo: Yup.number().default(null)
            }),
        
        }),
        role: Yup.string().matches(/(seller|customer)/).default("customer"),
        phone: Yup.string().default(null),
        image: Yup.string().default(null)
    })


    // let [data, setData] = useState(defaultData);
    // let [err, setErr] = useState();

    // // let [images, setImages] = useState()
    let district = [
        {
            _id:"123",
            districtName: "Kathmandu",
            state: "Bagmati"
        },
        {
            _id:"124",
            districtName: "Lalitpur",
            state: "Bagmati"
        }
    ]

    // const validateData = (field, value) => {
    //     let errMsg =  null;
    //     switch(field) {
    //         case "name":
    //             errMsg = value ? (value.length >= 2 ? null : "Name must be greater or equal to 2 characters...") : "Name is compulsory"
    //             break;
    //         case "email":
    //             errMsg = value ? (value.length >= 2 ? null : "Email must be greater or equal to 2 characters...") : "Email is compulsory"
    //             break;
    //     }
    //     setErr({
    //         ...err,
    //         [field] : errMsg
    //     })
    // }

    // const formik.handleChange = (e)=>{
    //     let {name, value} = e.target;
    //     setData({
    //         ...formik.values, 
    //         [name]: value 
    //     })
    //     validateData(name, value)
    // }


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // TODO: Register API Integration
    //     Object.keys(data).map((key) => {
    //         validateData(key, data[key])
    //     })
    //     // TODO: condition
    //     if(err){
            
    //     }
    // }
    // console.log(data)

    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: rules,
        onSubmit: async (values) => {
            try{
                let formData = new FormData();

                    (Object.keys(values)).forEach((field, index) => {

                        if(field === 'image') {
                            formData.append('image', values[field], values[field].name)
                        } else if(field === 'address') {
                            formData.append("address", JSON.stringify(values.address));
                        } else {
                            formData.append(field, values[field]);
                        }
                    })
                    let response = await authSvc.register(formData)
                    console.log({response})
                } catch(err) {
                    console.log("RegisterLog: ", err)
                }
            }
    })
    useEffect(() => {
        let token = localStorage.getItem(AppConstants.AUTH_KEY);
        let user = JSON.parse(localStorage.getItem(AppConstants.AUTH_USER_KEY));
        if(token && user){
            navigate('/'+user.role)
        }
    }, [navigate])
    return (<>
    
        <Container className="my-5">
            <Row>
                <Col>
                    <Headings className={"text-center"} level={1} title={"Registeer Page"}></Headings>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group row mb-3">
                            <label className="col-sm-3">Name: </label>
                            <div className="col-sm-9">
                                <input 
                                    type="text"
                                    name="name"
                                    required={true}
                                    onChange={formik.handleChange}
                                    className="form-control form-control-sm"
                                    placeholder="Enter your name..."
                                />
                                <span className="text-danger">
                                    {
                                        formik.errors?.name
                                    }
                                </span>
                            </div>
                        </div>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Email:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="email"
                                    name="email"
                                    required
                                    onChange={formik.handleChange}
                                    size="sm"
                                    placeholder="Enter your email..."
                                />
                                <span className="text-danger"></span>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Password:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    required
                                    onChange={formik.handleChange}
                                    size="sm"
                                    placeholder="Enter your password..."
                                />
                                <span className="text-danger"></span>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Address (Temp): </Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Col>
                                        <Form.Select size="sm" onChange={(e)=>{
                                                
                                                let {value} = e.target;
                                                
                                                formik.setValues({
                                                    ...formik.values,
                                                    address: {
                                                        ...formik.values.address,
                                                        temp: {
                                                            ...formik.values.address.temp,
                                                            state: value
                                                        }
                                                    }
                                                })
                                                
                                                // setData({
                                                //     ...formik.values, 
                                                //     address: {
                                                //         ...formik.values.address,
                                                //         temp: {
                                                //             ...formik.values.address.temp,
                                                //             state: value
                                                //         }
                                                //     }
                                                // })
                                            }} required >
                                            <option>-- Select Any one --</option>
                                            <option value={"koshi"}>Koshi State</option>
                                            <option value={"madhesh"}>Madhesh State</option>
                                            <option value={"bagmati"}>Bagmati State</option>
                                            <option value={"gandaki"}>Gandaki State</option>
                                            <option value={"lumbini"}>lumbini State</option>
                                            <option value={"karnali"}>Karnali State</option>
                                            <option value={"far-western"}>Far-Western State</option>
                                        </Form.Select>
                                        <span className="text-danger">{formik.errors.address?.temp?.state}</span>
                                    </Col>
                                    <Col>
                                        <Form.Select size="sm" required name="address.temp.district" onChange={(e)=>{
                                                let {value} = e.target;
                                                formik.setValues({
                                                    ...formik.values, 
                                                    address: {
                                                        ...formik.values.address,
                                                        temp: {
                                                            ...formik.values.address.temp,
                                                            district: value
                                                        }
                                                    }
                                                })
                                            }}>
                                            <option>-- Select Any one --</option>
                                            {
                                                district.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.districtName}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                        <span className="text-danger"></span>
                                    </Col>
                                    <Col>
                                        <Form.Control 
                                            size="sm" 
                                            required 
                                            name="address.temp.municipalityName"
                                            placeholder="Enter Municipality/Rural Development name..."
                                            onChange={(e)=>{
                                                let {value} = e.target;
                                                formik.setValues({
                                                    ...formik.values, 
                                                    address: {
                                                        ...formik.values.address,
                                                        temp: {
                                                            ...formik.values.address.temp,
                                                            municipalityName: value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <span className="text-danger"></span>
                                    </Col>
                                    <Col>
                                        <Form.Control 
                                            size="sm" 
                                            required 
                                            name="address.temp.wardNo"
                                            placeholder="Enter wardNo name..."
                                            onChange={(e)=>{
                                                let {value} = e.target;
                                                formik.setValues({
                                                    ...formik.values, 
                                                    address: {
                                                        ...formik.values.address,
                                                        temp: {
                                                            ...formik.values.address.temp,
                                                            wardNo: value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <span className="text-danger"></span>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Address (Perm): </Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Col>
                                        <Form.Select size="sm" required name="address.perm.state" 
                                        onChange={(e)=>{
                                            let {value} = e.target;
                                            formik.setValues({
                                                ...formik.values, 
                                                address: {
                                                    ...formik.values.address,
                                                    perm: {
                                                        ...formik.values.address.perm,
                                                        state: value
                                                    }
                                                }
                                            })
                                        }}>
                                            <option>-- Select Any one --</option>
                                            <option value={"koshi"}>Koshi State</option>
                                            <option value={"madhesh"}>Madhesh State</option>
                                            <option value={"bagmati"}>Bagmati State</option>
                                            <option value={"gandaki"}>Gandaki State</option>
                                            <option value={"lumbini"}>lumbini State</option>
                                            <option value={"karnali"}>Karnali State</option>
                                            <option value={"far-western"}>Far-Western State</option>
                                        </Form.Select>
                                        <span className="text-danger"></span>
                                    </Col>
                                    <Col>
                                        <Form.Select size="sm" required name="address.perm.district" onChange={(e)=>{
                                            let {value} = e.target;
                                            formik.setValues({
                                                ...formik.values, 
                                                address: {
                                                    ...formik.values.address,
                                                    perm: {
                                                        ...formik.values.address.perm,
                                                        district: value
                                                    }
                                                }
                                            })
                                        }}>
                                            <option>-- Select Any one --</option>
                                            {
                                                district.map((item, index) => (
                                                    <option key={index} value={item._id}>
                                                        {item.districtName}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                        <span className="text-danger"></span>
                                    </Col>
                                    <Col>
                                        <Form.Control 
                                            size="sm" 
                                            required 
                                            name="address.perm.municipalityName"
                                            placeholder="Enter Municipality/Rural Development name..."
                                            onChange={(e)=>{
                                                let {value} = e.target;
                                                formik.setValues({
                                                    ...formik.values, 
                                                    address: {
                                                        ...formik.values.address,
                                                        perm: {
                                                            ...formik.values.address.perm,
                                                            municipalityName: value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <span className="text-danger"></span>
                                    </Col>
                                    <Col>
                                        <Form.Control 
                                            size="sm" 
                                            required 
                                            name="address.perm.wardNo"
                                            placeholder="Enter wardNo name..."
                                            onChange={(e)=>{
                                                let {value} = e.target;
                                                formik.setValues({
                                                    ...formik.values, 
                                                    address: {
                                                        ...formik.values.address,
                                                        perm: {
                                                            ...formik.values.address.perm,
                                                            wardNo: value
                                                        }
                                                    }
                                                })
                                            }}
                                        />
                                        <span className="text-danger"></span>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Role:</Form.Label>
                            <Col sm={9}>
                                <Form.Select size="sm" required name="role" onChange={formik.handleChange}>
                                    <option>-- Select Any one --</option>
                                    <option value={"seller"}>Seller</option>
                                    <option value={"customer"}>Customer</option>
                                </Form.Select>
                                <span className="text-danger"></span>
                            </Col>
                        </Form.Group>

                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Phone:</Form.Label>
                            <Col sm={9}>
                                <Form.Control 
                                    type="tel"
                                    name="phone"
                                    size="sm"
                                    onChange={formik.handleChange}
                                    placeholder="Enter your phone..."
                                />
                                <span className="text-danger"></span>
                            </Col>
                        </Form.Group>


                        <Form.Group className="row mb-3">
                            <Form.Label className="col-sm-3">Image:</Form.Label>
                            <Col sm={7}>
                                <Form.Control 
                                    type="file"
                                    name="image"
                                    size="sm"
                                    // multiple
                                    accept="image/*"
                                    onChange={(e)=>{
                                        // let images = Object.values(e.target.files)
                                        // setImages(images);
                                        console.log(e.target.files[0])
                                        formik.setValues({
                                            ...formik.values,
                                            image: e.target.files[0]
                                        })
                                        // setData({
                                        //     ...formik.values, 
                                        //     image: e.target.files[0]
                                        // })
                                        
                                    }}
                                />
                                <span className="text-danger">{
                                    formik.errors.image
                                }</span>
                            </Col>
                            <Col sm={2}>
                                {
                                    formik.values.image ? <img alt="" className="img img-fluid"  src={URL.createObjectURL(formik.values.image)}/> : <></>
                                }
                            </Col>
                        </Form.Group>


                        {/* <Form.Group className="row mb-3">
                            {
                                images && images.map((image, index) => (

                                    <Col sm={12} md={2} key={index}>
                                        <DisplayImage image={image}/>
                                    </Col>
                                ) )
                            }
                        </Form.Group> */}
                        
                        <Form.Group className="row mb-3">
                            <Col sm={{offset:3, span:9}}>
                                <Button variant="danger" type="reset" size="sm" className="me-3">
                                    <i className="fa fa-trash"></i> Cancel
                                </Button>
                                <Button variant="success" type="submit" size="sm" className="me-3">
                                    <i className="fa fa-paper-plane"></i> Register
                                </Button>
                            </Col>
                        </Form.Group>



                    </form>
                </Col>
            </Row>
        </Container>
    </>)
}

export default RegisterPage;