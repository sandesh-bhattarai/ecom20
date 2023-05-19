import { useCallback, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import TableComponent from "../../../component/table/table.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import brandSvc from "../../../services/brand.service";
import { toast } from "react-toastify";
import ImageLightboxComponent from "../../../component/lightbox/image-lightbox.component";
import TableActionButtons from "../../../component/table/table-action-buttons.component";

const AdminBrandList = () => {
    const handleBrandDelete = async (id) => {
      try{
        let response = await brandSvc.deleteBrand(id);
        if(response.status) {
          loadAllBrands(1, 10)
          toast.success(response.msg);
        }
      } catch(error) {
        console.log(error);
        toast.warning("Error deleteing brand")
      }
    }
    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
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
                  deleteAction={handleBrandDelete}
                  id={row._id}
                  editUrl={"/admin/brand/edit/"+row._id}
                />
            </>
        },

    ];
    let [data, setData] = useState()
    let [loading, setLoading]=useState(true);
    let [paginationData, setPaginationData] = useState();

    const loadAllBrands = useCallback(async (page =1, perPage=10) => {
        try {
            let response = await brandSvc.listAllBrands("page="+page+"&perPage="+perPage);
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
        loadAllBrands()
    }, [loadAllBrands])


  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          showAdd={true}
          btnLink="/admin/brand/create"
          pageTitle={"Brand"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Brand List",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TableComponent 
                columns={columns} 
                data={data} 
                apiCaller={loadAllBrands}
                loading={loading}
                pages={paginationData}
                pagination={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBrandList;
