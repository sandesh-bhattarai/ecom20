import { useDispatch } from "react-redux";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import CategoryFormComponent from "./category-form.component";
import { createCategory } from "../../../reducer/catgory.reducer";
import { useNavigate } from "react-router-dom";

const AdminCategoryCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitEvent = async (data) => {
        dispatch(createCategory(data))
        navigate("/admin/category")    
    }
    return (<>
        <div className="container-fluid px-4">
            <AdminBreadCrumb
                showAdd={false}
                btnLink="/admin/category/create"
                pageTitle={"Category Create"}
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
                        title: "Category Create",
                        link: null,
                    },
                ]}
            />

            <div className="card mb-4">
                <div className="card-body">
                    <CategoryFormComponent 
                        defaultValue={{
                            title: "",
                            status: "",
                            parent: "",
                            image: null
                        }}
                        changeEvent={submitEvent}
                    />
                </div>
            </div>
      </div>
    </>)
}

export default AdminCategoryCreate;