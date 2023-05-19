import DataTable from "react-data-table-component"
import { useEffect, useState } from "react";
const customStyles = {
    rows: {
        style: {
            minHeight: '35px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            background: "#000000",
            color: "#ffffff",
            maxHeight: "30px"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const TableComponent = ({columns, data, pagination, loading, apiCaller, pages}) => {
    let [perPage, setPerpage] = useState(10)
    let [defaultPage, setDefaultPage] = useState(1);
    let [totalRows, setTotalRows] = useState(0);

    useEffect(() => {
        if(pages) {
            setTotalRows(pages.total)
            setDefaultPage(pages.page)
        }
    }, [pages])
    
    const handlePerRowsChange = (newPerPage, page) => {
        if(newPerPage !== perPage){
            setPerpage(newPerPage);
            apiCaller(page, newPerPage);    
        }
    }
    const handlePageChange = (page) => {
        if(page !== defaultPage){
            apiCaller(page, perPage);
        }
    }
    return (<>
        <DataTable 
            columns={columns}
            data={data}
            progressPending={loading}
            pagination={pagination}
            customStyles={customStyles}
			paginationServer
			paginationTotalRows={totalRows}
			onChangeRowsPerPage={handlePerRowsChange}
			onChangePage={handlePageChange}
        />
    </>)
}
export default TableComponent;