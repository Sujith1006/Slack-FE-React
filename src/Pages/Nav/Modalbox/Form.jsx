import React, { Component } from "react";
import "./loginform.css";
import './loginformalert.css'
import Signup from "./Signup";
import { withRouter } from "react-router-dom";
const axios = require('axios')

 


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      display: "none",
      disp: "block",
      usererror: true,
      passerror: true,
      usersigned: "",
      passsigned: "",
      roletype:""
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
  setvaluesuser = e => {
    // var reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

    // if (
    //   !e.target.value.match(reg) ||
    //   (e.target.value.length < 2 && e.target.name === "username")
    // ) {
    //   this.setState({ usererror: false });
    // } else {
      // this.setState({ usererror: true });

      this.setState({ [e.target.name]: e.target.value });
    // }
  };
  setvaluespass = e => {
    // if (
    //   !e.target.value.match(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    //   )||( e.target.value.match(/.*[ ]/)
    //    &&
    //   e.target.name === "password")
    // ) {
    //  this.setState({passerror:false});
    // } else {
    //   this.setState({passerror:true});

    this.setState({ [e.target.name]: e.target.value });
    // }
  };

  Signup = async() =>{
    // console.log("sad", this.state.password);
    axios
      .post("http://localhost:5000/user/login", {
        signedname: this.state.username,
        signedpass: this.state.password
      })
      .then(async(res) => {
        console.log(res.data.role);
       await sessionStorage.setItem('user',this.state.username)
       await localStorage.setItem('loginstatus',true);
          this.setState({roletype:res.data.role})
       this.pushnextpage();
       
      });
    // if((this.state.username===localStorage.getItem('username'))&&(this.state.password===localStorage.getItem('password')))
    // {
    //  this.props.history.push({pathname:"/slack",state:{name:this.state.username}});
    // }
    //  else{
    //    alert('Incorrect Username Or Password')
    //  }
  }
pushnextpage=async()=>{
  await this.props.history.push({
    pathname: "/slack",
    state: { name: this.state.username,roletype:this.state.roletype }
  });
}
downloadfile = () => {
  console.log("Incom");
  let data='sujith'
  const element = document.createElement("a");
  const file = new Blob([data], {type: 'html'});
  element.href = URL.createObjectURL(file);
  element.download = "myFile.html";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}
  render() {
    return (
      <div className="form">
        <div style={{ display: this.state.disp }} className="maindiv">
          <label>Username </label>
          <input
            type="text"
            className={this.state.usererror ? "text-box" : "text-box-error"}
            required
            name="username"
            onChange={event => this.setvaluesuser(event)}
          ></input>

          <label>Password </label>
          <input
            type="password"
            className={this.state.passerror ? "text-box" : "text-box-error"}
            required
            name="password"
            onChange={event => this.setvaluespass(event)}
          ></input>
          <br />
          <button className="login-btn" onClick={this.Signup.bind(this)}>
            Login
          </button>
          {console.log(this.state.password)}
          {"\n"}
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
          <Signup
            dosubmit={
              (this.SignupForm = (a, b) => {
                this.setState({ usersigned: a }),
                  this.setState({ passsigned: b });
              })
            }
            data={this.opensignupmodal.bind(this)}
          />
        </div>
        {/* {console.log(this.state.usersigned, this.state.passsigned)} */}
      <React.Fragment><button onClick={this.downloadfile}>Download</button></React.Fragment>

      </div>
    );
  }
}

export default  withRouter(Form);
