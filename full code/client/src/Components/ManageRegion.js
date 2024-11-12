import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { API_URL } from "../config";

export default class ManageRegion extends React.Component {
  state = {
    newName: "",
    isEdit : false,
    rowId : '',
    allRegions: [
      {
        id: 1,
        region: "North America",
        country: [
          { value: "US", label: "US", country: "US", split: [] },
          { value: "Canada", label: "Canada", country: "Canada", split: [] },
        ],
      },
      {
        id: 2,
        region: "Asia",
        country: [
          { value: "India", label: "India", country: "India", split: [] },
          { value: "China", label: "China", country: "China", split: [] },
        ],
      },
    ],
  };

  // Start Add Course
  changeHandle = (e) => {
    this.setState({ newName: e.target.value });
  };

  getAllRegions = () => {
    axios
      .get(`${API_URL}/reportgen/region/data/`, {
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`,
        },
      })
      .then((data) => this.setState({ allRegions: data.data }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getAllRegions();
  }

  submitAdd = (e) => {
    e.preventDefault();
    if (this.state.newName) {
      let { newName, allRegions } = this.state;

      // allRegions.push({ region: newName, country: [] });

      let body = {
        region: newName,
        country: [],
      };

      axios
        .post(`${API_URL}/reportgen/region/data/`, body, {
          headers: {
            Authorization: `Token ${ sessionStorage.getItem("token")}`,
          },
        })
        .then((data) => {this.getAllRegions(); ToastsStore.success("Region added sccessfully");this.setState({isEdit:false,newName:""})})
        .catch((err) => {console.log(err); ToastsStore.warning("Something went wrong")});
    } else {
      return false;
    }
  };



  editHandle = (id) => {
    let filteredData;
     filteredData = this.state.allRegions.filter(data => {
      return(
        data.id == id
      )
    })
    console.log(filteredData)
    this.setState({newName : filteredData[0].region, isEdit: true, rowId: id})
  }

  // Start Delete Course
  deleteHandle = (id) => {
    axios.delete(`${API_URL}/reportgen/region/data/${id}/`, {
      headers: {
        Authorization: `Token ${ sessionStorage.getItem("token")}`,
      }
    })
    .then(data => {this.getAllRegions(); ToastsStore.success("Region deleted");this.setState({isEdit:false,newName:""})})
    .catch(err => {console.log(err); ToastsStore.warning("Something went wrong")})
  };

  submitEdit = () => {
    let body = {
      "region" : this.state.newName
    }
    axios.put(`${API_URL}/reportgen/region/data/${this.state.rowId}/`,body,
    {
      headers: {
        Authorization: `Token ${ sessionStorage.getItem("token")}`,
      }
    })
    .then(data => {this.getAllRegions(); ToastsStore.success("Region edit successfully"); this.setState({isEdit:false,newName:""})})
    .catch(err => {console.log(err); ToastsStore.warning("Something went wrong")});
  }


  render() {
    return (
      // <div className="app">
      <div className="crud">
        <ToastsContainer store={ToastsStore} position="top_center" />
        {/* <h1>Region</h1> */}
        <input
          type="text"
          style={{ padding: "5px", marginBottom: "35px" }}
          placeholder="Enter Region Name"
          onChange={this.changeHandle}
          value={this.state.newName}
          required
        />
        {
          this.state.isEdit ? (
            <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={this.submitEdit}
          >
            Submit
          </Button> )
          :
           <Button
          variant="contained"
          style={{ margin: "5px" }}
          onClick={this.submitAdd}
        >
          Add
        </Button>
          
        }
       
        <TableContainer component={Paper} className="manageRegionGrid">
          <Table
            // sx={{ minWidth: 650 }}
            // size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow style={{backgroundColor:"#b8b8b8"}}>
                <TableCell>Id</TableCell>
                <TableCell align="center">Region</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.allRegions.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.region}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <EditIcon
                      titleAccess="Edit"
                      onClick={() => this.editHandle(row.id)}
                      style={{ cursor: "pointer" }}
                    />
                    &nbsp;&nbsp;
                    <DeleteIcon
                      titleAccess="Delete Report"
                      onClick={() => this.deleteHandle(row.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <form onSubmit={this.submitAdd}>
            <input
              type="text"
              placeholder="Course Name"
              onChange={this.changeHandle}
              value={this.state.newName}
              required
              maxLength="15"
            />
            <button type="submit">
              <AddIcon />
            </button>
          </form> */}
        {/* <ul>{coursesList}</ul> */}
      </div>
      // </div>
    );
  }
}
