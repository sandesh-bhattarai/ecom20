import { useNavigate, useParams } from "react-router-dom";
import brandSvc from "../../../services/brand.service";
import BrandFormComponent from "./brand-form.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import {toast} from "react-toastify"
import { useCallback, useEffect, useState } from "react";

const AdminBrandEdit = () =>{
    let params = useParams();
    let [detail, setDetail] = useState();

    const navigate = useNavigate();
    const submitData = async(data) => {
        try{
            data.status = data.status.value ?? 'inactive';
            let response = await brandSvc.updateBrand(data, params.id)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/brand')
            }
        } catch(error) {
            console.log(error);
            toast.error(error.msg)

        }
    }

    const getBrandById = useCallback(async() => {
        try{
            let data = await brandSvc.getBrandById(params.id)
            setDetail({
                title: data.result.title,
                status: data.result.status,
                image: data.result.image
            })
        } catch(err) {
            console.error(err)
        }
    }, [params.id])
    useEffect(() => {
        getBrandById()
    }, [getBrandById])
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Brand Update"}
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
                                    title: "Brand Edit",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <BrandFormComponent 
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

export default AdminBrandEdit;