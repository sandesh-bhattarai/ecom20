import {FaUsers} from "react-icons/fa"
import { NavLink } from "react-router-dom";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import DataTable from 'react-data-table-component';

const customStyles = {
    rows: {
        style: {
            minHeight: '25px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            background: "#000000",
            color: "#ffffff",
            maxHeight: "30px"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const AdminDashboard = () => {
    const columns = [
        {
            name: 'Order Id',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Customer',
            selector: row => row.year,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.year,
            sortable: true
        },
        {
            name: 'Amount',
            selector: row => row.year,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.year,
            sortable: true
        }
        
    ];
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]    
    return (
        <>
        <div className="container-fluid px-4">
                <AdminBreadCrumb 
                    pageTitle={"Dashboard"}
                    links={
                        [
                            {
                                title: "Dashboard",
                                link: null
                            }
                        ]
                    }
                />

                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-primary text-white mb-4">
                                    <div className="card-body">
                                        <FaUsers className="me-3" size={"30px"} />
                                        Users 
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <NavLink className="small text-white stretched-link" to="/admin/users">View Details</NavLink>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-warning text-white mb-4">
                                    <div className="card-body">Warning Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-success text-white mb-4">
                                    <div className="card-body">Success Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card bg-danger text-white mb-4">
                                    <div className="card-body">Danger Card</div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <a className="small text-white stretched-link" href="/">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <div className="card-body">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                    customStyles={customStyles}
                                    title="Latest orders"
                                />
                            </div>
                        </div>
                        
                    </div>
        </>
    );
};

export default AdminDashboard;
