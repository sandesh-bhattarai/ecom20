import { useNavigate, useParams } from "react-router-dom";
import productSvc from "../../../services/product.service";
import ProductFormComponent from "./product-form.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import {toast} from "react-toastify"
import { useCallback, useEffect, useState } from "react";

const AdminProductEdit = () =>{
    let params = useParams();
    let [detail, setDetail] = useState();
    let [productId, setProductId] = useState();

    const navigate = useNavigate();
    const submitData = async(data) => {
        try{
            data.status = data.status.value ?? 'inactive';
            data.brand = data.brand.value ?? null;
            let categories = data.categories.map((item) => item.value);
            data.categories = JSON.stringify(categories);
            data.sellerId = data.sellerId.value ?? null;

            console.log(detail)
            let response = await productSvc.updateProduct(data, productId)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/product')
            }
        } catch(error) {
            console.log(error);
            toast.error(error.msg)

        }
    }

    const getProductBySlug = useCallback(async() => {
        try{
            let data = await productSvc.getProductBySlug(params.id)
            
            let selCats = data.result.categories.map((item) => {
                return {
                    label: item.title,
                    value: item._id
                }
            })
            setDetail({
                title: data.result.title,
                status: data.result.status, 
                description: data.result.description,
                
                images: data.result.images,
                categories: selCats,
                brand: data.result.brand ? {label: data.result.brand.title, value: data.result.brand._id} : "",
                price: data.result.price,
                discount: data.result.discount, 
                featured: data.result.featured,
                sellerId: data.result.sellerId ? {label: data.result.sellerId.name, value: data.result.sellerId._id} : ""
            })
            setProductId(data.result._id)
        } catch(err) {
            console.error(err)
        }
    }, [params.id])
    useEffect(() => {
        getProductBySlug()
    }, [getProductBySlug])
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Product Update"}
                        links={
                            [
                                {
                                    title: "Dashboard",
                                    link: "/admin"
                                },
                                {
                                    title: "Product List",
                                    link: '/admin/product'
                                },
                                {
                                    title: "Product Edit",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <ProductFormComponent 
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

export default AdminProductEdit;