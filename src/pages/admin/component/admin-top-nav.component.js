import {  NavLink, useNavigate } from "react-router-dom";
import AppConstants from "../../../config/constants";
import { Modal, Form} from "react-bootstrap";
import { useState } from "react";
import { PasswordInputComponent } from "../../../component/form/input.component";
import { useFormik } from "formik";
import * as Yup from "yup";
import authSvc from "../../auth/auth.serivce";
import { ActionButtons } from "../../../component/form/action-buttons.component";
import {toast} from "react-toastify";

const AdminTopNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    let navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem(AppConstants.AUTH_KEY)
        localStorage.removeItem(AppConstants.AUTH_USER_KEY)
        navigate("/login")
    }

    const passSchema = Yup.object({
        old_password: Yup.string().required(),
        new_password: Yup.string().min(8).required(),
        re_new_password: Yup.string().min(8).oneOf([Yup.ref('new_password'), null], "New Password and confirm password does not match").required(),
    })
    const formik = useFormik({
        initialValues: {
            old_password: null,
            new_password: null,
            re_new_password: null
        },
        validationSchema: passSchema,
        onSubmit: async (values) => {
            try{
                await authSvc.updatPassword(values);
                toast.success("Please login again with your new Password...")
                localStorage.removeItem(AppConstants.AUTH_KEY);
                localStorage.removeItem(AppConstants.AUTH_USER_KEY)
                navigate("/login")

            } catch(err) {
                console.log({err})
            }
        }
    })
    console.log(formik.values)
    return (<>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="navbar-brand ps-3" to="/admin">Admin Panel</NavLink>
            <button onClick={handleClick} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" >
                <i className="fas fa-bars"></i>
            </button>
            
            <div className="d-none d-md-inline-block  ms-auto me-0 me-md-3 my-2 my-md-0"></div>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="/">Profile Update</a></li>
                        <li><a onClick={handleShow} className="dropdown-item" href="/">Change Password</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a onClick={logout} className="dropdown-item" href="/">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>


        <Modal show={show} onHide={handleClose} size="lg">
            <Form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PasswordInputComponent error={formik.errors.old_password} changeEvent={formik.handleChange} label="Old Password" name="old_password" placeholder="Enter current password" />
                    <PasswordInputComponent error={formik.errors.new_password} changeEvent={formik.handleChange} label="New Password" name="new_password" placeholder="Enter new password" />
                    <PasswordInputComponent error={formik.errors.re_new_password} changeEvent={formik.handleChange} label="Re-New Password" name="re_new_password" placeholder="Retype new password" />
                </Modal.Body>
                <Modal.Footer>
                    <ActionButtons 
                        cancelText="Cancel"
                        submitText="Update password"
                    />
                </Modal.Footer>
            </Form>
        </Modal>
    
    </>)
}

export default AdminTopNav