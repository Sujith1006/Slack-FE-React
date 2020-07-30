import React, { Component } from "react";
import msg from "../../Images/message.svg";
import app from "../../Images/apps.png";
import search from "../../Images/search.png";
import add from "../../Images/add.png";
import notify from "../../Images/notification.png";
import like from "../../Images/like.png";
import circle from "../../Images/circle.png";
import "./salcknav.css";


import { Link } from "react-router-dom";
import Dropdowncoding from "./Dropdowncoding";
let axios=require('axios')

class slacknav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showcomponent: false, 
      channel: [],
      userfortexting:[],
      messagesrecieved:[],
      roledata:""
  }
    ;
  }
  componentDidMount() {
    console.log(this.props,"callose");
    this.setState({roledata:this.props.location.state.roletype})
    fetch(
      "https://slack.com/api/channels.list?token=xoxp-562007223843-893673060595-894958876449-9b6f07c4ff70559978fb196abd504d21"
    )
      .then(res => res.json())
      .then(data => this.setState({ channel: data.channels }));
      // console.log("gggfkdshf",this.props.location.state.toname)
      this.handleshow();
    }
   handleshow()
    {
      axios.post('http://localhost:5000/messages/showmessage',{sender:this.props.location.state.name})
      .then(msg=>{
        console.log(msg)
        this.setState({messagesrecieved:msg.data});
        console.log(msg.data)
      })
      .catch(err=>console.log(err))
    }
    window=()=>{
      window.location.reload();
    
    }
  handlecall = () => {
    return (this.state.channel.map((data, id) => {
      // console.log(data);
    
          return <li className="apps" onClick={this.window}><Link to={{pathname:"/slack/slackmessage",
                state:{
                  name:this.props.location.state.name,
                  to:data.name,
                  toid:id,
                  channelmsg:true,
                  role:this.state.roledata
                }
        }}style={{ textDecoration: "none", color: "#C4B8C5" }}>{"#" + data.name}</Link></li>;
        })
      
    );
  };
  deletecount=async(a,b)=>{
                       axios
                         .post("http://localhost:5000/messages/deletecount", {
                           senderid: a,
                           name: b
                         })
                         .then(console.log("deleted count"));
                    //  await    this.handlemessages();
                       window.location.reload();

                      
                     }
//     handlemessages=()=>{

// console.log("sujith");
// axios
//  .post("http://localhost:5000/messages/textmessages", {
//    sender: this.props.location.state.senderid,
//    reciever: this.props.location.state.name
//  })
//  .then(async (data) => {
       
// // console.log(data);
//    console.log(data, data.data.msg1.sender.username, this.props.location.state.name,data.data.msg1.bg_color);
//    this.setState({ deletedindex: data.data.del });
//    if (data.data.msg1.sender.username == this.props.location.state.name) {
//      await this.setState({ sendmsgarr: data.data.msg1.messages });
//      await this.setState({ mainmessage: data.data.msg2.messages });
//      this.setState({bgcolor:data.data.msg1.bg_color})
   
//    } else {
//      await this.setState({ mainmessage: data.data.msg1.messages });
//      await this.setState({ sendmsgarr: data.data.msg2.messages });
//      this.setState({bgcolor:data.data.msg2.bg_color})
//    }
//    await this.combinemessage();

//  });
//     }
//     combinemessage=()=>{
//       console.log(this.state.sendmsgarr,this.state.mainmessage);
//     }
  btnclick = () => {
    console.log("sad");
    this.setState({ showcomponent: !this.state.showcomponent });
  };
  handlelist(){
    // console.log(this.state.messagesrecieved);
    return this.state.messagesrecieved.map((data,index)=>{
      return (
        <li  onClick={()=>{this.deletecount(data.sender.id,this.props.location.state.name)}}>
          {" "}
          <img
            src={circle}
            style={{height: "10px",width: "10px"}}
            className="msgs"
          />
          {console.log("incoming")}
          <Link
            to={{
              pathname: "/slack/slackmessage",
              state: {
                senderid: data.sender.id,
                recievername: this.props.location.state.name,
                name: this.props.location.state.name,
                to: data.sender.username,
                msgarray: data.messages,
                bool:true,
                channelmsg:false
              }
            }}
            style={{ textDecoration: "none", color: "#C4B8C5" }}
          >
            {data.sender.username}{data.messagecount!=0?<a className='countmsg'>{data.messagecount}</a>:null}
          </Link>
        </li>
      );
    })
  }
  
  
  render() {
    var list =this.state.messagesrecieved[0]!==undefined?<li>{this.handlelist()}</li>:<li></li>
  // console.log(this.props.location.state.jwt)
  // console.log(this.state.sendmsgarr,this.state.mainmessage);
    return (
      <div className="main">
        <div className="navdiv">
          <div className="top">
            <div className="drop" onClick={this.btnclick}>
              <p style={{ fontWeight: "700", fontSize: "19px" }}>Codingmart</p>
              <i
                className="fas fa-angle-down"
                style={{ marginTop: "24px", marginLeft: "6px" }}
              ></i>
            </div>
            {this.state.showcomponent ? (
              <Dropdowncoding name={this.props.location.state.name} />
            ) : (
              <div></div>
            )}

            <img src={notify} className="bell" />
          </div>

          <div className="online">
            <svg className="img">
              <circle cx="50" cy="50" r="5" strokeWidth="3" fill="green" />
            </svg>
            <p className="stateuser">{this.props.location.state.name}</p>
          </div>
          <div className="jumpto">
            <img
              src={search}
              alt="search"
              style={{ height: "15px", width: "20px", margin: "9px" }}
            ></img>
            <p className="jump">Jumpto</p>
          </div>

          <ul className="tpclass">
            <li className="apps">
              <img
                src={msg}
                alt="thread"
                style={{ height: "15px", width: "20px", paddingRight: "5px" }}
              ></img>
              Threads
            </li>
            <li className="apps">
              <img
                src={app}
                alt="apps"
                style={{ height: "15px", width: "15px", paddingRight: "10px" }}
              ></img>
              Apps
            </li>
          </ul>
          <ul className="tpclass">
            <li className="apps">
              <p style={{ margin: "0", fontWeight: "700" }}>Channels</p>
            </li>
            {this.handlecall()}
          </ul>
          <ul className="tpclass">
            <li className="apps"> + Add Channels</li>
          </ul>
          <ul className="dm">
            <li>
              <Link
                to={{
                  pathname: "/slackmodal",
                  state: { name: this.props.location.state.name}
                }}
                style={{ textDecoration: "none" }}
              >
                <li
                  style={{ fontWeight: "700", color: "white", display: "flex" }}
                  onClick={this.openmodal}
                >
                  Direct messages
                  <img
                    src={add}
                    alt="addicon"
                    style={{
                      height: "16px",
                      float: "right",
                      marginLeft: "33px"
                    }}
                  />
                </li>
              </Link>
            </li>
            <li>
              <img
                src={like}
                style={{ height: "12px", width: "12px" }}
                className="msgs"
              />
              Slackbot
            </li>
            <li>
              <img
                src={circle}
                style={{ height: "10px", width: "10px"}}
                className="msgs"
              />
              {this.props.location.state.name}
            </li>
            <li>
             {list}
            </li>

               
          </ul>
        </div>
        <div></div>
      </div>
    );
  }
}

export default slacknav;
