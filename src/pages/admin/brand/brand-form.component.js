import { Form, Col } from "react-bootstrap";
import { DropDownInputComponent, SingleImageInputComponent, TextInputComponent } from "../../../component/form/input.component";
import { ActionButtons } from "../../../component/form/action-buttons.component";
import { useFormik } from "formik";
import { useEffect } from "react";

const BrandFormComponent = ({submitForm, defaultData, create=true}) => {
    // Data / state manage 
    const formik = useFormik({
        initialValues: defaultData,
        // validationSchema: null, 
        onSubmit: (data) => {
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
    }, [defaultData, formik])
    return (<>
        <Form onSubmit={formik.handleSubmit}>
            <TextInputComponent 
                label="Title:"
                name="title"
                value={formik.values?.title}
                placeholder ="Enter your Title..."
                changeEvent={formik.handleChange}
                error={null}
                required={true}
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
                error={null}
                required={true}
                options={[{label: "Publish", value:"active"}, {label:"Unpublish", value:"inactive"}]}
            />

            <SingleImageInputComponent 
                label="Image:"
                name="image"
                thumb={
                    formik.values && formik.values.image ? 
                        (typeof formik.values.image === 'string' ? process.env.REACT_APP_IMAGE_URL+"/"+formik.values.image : URL.createObjectURL(formik.values.image))  :
                        null
                }
                changeEvent={(selFile) => {
                    formik.setValues({
                        ...formik.values,
                        image: selFile
                    })
                }}
                error={null}
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

export default BrandFormComponent;