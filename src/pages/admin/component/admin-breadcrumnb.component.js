import { FaPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const AdminBreadCrumb = ({pageTitle, links, showAdd = false, btnLink= null}) => {
    return (<>
        <h1 className="mt-4">
            {pageTitle} Page

            {
                showAdd ? <>
                    <NavLink to={btnLink} className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add {pageTitle}
                    </NavLink>
                </> : <></>
            }
        </h1>
        <ol className="breadcrumb mb-4">
            {/* <li className="breadcrumb-item active">Dashboard</li> */}
            
            {
                links && links.map((item, index) => (
                    <li key={index} className={(links.length-1 === index) ? 'breadcrumb-item active' : "breadcrumb-item"}>
                        {
                            item.link ? <NavLink to={item.link}>{item.title}</NavLink> : item.title
                        }
                    </li>
                ))
            }
            {/* <li className="breadcrumb-item">
                <NavLink to="/admin">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item">
                <NavLink to="/admin/banner">Banner List</NavLink>
            </li>
            <li className="breadcrumb-item active">Banner Create</li> */}
        </ol>
    </>)
}

export default AdminBreadCrumb