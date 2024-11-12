import React, { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { API_URL } from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from '@mui/icons-material/Search';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import "./ReportList.css";
import Report from "./Report";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

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

export default function ReportList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataRows, setDataRows] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [circularProgressVisible, setCircularProgressVisible] = useState(false);
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("WholeReport");
  const [reportId, setReportId] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [yearArr, setYearArr] = useState([]);
  const [startYear, setStartYear] = useState(null);
  const [specificReportVisible, setSpecificReportVisible] = useState(true);
  const [specificRegionalVisible, setSpecificRegionalReportVisible] = useState(true);
  const [query, setQuery] = useState("");
  const [confirmDialog, setConfirmDialog]=useState({isOpen:false,title:"",subTitle:""})

  const [flag,setFlag]=useState(true)

  let navigate = useNavigate();
  let { id } = useParams();
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value == "SpecificReport") {
      let filteredRowData = dataRows.filter((item) => {
        return item.reportid == reportId;
      });
      setRegionList(filteredRowData[0].regiondet.region);
      setCountryList(filteredRowData[0].regiondet.country);
    }
  };

  useEffect(() => {
    setCountryList([]);
    setRegionList([]);
    setValue("WholeReport");
  }, [open]);

  const handleClickOpen = (reportid) => {
    setOpen(true);
    setSelectedCountry("");
    setSelectedRegion("");
    setStartYear(null);
    setReportId(reportid);
    let filteredArr = dataRows.filter((item) => {
      return item.reportid == reportid;
    });
    let startYear = filteredArr[0].base_year;
    let endYear = filteredArr[0].endyear;
    let yearArr = [];
    for (let index = startYear; index < endYear; index++) {
      yearArr.push(index);
    }
    if (filteredArr[0].geography == "Country") {
      setSpecificReportVisible(false);
    } else {
      setSpecificReportVisible(true);
    }
    if (filteredArr[0].geography == "Regional") {
      setSpecificRegionalReportVisible(false);
    } else setSpecificRegionalReportVisible(true);

    setYearArr(yearArr);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (sessionStorage.getItem('is_staff') === 'true') {
      handleGetReportsList();
    } else {
      handleGetReportsListuser();
    }
  }, [localStorage.getItem("reports"), localStorage.getItem("editableReport")]);
  
  useEffect(() => {
    if (localStorage.getItem("editableReport")) {
      setEditFlag(false);
      setEditData({})
      localStorage.removeItem("editableReport");
    }
  }, [localStorage.getItem("editableReport")]);
 
const handleGetReportsList = () => {
    axios
      .get(`${API_URL}/reportgen/getallreports/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let sortedRows = res.data.sort((a, b) =>
          a.createddate > b.createddate ? -1 : 1
        );
        setDataRows(sortedRows);
      })
      .catch((err) => console.log(err));
  };

const handleGetReportsListuser = () => {
  let usr = sessionStorage.getItem("username_user")
    axios
      .get(`${API_URL}/reportgen/getallreports/by-creator/${usr}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let sortedRows = res.data.sort((a, b) =>
          a.createddate > b.createddate ? -1 : 1
        );
        setDataRows(sortedRows);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (reportid) => {
    axios
      .get(`${API_URL}/reportgen/data/${reportid}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEditData(res.data);
        navigate(`/reports/${reportid}`);
        setEditFlag(true);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (reportid) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    axios
      .delete(`${API_URL}/reportgen/data/${reportid}/`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        handleGetReportsList();
        toast("Deleted successfully");
      })
      .catch((err) => console.log(err));
    
  };


  const handleDownload = () => {
    setOpen(false);
    setCircularProgressVisible(true);
    try {
      let filteredReport = dataRows.filter((row) => {
        return row.reportid == reportId;
      });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file_name:
            value == "ExcelReport"
              ? `${filteredReport[0].excelreport}`
              : `${filteredReport[0].reportloc}`,
        }),
      };

      async function downloadUrl() {
        downloadBuffer(
          await (
            await fetch(`${API_URL}/api/download/`, requestOptions)
          ).arrayBuffer()
        );
      }
      downloadUrl();
      function downloadBuffer(arrayBuffer) {
        if (arrayBuffer.byteLength != 2736) {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(
            new Blob([arrayBuffer], {
              type:
                value == "ExcelReport"
                  ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })
          );
          a.download =
            value == "ExcelReport"
              ? `${
                  filteredReport[0].excelreport
                    .split("/")[2]
                    .toString()
                    .split(".")[0]
                }.xlsx`
              : `${
                  filteredReport[0].reportloc
                    .split("/")[2]
                    .toString()
                    .split(".")[0]
                }.docx`;
          a.click();
          ToastsStore.success("Report downloaded successfully");
        } else ToastsStore.warning("Something Went Wrong");
        setCircularProgressVisible(false);
      }
    } catch (error) {
      ToastsStore.warning("Something Went Wrong");
    }
  };
  const handleSpecificReport = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportid: reportId,
        region: specificReportVisible ? selectedRegion : "",
        country: specificReportVisible ? selectedCountry : "",
        year: startYear,
      }),
    };
    downloadUrl();
    async function downloadUrl() {
      downloadBuffer(
        await (
          await fetch(`${API_URL}/reportgen/repo/`, requestOptions)
        ).arrayBuffer()
      );
    }

    function downloadBuffer(arrayBuffer) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(
        new Blob([arrayBuffer], {
          type: "application/zip",
        })
      );
      a.download = "my-file.zip";
      a.click();
    }
  };

  // console.log("DataRows:--->",dataRows)
  return sessionStorage.getItem('is_staff') === 'true'?( !editFlag && localStorage.getItem("reports") ? (
    <React.Fragment>
      <ToastsContainer store={ToastsStore} position="top_center" />

      <div className="tableContainerDiv">
        <TableContainer component={Paper}>
          <div className="boxContainer">
            <table className="elementsContainer">
              <tr>
                <td className="searchTd">
                  <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => {
                      setFlag(false)
                      setQuery(e.target.value)}}
                  />
                  <SearchIcon style={{ fontSize: "26px", color: "#2980b9" }} />
                </td>
              </tr>
            </table>
          </div>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#005cb8" }}>
                <TableCell style={{ width: 150, color: "white" }}>
                  Report Name
                </TableCell>
                <TableCell style={{ width: 150, color: "white" }}>
                  Geography
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Start Year
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  End Year
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Added by
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Added Date
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            { (flag || query=="")  ?
              
              (rowsPerPage > 0
                ? dataRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataRows
              )
              .filter(
                  (row) =>
                    row.reportname
                      .toString()
                      .toLowerCase()
                      .includes(query.toLowerCase()) 
                )
                .map((row) => (
                  <TableRow key={row.reportid}>
                    <TableCell>{row.reportname}</TableCell>
                    <TableCell>{row.geography}</TableCell>
                    <TableCell>{row.base_year}</TableCell>
                    <TableCell>{row.endyear}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.createddate}</TableCell>
                    <TableCell>
                      <DownloadIcon
                        titleAccess="Download Report"
                        onClick={() => handleClickOpen(row.reportid)}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <EditIcon
                        titleAccess="Edit Report"
                        onClick={() => {
                          localStorage.removeItem("reports");
                          handleEdit(row.reportid);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <DeleteIcon
                        titleAccess="Delete Report"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen:true,
                            title:"Are you sure to delete this report?",
                            subTitle:"You can't undo this report",
                            onConfirm:()=>{handleDelete(row.reportid)}
                          })
                          
                          }
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                )):
                dataRows.filter(
                  (row) =>
                    row.reportname
                      .toString()
                      .toLowerCase()
                      .includes(query.toLowerCase()) 
                )
                .map((row) => (
                  <TableRow key={row.reportid}>
                    <TableCell>{row.reportname}</TableCell>
                    <TableCell>{row.geography}</TableCell>
                    <TableCell>{row.base_year}</TableCell>
                    <TableCell>{row.endyear}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.createddate}</TableCell>
                    <TableCell>
                      <DownloadIcon
                        titleAccess="Download Report"
                        onClick={() => handleClickOpen(row.reportid)}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <EditIcon
                        titleAccess="Edit Report"
                        onClick={() => {
                          localStorage.removeItem("reports");
                          handleEdit(row.reportid);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <DeleteIcon
                        titleAccess="Delete Report"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen:true,
                            title:"Are you sure to delete this report?",
                            subTitle:"You can't undo this report",
                            onConfirm:()=>{handleDelete(row.reportid)}
                          })
                          
                          }
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )
              }
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
      </div>
      {circularProgressVisible && <CircularProgress />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Download Report</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="WholeReport"
                control={<Radio />}
                label="Whole Report"
              />
              <FormControlLabel
                value="SpecificReport"
                control={<Radio />}
                label="For Specific Region/Countries"
              />
              <FormControlLabel
                value="ExcelReport"
                control={<Radio />}
                label="Excel Report"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          {value == "SpecificReport" && (
            <div className="specificReportInput">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Start Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={startYear}
                  label="Start Period"
                  onChange={(e) => setStartYear(e.target.value)}
                  required
                >
                  <MenuItem>Select Start Period</MenuItem>
                  {yearArr &&
                    yearArr.length > 0 &&
                    yearArr.map((year, i) => {
                      return (
                        <MenuItem key={i} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {specificReportVisible && (
                <div>
                  {specificRegionalVisible && (
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ marginLeft: "2rem" }}
                      disabled={selectedCountry ? true : false}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select Region
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedRegion}
                        label="Select Region"
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <MenuItem>Select Region</MenuItem>
                        {regionList &&
                          regionList.length > 0 &&
                          regionList.map((regionName, i) => {
                            return (
                              <MenuItem key={i} value={regionName}>
                                {regionName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  )}

                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    style={{ marginLeft: "2rem" }}
                    disabled={selectedRegion ? true : false}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCountry}
                      label="Select Country"
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <MenuItem>Select Country</MenuItem>
                      {countryList &&
                        countryList.length > 0 &&
                        countryList.map((countryName, i) => {
                          return (
                            <MenuItem key={i} value={countryName}>
                              {countryName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              if (value == "SpecificReport") {
                handleSpecificReport();
              } else handleDownload();
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      <ConfirmDialog 
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  ) : (
    <Report editData={editData} handleGetReportsList={handleGetReportsList} />

  )):( !editFlag && localStorage.getItem("reports") ? (
    <React.Fragment>
      <ToastsContainer store={ToastsStore} position="top_center" />

      <div className="tableContainerDiv">
        <TableContainer component={Paper}>
          <div className="boxContainer">
            <table className="elementsContainer">
              <tr>
                <td className="searchTd">
                  <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => {
                      setFlag(false)
                      setQuery(e.target.value)}}
                  />
                  <SearchIcon style={{ fontSize: "26px", color: "#2980b9" }} />
                </td>
              </tr>
            </table>
          </div>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#005cb8" }}>
                <TableCell style={{ width: 150, color: "white" }}>
                  Report Name
                </TableCell>
                <TableCell style={{ width: 150, color: "white" }}>
                  Geography
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Start Year
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  End Year
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Added by
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Added Date
                </TableCell>
                <TableCell style={{ width: 100, color: "white" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

            { (flag || query=="")  ?
              
              (rowsPerPage > 0
                ? dataRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataRows
              )
              .filter(
                  (row) =>
                    row.reportname
                      .toString()
                      .toLowerCase()
                      .includes(query.toLowerCase()) 
                )
                .map((row) => (
                  <TableRow key={row.reportid}>
                    <TableCell>{row.reportname}</TableCell>
                    <TableCell>{row.geography}</TableCell>
                    <TableCell>{row.base_year}</TableCell>
                    <TableCell>{row.endyear}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.createddate}</TableCell>
                    <TableCell>
                      <DownloadIcon
                        titleAccess="Download Report"
                        onClick={() => handleClickOpen(row.reportid)}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <EditIcon
                        titleAccess="Edit Report"
                        onClick={() => {
                          localStorage.removeItem("reports");
                          handleEdit(row.reportid);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      {/* <DeleteIcon
                        titleAccess="Delete Report"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen:true,
                            title:"Are you sure to delete this report?",
                            subTitle:"You can't undo this report",
                            onConfirm:()=>{handleDelete(row.reportid)}
                          })
                          
                          }
                        style={{ cursor: "pointer" }}
                      /> */}
                    </TableCell>
                  </TableRow>
                )):
                dataRows.filter(
                  (row) =>
                    row.reportname
                      .toString()
                      .toLowerCase()
                      .includes(query.toLowerCase()) 
                )
                .map((row) => (
                  <TableRow key={row.reportid}>
                    <TableCell>{row.reportname}</TableCell>
                    <TableCell>{row.geography}</TableCell>
                    <TableCell>{row.base_year}</TableCell>
                    <TableCell>{row.endyear}</TableCell>
                    <TableCell>{row.creator}</TableCell>
                    <TableCell>{row.createddate}</TableCell>
                    <TableCell>
                      <DownloadIcon
                        titleAccess="Download Report"
                        onClick={() => handleClickOpen(row.reportid)}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      <EditIcon
                        titleAccess="Edit Report"
                        onClick={() => {
                          localStorage.removeItem("reports");
                          handleEdit(row.reportid);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                      &nbsp;&nbsp;
                      {/* <DeleteIcon
                        titleAccess="Delete Report"
                        onClick={() =>
                          setConfirmDialog({
                            isOpen:true,
                            title:"Are you sure to delete this report?",
                            subTitle:"You can't undo this report",
                            onConfirm:()=>{handleDelete(row.reportid)}
                          })
                          
                          }
                        style={{ cursor: "pointer" }}
                      /> */}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )
              }
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
      </div>
      {circularProgressVisible && <CircularProgress />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Download Report</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="WholeReport"
                control={<Radio />}
                label="Whole Report"
              />
              <FormControlLabel
                value="SpecificReport"
                control={<Radio />}
                label="For Specific Region/Countries"
              />
              <FormControlLabel
                value="ExcelReport"
                control={<Radio />}
                label="Excel Report"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          {value == "SpecificReport" && (
            <div className="specificReportInput">
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                  Start Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={startYear}
                  label="Start Period"
                  onChange={(e) => setStartYear(e.target.value)}
                  required
                >
                  <MenuItem>Select Start Period</MenuItem>
                  {yearArr &&
                    yearArr.length > 0 &&
                    yearArr.map((year, i) => {
                      return (
                        <MenuItem key={i} value={year}>
                          {year}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              {specificReportVisible && (
                <div>
                  {specificRegionalVisible && (
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      style={{ marginLeft: "2rem" }}
                      disabled={selectedCountry ? true : false}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Select Region
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedRegion}
                        label="Select Region"
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      >
                        <MenuItem>Select Region</MenuItem>
                        {regionList &&
                          regionList.length > 0 &&
                          regionList.map((regionName, i) => {
                            return (
                              <MenuItem key={i} value={regionName}>
                                {regionName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  )}

                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    style={{ marginLeft: "2rem" }}
                    disabled={selectedRegion ? true : false}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCountry}
                      label="Select Country"
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <MenuItem>Select Country</MenuItem>
                      {countryList &&
                        countryList.length > 0 &&
                        countryList.map((countryName, i) => {
                          return (
                            <MenuItem key={i} value={countryName}>
                              {countryName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              if (value == "SpecificReport") {
                handleSpecificReport();
              } else handleDownload();
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      <ConfirmDialog 
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
      />
    </React.Fragment>
  ) : (
    <Report editData={editData} handleGetReportsList={handleGetReportsListuser} />

  ))


}


