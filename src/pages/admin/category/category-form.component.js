import { useFormik } from "formik";
import { DropDownInputComponent, SingleImageInputComponent, TextInputComponent } from "../../../component/form/input.component";
import { Form, Col } from "react-bootstrap";
import { ActionButtons } from "../../../component/form/action-buttons.component";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "../../../reducer/catgory.reducer";

const CategoryFormComponent = ({defaultValue, changeEvent}) => {
    let [catList, setCatList] = useState();
    let allCats = useSelector((rootState) => {
        return rootState?.Category?.list;
    })

    let dispatch =useDispatch();

    let rules = Yup.object({
        title: Yup.string().min(2).required(),
        status: Yup.object().required(),
        parent: Yup.object().nullable(),
        image: Yup.string().required()
    })

    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: rules,
        onSubmit: (data) => {
            // console.log("FormData: ", data);
            changeEvent(data);
        }
    })

    useEffect(() => {
        dispatch(getCategoriesList("page=1&perPage=200"));
    }, [dispatch])

    useEffect(() => {
        if(allCats){
            let selOpts = allCats.map((item) => {
                return {
                    label: item.title, 
                    value: item._id
                }
            })
            setCatList(selOpts)
        }
    }, [allCats])

    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <TextInputComponent 
                label="Title" 
                name="title"
                placeholder ="Enter your category Name..."
                changeEvent={formik.handleChange}
                error={formik.errors.title}
                value={formik.values.title}
                required={true}
                type="text"
            />
            
            <DropDownInputComponent 
                label="Sub-Category of: " 
                name="parent"
                changeEvent={(selOpts) => {
                    formik.setValues({
                        ...formik.values,
                        parent: selOpts
                    })
                }}
                error={formik.errors.parent}
                required={false}
                options={catList}
                value={formik.values.parent}
            />

            <DropDownInputComponent 
                label="Status" 
                name="status"
                changeEvent={(selOpts) => {
                    formik.setValues({
                        ...formik.values,
                        status: selOpts
                    })
                }}
                error={formik.errors.status}
                required={true}
                options={[{value: "active", label: "Publish"},{value: "inactive", label: "Un-Publish"},]}
                value={formik.values.status}
            />


            <SingleImageInputComponent 
                label="Image: " 
                name="image"
                changeEvent={(image)=>{
                    console.log(image)
                    formik.setValues({
                        ...formik.values,
                        image: image
                    })
                }}
                thumb={typeof formik.values.image === 'string' ? process.env.REACT_APP_IMAGE_URL+"/"+formik.values.image : (formik.values.image ? URL.createObjectURL(formik.values.image) : null)}
                error={formik.errors.image}
            />

            <Form.Group className="row mb-3">
                <Col sm={{offset: 3, span: 9}}>
                    <ActionButtons 
                        cancelText="Reset "
                        submitText="Submit"
                    />
                </Col>
            </Form.Group>

        </Form>
    </>)
}

export default CategoryFormComponent;