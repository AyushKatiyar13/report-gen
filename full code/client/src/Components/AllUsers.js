import React, { useEffect, useState } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import LastPageIcon from "@mui/icons-material/LastPage";
import ConfirmDialog from "./ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  TableFooter,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { API_URL } from "../config";
import axios from "axios";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function AllUsers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataRows, setDataRows] = useState([]);
  const [confirmDialog, setConfirmDialog]=useState({isOpen:false,title:"",subTitle:""})

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlegetuserlist = () => {
    axios
      .get(`${API_URL}/users/getallusers/`, {
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let sortedRows = res.data.sort((a, b) =>
          a.username < b.username ? -1 : 1
        );
        setDataRows(sortedRows);
      })
      .catch((err) => console.log(err));
  };
  
  const handleDelete = (userid) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    let body = { "current_password":  sessionStorage.getItem("password")}
    
    axios
      .delete(`${API_URL}/users/users/${userid}/`, {
        data:body,
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        
      })
      .then((res) => {
        handlegetuserlist();
        toast("Deleted successfully");
      })
      .catch((err) => console.log(err));
    
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/users/getallusers/`, {
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let sortedRows = res.data.sort((a, b) =>
          a.username < b.username ? -1 : 1
        );
        setDataRows(sortedRows);
      })
      .catch((err) => console.log(err));
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataRows.length) : 0;

  return (
    <div className="tableContainerDiv">
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#005cb8" }}>
              <TableCell style={{ width: 150, color: "white" }}>Name</TableCell>
              <TableCell style={{ width: 150, color: "white" }}>
                Email
              </TableCell>
              <TableCell style={{ width: 100, color: "white" }}>
                Designation
              </TableCell>
              <TableCell style={{ width: 100, color: "white" }}>
                User Rights
              </TableCell>
              <TableCell style={{ width: 100, color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataRows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.is_staff ? "Admin" : "User"}</TableCell>
                <TableCell>
                <DeleteIcon
                        titleAccess="Delete User"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen:true,
                            title:"Are you sure to delete this User?",
                            // subTitle:"You can't undo this User",
                            onConfirm:()=>{handleDelete(row.id)}
                          })
                           
                          }
                          
                        //   }
                        style={{ cursor: "pointer" }}
                      />
                      </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={12}
                count={dataRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <ConfirmDialog 
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}

export default AllUsers;
