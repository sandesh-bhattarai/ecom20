import { useCallback, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import TableComponent from "../../../component/table/table.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import productSvc from "../../../services/product.service";
import { toast } from "react-toastify";
import ImageLightboxComponent from "../../../component/lightbox/image-lightbox.component";
import TableActionButtons from "../../../component/table/table-action-buttons.component";

const AdminProductList = () => {
    const handleProductDelete = async (id) => {
      try{
        let response = await productSvc.deleteProduct(id);
        if(response.status) {
          loadAllProducts(1, 10)
          toast.success(response.msg);
        }
      } catch(error) {
        console.log(error);
        toast.warning("Error deleteing product")
      }
    }
    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
          name: "Price",
          selector: (row) => <>Npr. {row.actualPrice}, <small>
              <del>
                Npr. {row.price}
              </del>
            </small></>,
          sortable: true,
        },
        {
          name: "Categories",
          selector: (row) => <>
            {
              (row.categories.map((item) => item.title)).join(", ")
            }
          </>
        },
        {
          name: "Brand",
          selector: (row) => row.brand?.name
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
                  deleteAction={handleProductDelete}
                  id={row._id}
                  editUrl={"/admin/product/edit/"+row.slug}
                />
            </>
        },

    ];
    let [data, setData] = useState()
    let [loading, setLoading]=useState(true);
    let [paginationData, setPaginationData] = useState();

    const loadAllProducts = useCallback(async (page =1, perPage=10) => {
        try {
            let response = await productSvc.listAllProducts("page="+page+"&perPage="+perPage);
            setData(response.result)
            setPaginationData(response.meta);
        } catch(err) {
            console.log(err);
            toast.warn(err.msg);
        } finally{
          setLoading(false)
        }
    }, []);

    useEffect(() => {
        loadAllProducts()
    }, [loadAllProducts])


  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          showAdd={true}
          btnLink="/admin/product/create"
          pageTitle={"Product"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Product List",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TableComponent 
                columns={columns} 
                data={data} 
                apiCaller={loadAllProducts}
                loading={loading}
                pages={paginationData}
                pagination={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
