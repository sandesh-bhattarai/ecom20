import { toast } from "react-toastify";
import bannerSvc from "../../../services/banner.service";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import BannerFormComponent from "./banner-form.component";
import { useNavigate } from "react-router-dom";

const AdminBannerCreate = () => {
    const navigate = useNavigate();

    const submitData = async(data) => {
        try{
            data.status = data.status.value ?? 'inactive';
            let response = await bannerSvc.createBanner(data)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/banner')
            }
        } catch(error) {
            console.log(error);

        }
    }
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Banner Create"}
                        links={
                            [
                                {
                                    title: "Dashboard",
                                    link: "/admin"
                                },
                                {
                                    title: "Banner List",
                                    link: '/admin/banner'
                                },
                                {
                                    title: "Banner Create",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <BannerFormComponent 
                            submitForm={submitData}
                            defaultData={{
                                title: "", 
                                link: "",
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

export default AdminBannerCreate;
