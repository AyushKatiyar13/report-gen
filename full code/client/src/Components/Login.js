import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  Card,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "../Helpers/isEmpty";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import "./Login.css";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ToastsContainer, ToastsStore } from "react-toasts";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const errors = {};
    console.log("o")
    if (isEmpty(errors)) {
      console.log("i")
      const user = {
        email: email,
        password: password,
      };
      sessionStorage.setItem("password", user.password);
      // console.log()
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      fetch(`${API_URL}/users/token/login1`, params)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          if (Object.keys(json)[0] == "non_field_errors"){
            ToastsStore.error("Invalid email/Password, Please try again");
          }
            
          else if (json.token) {
             sessionStorage.setItem("token", json.token);
             sessionStorage.setItem("is_staff", json.is_staff);
             sessionStorage.setItem("username_user", json.username);
            navigate("/newproject");
            // console.log(sessionStorage.getItem("username_user"))
            
          } else {
            ToastsStore.warning("Something went wrong");
          }
        })
        .catch((err) => {});
    } else {
      setErrors(errors);
    }
    setTimeout(() => {
      setErrors(errors);
    }, 1000);
  };

  return (
    <React.Fragment>
      <ToastsContainer store={ToastsStore} position="top_center" />
      <Card className="loginformdiv1" style={{borderRadius:"4rem", width:"40%", height:"revert", margin:"auto", marginTop: "12rem", marginBottom:"22rem", outline:"none", boxShadow:"3px 3px 3px #57606f"}}>
        <FormControl
          style={{ display: "inline-block", width: "100%" }}
          onSubmit={onSubmit}
          className="loginform"
        >
          <FormGroup className="cusotmerLogin">
            <h2 style={{ margin: "auto", marginBottom: "5%" }}>Login</h2>
            {errors.failed && (
              <h4 className="invalid-feedback">{errors.failed}</h4>
            )}
            <TextField
              required
              id="input-with-icon-textfield"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={classnames("taLogin", {
                "is-invalid": errors.email,
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              id="standard-basic"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classnames("taLogin", {
                "is-invalid": errors.password,
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            {/* <Link to="/report" className="newcustomerlink"> */}
            <Button
              variant="contained"
              color="primary"
              className="btnlogin"
              type="submit"
              onClick={onSubmit}
            >
              Login
            </Button>
            {/* </Link> */}
          </FormGroup>
        </FormControl>
      </Card>
    </React.Fragment>
  );
}
