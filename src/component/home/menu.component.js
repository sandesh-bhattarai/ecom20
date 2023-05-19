import { Navbar, Container, Nav, Form, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import {  NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeMenu = () => {
  // listen => logged in user
  // user profile fetch
  let user = useSelector((rootStore) => {
    return rootStore.User?.detail;
  })
  let totalAmt = useSelector((rootstore) => {
    return rootstore.Cart?.totalItem;
  })
  // let user = JSON.parse(localStorage.getItem(AppConstants.AUTH_USER_KEY));
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <NavLink className={"nav-brand"} to="/">
            <img src={logo} alt="" className="img img-fluid logo cricle" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className={"nav-link"} to="/brands">Brands</NavLink>

              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavLink to="/category/electronics" className={"dropdown-item"}>
                  Electronics
                </NavLink>
                <NavLink to="/category/clothing" className={"dropdown-item"}>
                  Clothing
                </NavLink>
                <NavLink
                  to="/category/clothing/mens"
                  className={"dropdown-item"}
                >
                  Men's Clothing
                </NavLink>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                size="sm"
                aria-label="Search"
                name="q"
              />
            </Form>
            <Nav>
              <NavLink className={"nav-link"} to="/cart">
                {/* <i className="fas fa-shopping-cart"></i>     */}
                <FaShoppingCart /> ({totalAmt ?? 0})
              </NavLink>

              {
                user ? <>
                  <NavLink className={"nav-link"} to={'/'+user.role}>{user.name}</NavLink>
                </> : <>
                    <NavLink className={"nav-link"} to="/login">
                    Login
                  </NavLink>
                  <NavLink className={"nav-link"} to="/register">Register</NavLink>
                </>
              }
              {/*  */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeMenu;
