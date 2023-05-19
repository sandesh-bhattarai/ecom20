import { toast } from "react-toastify";
import brandSvc from "../../../services/brand.service";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import BrandFormComponent from "./brand-form.component";
import { useNavigate } from "react-router-dom";

const AdminBrandCreate = () => {
    const navigate = useNavigate();

    const submitData = async(data) => {
        try{
            data.status = data.status.value ?? 'inactive';
            let response = await brandSvc.createBrand(data)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/brand')
            }
        } catch(error) {
            console.log(error);

        }
    }
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Brand Create"}
                        links={
                            [
                                {
                                    title: "Dashboard",
                                    link: "/admin"
                                },
                                {
                                    title: "Brand List",
                                    link: '/admin/brand'
                                },
                                {
                                    title: "Brand Create",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <BrandFormComponent 
                            submitForm={submitData}
                            defaultData={{
                                title: "", 
                                status: null, 
                                image: null,
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AdminBrandCreate;
