import React, { Component } from "react";
import "./input.css";
import { img } from "../../../Images/male.png";
import { Link } from "react-router-dom";
const axios=require('axios');
class Inputbox extends Component {
  constructor(props) {
    super(props);
    this.state = { disp: "none", name: "",user:[],userselected:[] ,datafromdm:[],id:null};
  }
  componentDidMount()
  {
    // fetch('https://slack.com/api/users.list?token=xoxp-562007223843-893673060595-894958876449-9b6f07c4ff70559978fb196abd504d21')
    // .then(res=>res.json())
    // .then(data=>this.setState({user:data.members}));
    console.log(this.props.name)
    axios.post('http://localhost:5000/user/userlistfetch',{loggeduser:this.props.name})
    .then(data=>{
      // console.log(data.data)
      this.setState({user:data.data})
    
    }
    )
  }
  opendata = e => {
    this.setState({ disp: "block" });
    this.setState({ name: e.target.value });
  };
  handleName(name,id) {

  //   console.log('user',this.state.user)
  // this.state.user.map(data=>{
  //   fetch('http://localhost:5000/user/signup',{
  //     method:'POST',
  //     body:JSON.stringify({name:data.name,password:'1234'}),
  //     headers:{'Content-Type':'application/json'}
  //   })
  //   .then(res=>res.json());
  // })
  this.setState({name:name})
  this.setState({id:id})
 }
  changingevent=()=>{
    console.log("nameeeeww",this.state.name)
    var data=this.state.userselected;
    data.push(this.state.name)
    this.setState({userselected:data})
    localStorage.setItem('arr',JSON.stringify(data))
    
  

    
    }
  

  render() {
  //  console.log(this.state.user)

    return (
      <div className="input">
        <h1 className="dm1">Direct Messages</h1>
        <div className='search'>
        <input
          type="text"
          name="name"
          onChange={e => this.opendata(e)}
          value={this.state.name}
          required
          placeholder="Find or start a conversation"
          className="inpbox"
          list='list'
        />
        <Link to={{pathname:'/slack/slackmessage',state:{name:this.props.name,to:this.state.name,bool:false,senderid:this.state.id}}} style={{textDecoration:'none'}} className="linkbutton"><button className='buttongo' onClick={this.changingevent}>Go</button></Link>
        </div>
        <div className="dropdown1 personlist" style={{ display: this.state.disp }}>
          {this.state.user.map(data => {
            // console.log(data);
            return (
              <div
                className="datafield dropdown1"
                onClick={() => this.handleName(data.username,data.id)}
                key={data.username}
              >
                {/* <div className="imgfield">
                  <img src={data.profile.image_32} className="imgfile" />
                </div> */}
                <div className="namefield">
                  <h2>{data.username}</h2>
                 
                </div>
              </div>
            );
            })}
        </div>
        {console.log(this.state.userselected)}
      </div>
    );
  }
}

export default Inputbox;
