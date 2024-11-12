import React, { useState, useEffect } from "react";
import { FormGroup, FormControl, Card, InputAdornment, TextField, Grid } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';
import "./Login.css";
import { API_URL } from "../config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

    useEffect(() => {
       axios.get(`${API_URL}/users/users/`,{
        headers: {
          Authorization: `Token ${ sessionStorage.getItem("token")}`
        }})
       .then((data)=> {
           setName(data.data[0].username);
           setRole(data.data[0].designation);
           setEmail(data.data[0].email);
       })
    }, [])

  return (
    <div>
      <React.Fragment>
        <Card className="loginformdiv1">
          <FormControl
            style={{ display: "inline-block", width: "100%" }}
            className="loginform"
          >
            <FormGroup className="cusotmerLogin">
              <h2 style={{ margin: "auto", marginBottom: "5%" }}>My Profile</h2>
              <Grid className="gridField">
                <TextField
                  disabled={true}
                  id="input-with-icon-textfield"
                  label="Full Name"
                  name="name"
                  value={name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  disabled={true}
                  id="input-with-icon-textfield"
                  label="Email Address"
                  className="emailSignupField"
                  name="emailid"
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid className="gridField2">
                <TextField
                  disabled={true}
                  id="standard-basic"
                  label="Role"
                  value={role}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                         <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                />
             
              </Grid>
           
            </FormGroup>
          </FormControl>
        </Card>
      </React.Fragment>
    </div>
  );
}
