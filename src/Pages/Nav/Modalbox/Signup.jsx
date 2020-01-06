import React, { Component } from "react";
// import './loginform.css'
// import '../makestyle.css'
import "./sigup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", cnfrmpassword: "", error: "" };
  }
  makechangeuser(e) {
    if (
      e.target.value.match(/(?=.*\d)/) ||
      e.target.value.match(/(?=.*[!@#$%^(){}])/) ||
      (e.target.value.length < 2 && e.target.name === "username")
    ) {
      document.getElementsByClassName("signup")[0].style.borderBottomColor =
        "red";
    } else {
      document.getElementsByClassName("signup")[0].style.borderBottomColor =
        "black";

      this.setState({ [e.target.name]: e.target.value });
    }
  }
  makechangepass(e) {
    if (
      !e.target.value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ) &&
      e.target.name === "password"
    ) {
      document.getElementsByClassName("signup")[1].style.borderBottomColor =
        "red";
    } else {
      document.getElementsByClassName("signup")[1].style.borderBottomColor =
        "black";

      this.setState({ [e.target.name]: e.target.value });
    }
  }

  makeconfrmpass(e) {
    if (this.state.password === e.target.value) {
      this.setState({ cnfrmpassword: e.target.value });
      document.getElementsByClassName("signup")[2].style.borderBottomColor =
        "black";
      this.setState({ error: "Password Matched" });
    } else {
      document.getElementsByClassName("signup")[2].style.borderBottomColor =
        "red";
      this.setState({ error: "Password Mismatched" });
    }
  }
  handlesubmit(name, pass) {
    let a = this.state.username;
    console.log(a, name);
    let b = this.state.password;
    if (a === name && b === pass) {
      console.log("ok");
    }
  }

  render() {
    return (
      <div className="signupform">
        <form onSubmit={this.props.data}>
          <label className="textuser">Username </label>
          <br />
          <input
            type="text"
            className="signup"
            required
            name="username"
            onChange={this.makechangeuser.bind(this)}
          ></input>
          <p id="format1">Min 2 character including both lower and uppercase</p>
          <br />
          <label>Password </label>
          <br />
          <input
            type="password"
            className="signup"
            required
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={this.makechangepass.bind(this)}
          ></input>
          <p id="format1">Min 8 character including (A-Z,a-z,!-)) </p>
          <br />
          <label className="label"> ConfirmPassword </label>
          <br />
          <input
            type="password"
            required
            name="cnfrmpassword"
            className="signup"
            onChange={this.makeconfrmpass.bind(this)}
          ></input>
          {this.state.error}
          <br />
          <span></span>
          <button className="signupbtn1" type="submit">
            SignIn
          </button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}
export default Signup;
