import React, { Component } from "react";
import "./loginform.css";
import Signup from "./Signup";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      display: "none",
      disp: "block",
      Signupuser: "",
      Signuppass: ""
    };
  }

  opensignupmodal(e) {
    event.preventDefault();
    if (this.state.display == "none") {
      this.setState({ display: "block" });
      this.setState({ disp: "none" });
    } else {
      this.setState({ display: "none" });
      this.setState({ disp: "block" });
    }
  }
  setvaluesuser(e)
  {
    if (
      e.target.value.match(/(?=.*\d)/) ||
      e.target.value.match(/(?=.*[!@#$%^(){}])/) ||
      (e.target.value.length < 2 && e.target.name === "username")
    ) {
      document.getElementsByClassName("text-box")[0].style.borderBottomColor =
        "red";
    } else {
      document.getElementsByClassName("text-box")[0].style.borderBottomColor =
        "black";

      this.setState({ [e.target.name]: e.target.value });
    }
  }
  setvaluespass(e)
  {
    if (
      !e.target.value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ) &&
      e.target.name === "password"
    ) {
      document.getElementsByClassName("text-box")[1].style.borderBottomColor =
        "red";
    } else {
      document.getElementsByClassName("text-box")[1].style.borderBottomColor =
        "black";

      this.setState({ [e.target.name]: e.target.value });
    }
  
  }
  SignupForm() {
    console.log('su');
    this.refs.child.handlesubmit(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="form">
        <div style={{ display: this.state.disp }} className="maindiv">
          <label>Username </label>
          <input
            type="text"
            className="text-box"
            required
            name="username"
            onChange={this.setvaluesuser.bind(this)}
          ></input>
          <br />
          <label>Password </label>
          <input
            type="password"
            className="text-box"
            required
            name="password"
            onChange={this.setvaluespass.bind(this)}
          ></input>
          <br />
          <button className="login-btn" onClick={this.SignupForm.bind(this)}>
            Login
          </button>
          <br />
          <br />
          <label id="ortxt">(Or)</label>
          <br />
          <button
            className="signupbtn"
            onClick={this.opensignupmodal.bind(this)}
          >
            Signup
          </button>
        </div>
        <div style={{ display: this.state.display, paddingTop: "30px" }}>
          <Signup ref="child" data={this.opensignupmodal.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Form;
