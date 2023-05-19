import { useCallback, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import TableComponent from "../../../component/table/table.component";
import AdminBreadCrumb from "../component/admin-breadcrumnb.component";
import bannerSvc from "../../../services/banner.service";
import { toast } from "react-toastify";
import ImageLightboxComponent from "../../../component/lightbox/image-lightbox.component";
import TableActionButtons from "../../../component/table/table-action-buttons.component";

const AdminBannerList = () => {
    const handleBannerDelete = async (id) => {
      try{
        let response = await bannerSvc.deleteBanner(id);
        if(response.status) {
          loadAllBanners(1, 10)
          toast.success(response.msg);
        }
      } catch(error) {
        console.log(error);
        toast.warning("Error deleteing banner")
      }
    }
    const columns = [
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },

        {
            name: "Link",
            selector: (row) => <a href={row.link} target="_blank" rel="noreferrer">{row.link}</a>,
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
                  deleteAction={handleBannerDelete}
                  id={row._id}
                  editUrl={"/admin/banner/edit/"+row._id}
                />
            </>
        },

    ];
    let [data, setData] = useState()
    let [loading, setLoading]=useState(true);
    let [paginationData, setPaginationData] = useState();

    const loadAllBanners = useCallback(async (page =1, perPage=10) => {
        try {
            let response = await bannerSvc.listAllBanners("page="+page+"&perPage="+perPage);
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
        loadAllBanners()
    }, [loadAllBanners])


  return (
    <>
      <div className="container-fluid px-4">
        <AdminBreadCrumb
          showAdd={true}
          btnLink="/admin/banner/create"
          pageTitle={"Banner"}
          links={[
            {
              title: "Dashboard",
              link: "/admin",
            },
            {
              title: "Banner List",
              link: null,
            },
          ]}
        />

        <div className="card mb-4">
          <div className="card-body">
            <TableComponent 
                columns={columns} 
                data={data} 
                apiCaller={loadAllBanners}
                loading={loading}
                pages={paginationData}
                pagination={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBannerList;
