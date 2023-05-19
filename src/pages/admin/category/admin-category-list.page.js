import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import ImageLightboxComponent from "../../../component/lightbox/image-lightbox.component";
import { Badge } from "react-bootstrap";
import TableComponent from "../../../component/table/table.component";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import TableActionButtons from "../../../component/table/table-action-buttons.component";
import { deleteCategoryById, getCategoriesList } from "../../../reducer/catgory.reducer";
import {toast} from "react-toastify"

const AdminCategoryList = () => {
    let [data, setData] = useState();
    let [loading, setLoading] = useState(true);
    let [paginationData, setPaginationData] = useState()
    let dispatch = useDispatch();

    const loadAllCategories = useCallback((page, perPage) => {
        dispatch(getCategoriesList("page="+page+"&perPage="+perPage))
        setLoading(false);
    }, [dispatch])
    
    let categoryList = useSelector((rootState) => {
        return rootState?.Category?.list;
    })

    let meta = useSelector((rootState) => {
        return rootState?.Category?.meta;
    })
    
    const handleCategoryDelete = async (id) => {
        try{
            // console.log({id})
            dispatch(deleteCategoryById(id));

        //   let response = await categorySvc.deleteCategory(id);
        //   if(response.status) {
            loadAllCategories(1, 10)
            toast.success("Category Deleted Successfully");
        //   }
        } catch(error) {
          console.log(error);
          toast.warning("Error deleteing category")
        }
    }
    const columns = [
            {
                name: "Title",
                selector: (row) => row.title,
                sortable: true,
            },
            {
                name: "Parent",
                selector: (row) => row?.parent?.title,
                sortable: true,
            },
            {
                name: "Image",
                selector: (row) => <ImageLightboxComponent image={row.image}/>,
                sortable: true,
            },
            {
                name: "Status",
                selector: (row) => <Badge bg={row.status ==='inactive' ?'danger' : 'success'}>{row.status}</Badge>,
                sortable: true,
            },
            {
                name: "Action",
                selector: (row) => <>
                    <TableActionButtons 
                        deleteAction={handleCategoryDelete}
                        id={row._id}
                        editUrl={"/admin/category/edit/"+row.slug}
                    />
                </>
            }
    ];

    useEffect(() => {
        loadAllCategories(1,10);
    }, [loadAllCategories])

    useEffect(() => {
        if(categoryList) {
            setData(categoryList)
        }
        if(meta) {
            setPaginationData(meta)
        }
    }, [categoryList, meta])

    return (<>
    
    <div className="container-fluid px-4">
        <AdminBreadCrumb
            showAdd={true}
            btnLink="/admin/category/create"
            pageTitle={"Category"}
            links={[
                {
                title: "Dashboard",
                link: "/admin",
                },
                {
                title: "Category List",
                link: null,
                },
            ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            {
                data && <TableComponent 
                columns={columns} 
                data={data} 
                apiCaller={loadAllCategories}
                loading={loading}
                pages={paginationData}
                pagination={true} />
            }
          </div>
        </div>
      </div>
    </>)
}

export default AdminCategoryList;

// flux , context, redux