import React, { Component } from "react";
import "./addmembers.css";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class modalcontainer extends Component {
  constructor(props){
    super(props);
    this.state={
        addmembers:[],
        display: true,
        addedindex:[],
        channelmembers:[],
        adminarr:[],
        creator:[],
        creatorbool:false
    }
  };
 componentDidMount()
 {
     console.log(this.props.channel);
     if(this.props.dual===true)
     {
        Axios.post('http://localhost:5000/messages/memberslistfetch',{channelid:this.props.channel+1,username:this.props.username})
        .then((res)=>{
            console.log(res);
            this.setState({channelmembers:res.data})
            // this.setState({creatorbool:res.data.creator})
        })
     }
     else{
     Axios.post("http://localhost:5000/messages/notmemberslistfetch",{username:this.props.username,channel:this.props.channel+1})
     .then((res)=>{
        this.setState({addmembers:res.data})
     })
    }
 }
 addnewmember=(data,index)=>{
        let arr=this.state.addedindex
        arr.push(index)
        this.setState({addedindex:arr})
        Axios.post("http://localhost:5000/messages/addnewtochannel",{channelid:this.props.channel+1,username:data})
        .then((res)=>{
            console.log(res);
        })
 }
 removefromlist=(data,id)=>{
   console.log(data,id);
  let arr=this.state.addedindex
  arr.push(id)
  console.log(arr);
  this.setState({addedindex:arr})
  Axios.post("http://localhost:5000/messages/removefromchannel",{channelid:this.props.channel+1,username:data})
        .then((res)=>{
            console.log(res);
        })     
 }
 makeadmin=(data,id)=>{
   let arr=this.state.adminarr
   arr.push(id)
   this.setState({adminarr:arr})
   Axios.post("http://localhost:5000/messages/makeadminforchannel",{channelid:this.props.channel+1,username:data})
        .then((res)=>{
            console.log(res);
        })   

 }
 removeadmin=(data,id)=>{
  let arr=this.state.adminarr
  arr.push(id)
  this.setState({adminarr:arr})
  Axios.post("http://localhost:5000/messages/removeadminforchannel",{channelid:this.props.channel+1,username:data})
       .then((res)=>{
           console.log(res);
       })   


 }
 makecreator=(data,id)=>{
   let newarr=this.state.creator
   newarr.push(id)
   this.setState({creator:newarr})
   Axios.post("http://localhost:5000/messages/makecreator",{channelid:this.props.channel+1,username:data,creator:this.props.username})
   .then((res)=>{
       console.log(res);
   })   

 }
 
  render() {
      console.log(this.state.channelmembers);
      
    
    return (
      <div>
        <div className="modal1-1"  >
          <div className="modal-content-msg-1">
          <span className="close" onClick={()=>this.props.displaybox()}>
              &times;
            </span>
            {!this.props.dual?this.state.addmembers.map((data,index)=>{
                return <div className="users-div">
                            <h4>{data.username}</h4>
                            <button className={this.state.addedindex.indexOf(index)>-1?"btn-disable":"btn-add"} onClick={()=>this.addnewmember(data.username,index)}>Add</button>
                         </div>
            }):this.state.channelmembers.map((res,ind)=>{
                return<div className='list-users'>
                        <h4>{res.user.username}{res.role.roletype==="admin"?<span className='admin-id'>Admin</span>:res.role.roletype==="user"?<span></span>:<span className='admin-id'>creator</span>}</h4>
                      {res.role.roletype!='creator'?res.role.roletype!="admin"?  <button className={this.state.addedindex.indexOf(ind)>-1?"btn-dis-remove":"btn-remove"} onClick={()=>this.removefromlist(res.user.username,ind)}>Remove</button>:'':''}
                        {res.role.roletype!='creator'?res.role.roletype=='admin'||this.state.addedindex.indexOf(ind)>-1?"":
                        <button className={this.state.adminarr.indexOf(ind)>-1?"btn-dis-admin":"btn-admin"}onClick={()=>this.makeadmin(res.user.username,ind)}>MakeAdmin</button>:''}
                       {res.role.roletype=='admin'&&this.props.creator?<button className={this.state.adminarr.indexOf(ind)>-1?"btn-dis-admin":"btn-admin"}onClick={()=>this.removeadmin(res.user.username,ind)}>RemoveAdmin</button>:''}
                       {res.role.roletype=='admin'&&this.props.creator?<button className={this.state.creator.indexOf(ind)>-1?"btn-dis-admin":"btn-admin"}onClick={()=>this.makecreator(res.user.username,ind)}>Makecreator</button>:''}
                        </div>
            })}
            
              
            
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(modalcontainer);
