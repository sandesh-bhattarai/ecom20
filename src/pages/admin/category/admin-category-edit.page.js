import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import CategoryFormComponent from "./category-form.component";
import { useEffect } from "react";
import { getCategoryDetail, updateCategory } from "../../../reducer/catgory.reducer";

const AdminCategoryEdit = () => {
    const dispatch = useDispatch();
    
    const params = useParams()
    
    let category = useSelector((rootState) => {
        return rootState?.Category?.detail;
    })

    const submitEvent = async (data) => {
        // console.log({data})
        dispatch(updateCategory({
            payload: data,
            id: category._id
        }))
        
        // navigate("/admin/category")    
    }

    useEffect(() => {
        dispatch(getCategoryDetail(params.id));
    },[params.id, dispatch]);

    return (<>
        <div className="container-fluid px-4">
            <AdminBreadCrumb
                showAdd={false}
                
                pageTitle={"Category Update"}
                links={[
                    {
                    title: "Dashboard",
                    link: "/admin",
                    },
                    {
                    title: "Category List",
                    link: "/admin/category",
                    },
                    {
                        title: "Category Update",
                        link: null,
                    },
                ]}
            />

            <div className="card mb-4">
                <div className="card-body">
                    {
                        category && <CategoryFormComponent 
                        defaultValue={{
                            title: category?.title,
                            status: {value: category?.status, label: category.status && category.status === 'active' ? "Publish" : "Un-publish"},
                            parent: category.parent ? {label: category.parent.title, value: category.parent._id}: null,
                            image: category?.image
                        }}
                        changeEvent={submitEvent}
                    />
                    }
                </div>
            </div>
      </div>
    </>
    );
}

export default AdminCategoryEdit;