import { FaPen, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'

const TableActionButtons = ({deleteAction, id, editUrl}) => {
    const handleDelete = (e) => {
        e.preventDefault()
        try{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                
                if (result.isConfirmed) {
                    deleteAction(id)
                }
              })
        } catch(error) {
            console.log(error)
        }
    }
    return (<>
        <NavLink to={editUrl} className={"btn btn-sm btn-info me-1 circle"}>
            <FaPen />
        </NavLink>
        <NavLink onClick={handleDelete} to="/admin" className="btn btn-sm btn-danger circle">
            <FaTrash />
        </NavLink>
    </>)
}

export default TableActionButtons;