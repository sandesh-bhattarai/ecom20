import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    let loggedInuser = useSelector((rootStore) => {
        return rootStore.User.detail;
    });
    return (<>
    <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Home </div>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-home"></i>
                                </div>
                                Home Page
                            </NavLink>
                            <div className="sb-sidenav-menu-heading">Modules</div>
                            <NavLink className="nav-link" to="/admin/banner" >
                                <div className="sb-nav-link-icon">
                                    <i className="fas fa-images"></i>
                                </div>
                                Banner Module
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/brand">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Brand Module
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/category">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Category Module
                            </NavLink>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                User Module
                            </NavLink>
                            <NavLink className="nav-link" to="/admin/product">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Product Module
                            </NavLink>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Order Module
                            </NavLink>
                            <div className="sb-sidenav-menu-heading">Services</div>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Offer Module
                            </NavLink>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Reviews Module
                            </NavLink>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Payments Module
                            </NavLink>
                            <NavLink className="nav-link" to="/" target="_blank">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Pages Module
                            </NavLink>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {loggedInuser?.name}
                    </div>
                </nav>
            </div>
    
    </>)
}


export default AdminSidebar;