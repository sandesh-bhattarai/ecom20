import { Col, Form, Image, Row } from "react-bootstrap"
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



export const PasswordInputComponent = ({
    label="Password", 
    name="password",
    placeholder ="Enter your password",
    changeEvent,
    error=null
}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm={9}>
                <Form.Control 
                    type="password"
                    name={name}
                    size="sm"
                    placeholder={placeholder}
                    required={true}
                    onChange={changeEvent}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    
    </>)
}

export const TextInputComponent = ({
    label="Title", 
    name="name",
    placeholder ="Enter your Title",
    changeEvent,
    error=null,
    value="",
    required=false,
    type="text"
}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm={9}>
                <Form.Control 
                    type={type}
                    name={name}
                    size="sm"
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={changeEvent}
                />
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    
    </>)
}

export const DropDownInputComponent = ({
    label="Title", 
    name="name",
    changeEvent,
    error=null,
    required=false,
    options=null,
    isMulti=false,
    value= null
}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm={9}>
                <Select
                    name={name}
                    required={required}
                    onChange={changeEvent}
                    isMulti={isMulti}
                    value={value}
                    placeholder={"Select Any One"}
                    options={options}
                    isClearable={true}
                >
                </Select>
                <span className="text-danger">{error}</span>
            </Col>
        </Form.Group>
    
    </>)
}

export const TextAreaInputComponent = ({
    label="Description",
    defaultData=null,
    changeEvent,
    error=null
}) => {


    return (<>
        <Form.Group className="mb-3 row">
            <Form.Label className="col-sm-3">{label}: </Form.Label>
            <Col sm={9}>
            <CKEditor
                    editor={ ClassicEditor }
                    data={defaultData}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        changeEvent(data)
                    } }
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor);
                        editor.editing.view.change((writer) => {
                        writer.setStyle(
                            "height",
                            "200px",
                            editor.editing.view.document.getRoot()
                        );
                        });
                    }}
                    
                />
                <span className="text-danger">{error}</span>
            </Col>
            
        </Form.Group>
    </>)
}

export const SingleImageInputComponent = ({
    label="Title", 
    name="name",
    changeEvent,
    thumb=null,
    error=null,
    required=false,
}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm={5}>
                <Form.Control 
                    type="file"
                    name={name}
                    size="sm"
                    required={required}
                    onChange={(e) => {
                        let selFile = e.target.files[0];
                        changeEvent(selFile);
                    }}
                    accept="image/*"
                />
                <span className="text-danger">{error}</span>
            </Col>
            <Col sm={3}>
                {
                    thumb ? 
                        <Image fluid alt="" src={thumb} />
                     : <></>
                }
            </Col>
        </Form.Group>
    
    </>)
}

export const MultipleImageInputComponent = ({
    label="Title", 
    name="name",
    changeEvent,
    thumb=null,
    error=null,
    required=false,
}) => {
    
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">{label}</Form.Label>
            <Col sm={9}>
                <Form.Control 
                    type="file"
                    name={name}
                    size="sm"
                    multiple={true}
                    required={required}
                    onChange={(e) => {
                        let selFile = e.target.files;
                        changeEvent(Object.values(selFile));
                    }}
                    accept="image/*"
                />
                <span className="text-danger">{error}</span>
            </Col>
            
        </Form.Group>
        
        {
            thumb ? 
            <>
                <Form.Group>
                    <Row>
                        {
                            thumb.map((item, index) => (
                                <Col key={index} sm={4} md={1}>
                                    <img className="img img-fluid" src={item}/>
                                </Col>
                            ))
                        }        
                    </Row>
                </Form.Group>

            </> : <></>
        }   
    </>)
}

export const SwitchInputComponent = ({
    label, 
    name, 
    textDisplay="Yes", 
    changeEvent, 
    required=false,
    error=null
}) => {
    return (<>
        <Form.Group className="row mb-3">
            <Form.Label className="col-sm-3">
                {label}
            </Form.Label>
            <Col size={9}>
                <Form.Check
                    type="switch"
                    id={name}
                    label={textDisplay}
                    onChange={changeEvent}
                    required={required}
                />
            </Col>
            <span className="text-danger">{error}</span>
        </Form.Group>
    </>)
}