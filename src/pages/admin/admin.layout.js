import "../../assets/css/admin.css";
import "bootstrap";
import AdminTopNav from "./component/admin-top-nav.component";
import AdminSidebar from "./component/admin-sidebar.component";
import AdminFooter from "./component/admin-footer.component";
import { Outlet } from "react-router-dom";
const AdminPageLayout = () => {
    
    return (<>
        <AdminTopNav />
        <div id="layoutSidenav">
            <AdminSidebar />
            <div id="layoutSidenav_content">
                <main>
                    <Outlet />
                </main>
                
                <AdminFooter />
            </div>
        </div>
    </>)
}

export default AdminPageLayout;