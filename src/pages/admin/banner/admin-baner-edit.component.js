import { useNavigate, useParams } from "react-router-dom";
import bannerSvc from "../../../services/banner.service";
import BannerFormComponent from "./banner-form.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import {toast} from "react-toastify"
import { useCallback, useEffect, useState } from "react";

const AdminBannerEdit = () =>{
    let params = useParams();
    let [detail, setDetail] = useState();

    const navigate = useNavigate();
    const submitData = async(data) => {
        try{
            data.status = data.status.value ?? 'inactive';
            let response = await bannerSvc.updateBanner(data, params.id)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/banner')
            }
        } catch(error) {
            console.log(error);
            toast.error(error.msg)

        }
    }

    const getBannerById = useCallback(async() => {
        try{
            let data = await bannerSvc.getBannerById(params.id)
            setDetail({
                title: data.result.title,
                link: data.result.link,
                status: data.result.status,
                image: data.result.image
            })
        } catch(err) {
            console.error(err)
        }
    }, [params.id])
    useEffect(() => {
        getBannerById()
    }, [getBannerById])
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Banner Update"}
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
                                    title: "Banner Edit",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <BannerFormComponent 
                            submitForm={submitData}
                            defaultData={detail}
                            create={false}
                        />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default AdminBannerEdit;