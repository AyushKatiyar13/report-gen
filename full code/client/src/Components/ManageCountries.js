import React from "react";
import {
  Button
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { API_URL } from "../config";

export default class ManageCountries extends React.Component {
  state = {
    newName: "",
    courses : [],
    region:"",

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
    allCountries: [],
    selectedRegion : "",
    selectedContryIndex: "",
    isEdit: false
  };

  getAllRegions = (type = "default") => {
    axios
      .get(`${API_URL}/reportgen/region/data/`, {
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`,
        },
      })
      .then((data) =>{
        let selectedRegionCountry = data.data.filter((data) => {
          return(
            data.id == this.state.selectedRegion
          )
        })
        if(type != "default")
          this.setState({ allRegions: data.data, allCountries:selectedRegionCountry[0] })
        else 
          this.setState({ allRegions: data.data, allCountries: data.data[0] })
      } )
      .catch((err) => {console.log(err); ToastsStore.warning("Something went wrong")});
  };

  componentDidMount() {
    this.getAllRegions();
  }

  // Start Add Course
  changeHandle = (e) => {
    this.setState({ newName: e.target.value });
  };
  submitAdd = (e) => {
    e.preventDefault();
    let { newName, allCountries } = this.state;
    if (this.state.newName) {
      let body = {...allCountries}
      body["country"].push({
        value: newName,
        label: newName,
        country: newName,
      });

      axios.put(`${API_URL}/reportgen/region/data/${this.state.selectedRegion}/`,body,{
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`,
        }})
      .then(data => {this.getAllRegions("add"); this.setState({isEdit: false, newName: "",selectedRegion: this.state.selectedRegion}); ToastsStore.success("Country added sccessfully")})
      .catch(err => {console.log(err); ToastsStore.warning("Something went wrong")});

    } else {
      return false;
    }
  };

  // Start Delete Course
  deleteHandle = (value,index) => {

    let body = {...this.state.allCountries};
    body["country"].splice(index,1);


    axios.put(`${API_URL}/reportgen/region/data/${this.state.selectedRegion}/`,body,{
      headers: {
        Authorization: `Token ${ sessionStorage.getItem("token")}`,
      }})
    .then(data => {this.getAllRegions("delete"); this.setState({isEdit: false, newName: "",selectedRegion: this.state.selectedRegion}); ToastsStore.success("Country deleted sccessfully")})
    .catch(err => {console.log(err); ToastsStore.warning("Something went wrong")});
  };

  submitEditCountry = () => {
  
    let body = {...this.state.allCountries};
    body["country"][this.state.selectedContryIndex]["label"] = this.state.newName;
    body["country"][this.state.selectedContryIndex]["value"] = this.state.newName;
    body["country"][this.state.selectedContryIndex]["country"] = this.state.newName;


  axios.put(`${API_URL}/reportgen/region/data/${this.state.selectedRegion}/`,body,{
    headers: {
      Authorization: `Token ${ sessionStorage.getItem("token")}`,
    }})
  .then(data => {this.getAllRegions("edit"); this.setState({isEdit: false, newName: "", selectedRegion: this.state.selectedRegion}); ToastsStore.success("Country Edited sccessfully")})
  .catch(err => {console.log(err); ToastsStore.warning("Something went wrong")});
  }
  
  // Start Edit Course
  editHandle = (value,index) => {

    this.setState({newName: value, selectedContryIndex: index, isEdit:true})
  };


  handleRegionChange = (e) => {
    this.setState({selectedRegion: e.target.value})
    let selectedRegion = this.state.allRegions.filter((data) => {
      return(
        data.id == e.target.value
      )
    })
    this.setState({allCountries: selectedRegion[0]})
  }

  render() {
   
    return (
      <div >
        <ToastsContainer store={ToastsStore} position="top_center" />
        {/* <h1>Region</h1> */}
        <select value={this.state.selectedRegion} onChange={this.handleRegionChange} style={{marginRight:"9px", height:"2.38rem"}}>
          {
            this.state.allRegions && this.state.allRegions.length > 0 && this.state.allRegions.map((data,i) => (
              <option key={i} value={data.id}>{data.region}</option>
            ))
          }
        </select>
        <input
          type="text"
          style={{ padding: "5px", marginBottom: "35px" }}
          placeholder="Enter Country Name"
          onChange={this.changeHandle}
          value={this.state.newName}
          required
        />
        {
          this.state.isEdit ? (
            <Button
            variant="contained"
            style={{ margin: "5px" }}
            onClick={this.submitEditCountry}
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
       <div className="crud">
        <TableContainer component={Paper} className="manageRegionGrid">
          <Table
            // sx={{ minWidth: 650 }}
            // size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow style={{backgroundColor:"#b8b8b8"}}>
                <TableCell>Id</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.allCountries?.country?.length > 0 && this.state.allCountries.country.map((row,i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                 <TableCell align="center">{i+1}</TableCell>
                  <TableCell align="center">{row.label}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <EditIcon
                      titleAccess="Edit"
                      onClick={() => this.editHandle(row.value,i)}
                      style={{ cursor: "pointer" }}
                    />
                    &nbsp;&nbsp;
                    <DeleteIcon
                      titleAccess="Delete Report"
                      onClick={() => this.deleteHandle(row.value,i)}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      
      </div>
    );
  }
}
