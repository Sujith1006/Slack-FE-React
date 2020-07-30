import React, { Component } from "react";
import "./signupalert.css";
import "./sigup.css";
import {withRouter} from "react-router-dom";
let axios=require('axios');
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email:'',
      password: "",
      cnfrmpassword: "",
      error: "",
      usererror: true,
      passerror: true,
      cnfrmpasserror: true
    };
  }
  makechangeuser(e) {
    var reg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (
      !e.target.value.match(reg) ||
      (e.target.value.length < 2 && e.target.name === "username")
    ) {
      this.setState({ usererror: false });
    } else {
      this.setState({ usererror: true });

      this.setState({ [e.target.name]: e.target.value });
     
    }
  }
  makechangepass(e) {
    if (
      !e.target.value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ) ||
      (e.target.value.match(/.*[ ]/) && e.target.name === "password")
    ) {
      this.setState({ passerror: false });
    } else {
      this.setState({ passerror: true });

      this.setState({ [e.target.name]: e.target.value });
      

    }
  }
makechangeemail=(e)=>
{
  this.setState({email:e.target.value})
  }
  makeconfrmpass(e) {
    if (this.state.password === e.target.value) {
      localStorage.setItem('username',this.state.username)
      localStorage.setItem('password',this.state.password)
      this.setState({ cnfrmpassword: e.target.value });
      this.setState({ cnfrmpasserror: true });
      this.setState({ error: "Password Matched" });
    } else {
      this.setState({ cnfrmpasserror: false });

      this.setState({ error: "Password Mismatched" });
    }
  }
  dosubmit=()=> {
    console.log("haiiii")
    // this.props.dosubmit(this.state.username,this.state.password);
    axios.post("http://localhost:5000/user/signup",{name:this.state.username,email:this.state.email,pass:this.state.password})
    .then((res)=>{
        console.log(res)
         


    // })
    // fetch("http://localhost:8000/signup",{
    //   method : "post",
    //   headers : { 'Content-Type' : 'application/json'},
    //   body : JSON.stringify({
    //     name:this.state.username,email:this.state.email,pass:this.state.password
    //   })
    // })
   
  })
}


  render() {
    return (
      <div className="signupform">
        <form onSubmit={this.props.data}>
          <label className="textuser">Username </label>
          <br />
          <input
            type="text"
            className={this.state.usererror ? "signup" : "Signuperror"}
            required
            name="username"
            onChange={this.makechangeuser.bind(this)}
          ></input>
          <p id="format1">Min 2 character including both lower and uppercase</p>
          <br />
          <label className="textuser">Email</label>
          <br />
          <input
            type="text"
            className={this.state.usererror ? "signup" : "Signuperror"}
            required
            name="username"
            onChange={this.makechangeemail.bind(this)}
          ></input>
          <p id="format1">Min 2 character including both lower and uppercase</p>
          <br />
          <label>Password </label>
          <br />
          <input
            type="password"
            className={this.state.passerror ? "signup" : "Signuperror"}
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
            className={this.state.cnfrmpasserror ? "signup" : "Signuperror"}
            onChange={this.makeconfrmpass.bind(this)}
          ></input>
          {this.state.error}
          <br />
          <span></span>
          <button className="signupbtn1" type="submit" onClick={this.dosubmit}>
            SignIn
          </button>
          <br />
          <br />
        </form>
        {console.log(this.state.username,this.state.password,this.state.email)}
      </div>
    );
  }
}
export default withRouter(Signup);
