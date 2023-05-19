import { toast } from "react-toastify";
import productSvc from "../../../services/product.service";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import ProductFormComponent from "./product-form.component";
import { useNavigate } from "react-router-dom";

const AdminProductCreate = () => {
    const navigate = useNavigate();

    const submitData = async(data) => {
        try{
            console.log("Create: ", data)
            data.status = data.status.value ?? 'inactive';
            data.brand = data.brand.value ?? null;
            let categories = data.categories.map((item) => item.value);
            data.categories = JSON.stringify(categories);
            data.sellerId = data.sellerId.value ?? null;

            
            let response = await productSvc.createProduct(data)
            if(response) {
                toast.success(response.msg);
                navigate('/admin/product')
            }
        } catch(error) {
            console.log(error);

        }
    }
    return (

        <>
            <div className="container-fluid px-4">
                    <AdminBreadCrumb 
                        pageTitle={"Product Create"}
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
                                    title: "Product Create",
                                    link: null
                                }
                            ]
                        }
                    />

                <div className="card mb-4">
                    <div className="card-body">
                        <ProductFormComponent 
                            submitForm={submitData}
                            defaultData={{
                                title: "", 
                                description: "",
                                status: "", 
                                images: null,
                                categories: "",
                                brand: "",
                                price: "",
                                discount: "", 
                                featured: false,
                                sellerId: ""
                            }}
                        />
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AdminProductCreate;
