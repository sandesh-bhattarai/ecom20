import { Form, Col } from "react-bootstrap";
import { DropDownInputComponent, MultipleImageInputComponent, SwitchInputComponent, TextAreaInputComponent, TextInputComponent } from "../../../component/form/input.component";
import { ActionButtons } from "../../../component/form/action-buttons.component";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import categorySvc from "../../../services/category.service";
import brandSvc from "../../../services/brand.service";
import * as Yup from "yup";

const ProductFormComponent = ({submitForm, defaultData, create=true}) => {
    let [switchText,setSwitchText]= useState("Yes")
    let [categories, setCategories] = useState();
    let [brands, setBrands] = useState();

    const loadAllCategories = useCallback(async() => {
        try{
            let allCats = await categorySvc.getCategoryForHomePage();
            if(allCats.result){
                let opts = allCats.result.map((item) => {
                    return {
                        value: item._id,
                        label: item.title
                    }
                })
                setCategories(opts);
            }
        } catch(error) {
            console.log("CategoryFetchError: ", error)
        }
    }, [])

    const loadAllBrands = useCallback(async() => {
        try {
            let response = await brandSvc.listAllBrands()
            if(response.result) {
                let opts = response.result.map((item) => {
                    return {
                        label: item.title, 
                        value: item._id
                    }
                })
                setBrands(opts)
            }
        } catch(error) {
            console.log("BrandFetchError: ", error)
        }
    }, [])

    useEffect(() => {
        loadAllCategories()
        loadAllBrands()
    }, [loadAllCategories, loadAllBrands])


    let rules = Yup.object({
        title: Yup.string().required(), 
        description: Yup.string().required(),
        status: Yup.object().required(),
        images: Yup.array(),
        categories: Yup.array().required(),
        brand: Yup.object(),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).max(100).default(0),
        featured: Yup.boolean().default(false),
        sellerId: Yup.object(),
    })

    // Data / state manage 
    const formik = useFormik({
        initialValues: defaultData,
        validationSchema: rules, 
        onSubmit: (data) => {
            // console.log("Fomrik: ", data)
            submitForm(data)
        }
    })

    useEffect(() => {
        if(defaultData) {
            let selStaus = null;
            if(defaultData.status === 'active') {
                selStaus = {label: "Publish", value:"active"}
            } else if(defaultData.status === 'inactive') {
                selStaus =  {label:"Unpublish", value:"inactive"}
            }
            formik.setValues({
                ...defaultData,
                status: selStaus
            })
        }
    }, [defaultData])

    console.log(formik.errors);
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <TextInputComponent 
                label="Title:"
                name="title"
                value={formik.values?.title}
                placeholder ="Enter your Title..."
                changeEvent={formik.handleChange}
                error={formik.errors?.title}
                required={true}
            />

            <TextAreaInputComponent 
                label="Description"
                defaultData={formik.values?.description}
                changeEvent={(description) =>{
                    
                    if(defaultData && defaultData.descripiton) {
                        formik.setValues({
                            ...defaultData,
                            description: description
                        })
                    }  else {
                        formik.setValues({
                            ...formik.values, 
                            description:description
                        })
                    }
                    
                }}
                error={formik.errors?.description}
            />

            <TextInputComponent 
                label="Price(In Npr.)" 
                name="price"
                placeholder ="Enter your price"
                changeEvent={formik.handleChange}
                error={formik.errors?.price}
                value={formik.values?.price}
                required={true}
                type="number"
            />
            <TextInputComponent 
                label="Discount(%)" 
                name="discount"
                placeholder ="Enter your discount"
                changeEvent={formik.handleChange}
                error={formik.errors?.discount}
                value={formik.values?.discount}
                type="number"
            />
            
            <DropDownInputComponent 
                label="Categories:"
                name="categories"
                value={formik.values?.categories}
                isMulti={true}
                changeEvent={(selOpts) => {
                    // console.log("SelCat: ", selOpts)
                    formik.setValues({
                        ...formik.values, 
                        categories: selOpts
                    })
                }}
                error={formik.errors?.categories}
                required={true}
                options={categories}
            />

            <DropDownInputComponent 
                label="Brand:"
                name="brand"
                value={formik.values?.brand}
                changeEvent={(selOpts) => {
                    // console.log("selBrand", selOpts)
                    formik.setValues({
                        ...formik.values, 
                        brand: selOpts
                    })
                }}
                error={formik.errors?.brand}
                required={false}
                options={brands}
            />

            <DropDownInputComponent 
                label="Seller:"
                name="sellerId"
                value={formik.values?.sellerId}
                changeEvent={(selOpts) => {
                    console.log("SelSeller", selOpts)
                    // formik.setValues({
                    //     ...formik.values, 
                    //     status: selOpts
                    // })
                }}
                error={formik.errors?.sellerId}
                required={false}
                options={[]}
            />


            <SwitchInputComponent 
                label="Is featured"
                name="featured"
                textDisplay={switchText}
                error={formik.errors?.featured}
                changeEvent={(e) => {
                    if(e.target.checked) {
                        setSwitchText("No")
                    } else {
                        setSwitchText("Yes")
                    }
                    formik.setValues({
                        ...formik.values, 
                        featured: e.target.checked
                    })
                }}
            />

            <DropDownInputComponent 
                label="Status:"
                name="status"
                value={formik.values?.status}
                changeEvent={(selOpts) => {
                    formik.setValues({
                        ...formik.values, 
                        status: selOpts
                    })
                }}
                error={formik.errors?.status}
                required={true}
                options={[{label: "Publish", value:"active"}, {label:"Unpublish", value:"inactive"}]}
            />

            <MultipleImageInputComponent 
                label="Image:"
                name="images"
                thumb={
                    formik.values && formik.values.images ? 
                        (
                            formik.values.images.map((image, index) => {
                                return (
                                    typeof image === 'string' 
                                    ? 
                                    process.env.REACT_APP_IMAGE_URL+"/"+image 
                                    : 
                                    URL.createObjectURL(image))  
                            })
                        )
                        :
                        null
                }
                changeEvent={(selFile) => {
                    formik.setValues({
                        ...formik.values,
                        images: selFile
                    })
                }}
                error={formik.errors?.images}
                required={create}
            />

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span: 9}}>
                    <ActionButtons 
                        cancelText="Cancel"
                        submitText="Submit"
                    />
                </Col>
            </Form.Group>
        </Form>
    </>)
} 

export default ProductFormComponent;