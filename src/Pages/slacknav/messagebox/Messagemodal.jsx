import React, { Component } from "react";
import Attachmodel from './Attachmodel'
import menu from "../../../Images/menu.png"
import colorwheel from '../../../Images/colorwheel.png'
import "./message.css";
import Deletemodel from './Deletemodel'
import attach from '../../../Images/attach.png'
import Addmembers from "./addmembers"
var io = require("socket.io-client");
const axios = require("axios");
class Messagemodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meg: "",
      message: "",
      mainmessage:this.props.location.state.mainmessage,
      text: [],
      recievername: this.props.location.state.to,
      sendername: this.props.location.state.name,
      sendmsgarr:this.props.location.state.sendmsgarr,
      bool: true,
      key: -1,
      members:false,
      sock: io.connect(
        "http://localhost:5000/" + this.props.location.state.name
      ),
      flag: "append",
      attach: false,
      deletedindex: [],
      imageupload: false,
      combinedmsg: [],
      onedate: true,
      editkey: null,
      edittime: null,
      sender: "",
      menuflag: -1,
      showdelete:false,
      msgstatus:1,
      textoptions:false,
      bgcolor:"",
      showsave:false,
      usersinchannel:[],
      datafromchannel:[],
      admin:false,
      showaddoption:false,
      channelid:null,
      creator:false
    };
  }
  componentDidMount = async () => {
    console.log(this.props, "ooo");
    this.setState({channelid:this.props.location.state.toid})
    if(this.props.location.state.channelmsg===true)
    {
          this.fetchchannelmessage();
    }
    else{
    await this.assignprivatemessage();
    }
    // console.log(this.props.location.state.msgarray);

    this.scrollToBottom();
  }
  fetchchannelmessage=()=>{
     axios.post("http://localhost:5000/messages/channelmessages",{
      username:this.props.location.state.name,
      channelid:this.props.location.state.toid
    })
    .then((res)=>{
      console.log(res);
    this.setState({creator:res.data.creator})
    this.setState({admin:res.data.admin});
    this.setState({usersinchannel:res.data.list})
    this.setState({datafromchannel:res.data.messages})
    // this.setState({roletype:res.data.roletype.roletype})
    this.assigntextfromchannel();
    })
    }
  assigntextfromchannel=async()=>{
    var newarray=[];
    var array=[];
    this.state.datafromchannel.map(async(data)=>{
      // console.log(this.state.datafromchannel);
        if(data.sender===this.props.location.state.name)
      {

        array.push(data)
        // console.log(data);
     await  this.setState({sendmsgarr:array})
      //  console.log("ad",array);
      }
      else{
        newarray.push(data)
      await  this.setState({mainmessage:newarray})
        // console.log("sa",newarray);

      }
    })
   await this.combinemessage();
   this.state.sock.on('emitchanneltext',function(data){
     console.log(this.state.combinedmsg);
    var x=this.state.combinedmsg
    x.push(data.messages)
    console.log(data.messages);
    this.setState({combinedmsg:x})
   }.bind(this));
  }
  combinemessage = async () => {
    // console.log(this.state.sendmsgarr,this.state.mainmessage);
    if (this.state.sendmsgarr == undefined) {
      this.setState({ combinedmsg: this.state.mainmessage })

    }
    else if (this.state.mainmessage == undefined) {
      this.setState({ combinedmsg: this.state.sendmsgarr })

    }
    else {
      this.setState({ combinedmsg: this.state.mainmessage.concat(this.state.sendmsgarr) })
    }
  }
  // componentDidUpdate() {
  //   this.scrollToBottom();

  // }
  assignprivatemessage=()=>{

// console.log("sujith");
     axios
      .post("http://localhost:5000/messages/textmessages", {
        sender: this.props.location.state.senderid,
        reciever: this.props.location.state.name
      })
      .then(async (data) => {
            
    
        console.log(data, data.data.msg1.sender.username, this.props.location.state.name,data.data.msg1.bg_color);
        this.setState({ deletedindex: data.data.del });
        if (data.data.msg1.sender.username == this.props.location.state.name) {
          await this.setState({ sendmsgarr: data.data.msg1.messages });
          await this.setState({ mainmessage: data.data.msg2.messages });
          this.setState({bgcolor:data.data.msg1.bg_color})
        
        } else {
          await this.setState({ mainmessage: data.data.msg1.messages });
          await this.setState({ sendmsgarr: data.data.msg2.messages });
          this.setState({bgcolor:data.data.msg2.bg_color})
        }
        await this.combinemessage();

      });

     this.state.sock.on(
      "reciever",
      (async (data) => {
        // this.setState({bgcolor:data.bgcolor})
        console.log('socket', data)
        var del = data.deletedindex;
        console.log('asd', del)
        var x = this.state.mainmessage;
        var y = this.state.combinedmsg;
        console.log(data.data.message);

        if (data.data.flag === 'append') {
          await y.push(
            {
              image: false,
              message: data.data.message,
              sender: data.data.sender,
              time: data.data.time,
              uid: data.data.uid,
              msgstatus:data.data.msgstatus

            }
          );
          // console.log("d", y);
          await this.setState({combinedmsg:y});
          // this.combinemessage();
          
        }
        else if (data.data.flag == 'edit') {
              y[data.data.key] = { image: false, message: data.data.message, sender: data.data.sender, time: data.data.time, uid: data.data.uid,msgstatus:data.data.msgstatus }
          this.setState({ combinedmsg: y });
        }
        else {
          y[data.data.key] = { image: false, message: data.data.message, sender: data.data.sender, time: data.data.time, uid: data.data.uid,msgstatus:data.data.msgstatus }
          this.setState({ combinedmsg: y })

        }

      }).bind(this)

    );

    this.state.sock.on('sendbg',(data)=>
    {
      this.setState({bgcolor:data.back})
    })
  }
  handlesave = e => {

    if (e.target.value.match("/.*[ ]/") == null) {
      this.setState({ message: "" });
    } else {
      this.setState({ message: e.target.value });
    }
  };

  showmessage = async () => {

 if(this.props.location.state.channelmsg===true)
 {
    this.sendchannelmsg();
 }
 else{
    await this.sendprivatemsg();
 }

};
sendprivatemsg=async()=>{
  this.setState({ meg: this.refs.message.value })
  var a = this.state.sendmsgarr != null ? this.state.sendmsgarr : [];
  // console.log(a);
  var today = new Date();
  var date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
  var time = today.getHours() + ":" + ("0" + today.getMinutes()).slice(-2);
  var dateTime = date + ' ' + time;
  var id = Math.floor(Math.random() * 100000);
  let obj = {
    image: this.state.imageupload,
    message: this.refs.message.value,
    sender: this.props.location.state.name,
    time: dateTime,
    uid: id,
    msgstatus:this.state.msgstatus
  }
  // console.log('Obje', obj)
  if (this.state.editkey != null) {
    console.log('edited')

    a.map((ele, ind) => {

      // let parsed = JSON.parse(ele)

      if (ele.uid === this.state.editkey) {
        console.log(ele,ind);
        a[ind] = { image: false, message: this.refs.message.value, sender: this.props.location.state.name, time: ele.time, uid: ele.uid,msgstatus:this.state.msgstatus }

        // console.log(ele.message, "editesd")
      }
    })
    await this.setState({ sendmsgarr: a })
    this.refs.message.value = "";
    await this.emitprivatemessage();

  } else {
    a.push(obj);
    console.log(a);
    this.setState({ edittime: dateTime })
    this.setState({ sender: this.props.location.state.name })
    this.setState({ uid: id })
    await this.setState({ sendmsgarr: a });
    this.refs.message.value = "";
    await this.emitprivatemessage();
  }
}
sendchannelmsg=async()=>{
  this.setState({meg:this.refs.message.value})
  var a = this.state.sendmsgarr != null ? this.state.sendmsgarr : [];
  // console.log(a);
  var today = new Date();
  var date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2);
  var time = today.getHours() + ":" + ("0" + today.getMinutes()).slice(-2);
  var dateTime = date + ' ' + time;
  var id = Math.floor(Math.random() * 100000);
  let obj = {
    message: this.refs.message.value,
    sender: this.props.location.state.name,
    uid: id,
    msgstatus:this.state.msgstatus,
    time:dateTime
  }
  if (this.state.editkey != null) {
    console.log('edited')

    a.map((ele, ind) => {

      // let parsed = JSON.parse(ele)

      if (ele.uid === this.state.editkey) {
        console.log(ele,ind);
        a[ind] = { image: false, message: this.refs.message.value, sender: this.props.location.state.name, time: ele.time, uid: ele.uid,msgstatus:this.state.msgstatus }

        // console.log(ele.message, "editesd")
      }
    })
    await this.setState({ sendmsgarr: a })
    this.refs.message.value = "";
    await this.emitprivatemessage();

  }
  else{
  
    a.push(obj);
    console.log(obj,a);
    this.setState({ edittime: dateTime })
    this.setState({ sender: this.props.location.state.name })
    this.setState({ uid: id })
    await this.setState({ sendmsgarr: a });
    this.refs.message.value = "";
    await this.emitchannelmessage();
  }


}
emitchannelmessage=async()=>{
  this.state.sock.emit("channelmessage",{
    messages:this.state.sendmsgarr,
    from:this.state.sender,
    channelname:this.props.location.state.to,
    time:this.state.edittime,
    channel:true,
    userslist:this.state.usersinchannel,
    options: this.state.flag,
    key: this.state.key,
    deletedindex: this.state.deletedindex,
    image: this.state.imageupload,
    meg: this.state.meg,
    uid: this.state.editkey,
    time: this.state.edittime,
    sender: this.props.location.state.name

  })
  this.setState({ editkey: null })
  this.setState({ key: -1 });
  this.setState({ flag: "append" });
  this.setState({ imageupload: 'false' })
  this.setState({ edittime: null })
  this.setState({msgstatus:1})
 await this.combinemessage();
}
  imageupload = async (imgpath) => {
    console.log(imgpath.name, 'image')
    var today = new Date();
    var date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + ("0" + today.getMinutes()).slice(-2);
    var dateTime = date + ' ' + time;
    var id = Math.floor(Math.random() * 100000);

    var a = this.state.sendmsgarr != null ? this.state.sendmsgarr : [];
    console.log(a);
    let obj = {
      image: this.state.imageupload,
      message: imgpath.name,
      sender: this.props.location.state.name,
      time: dateTime,
      uid: id
    }
    // console.log('Obje', obj)
    if (this.state.key > -1) {
      a[this.state.key] = obj;
      await this.setState({ sendmsgarr: a });
      // console.log("textmsg", a);
      this.refs.message.value = "";
    }
    else {
      console.log(obj);
      a.push(obj);
      // console.log(a);
      await this.setState({ sendmsgarr: a });
      this.refs.message.value = "";
    }
    await this.emitprivatemessage();
  }
  emitprivatemessage() {
    this.state.sock.emit("my other event", {
      messages: this.state.sendmsgarr,
      from: this.state.sendername,
      to: this.state.recievername,
      options: this.state.flag,
      key: this.state.key,
      deletedindex: this.state.deletedindex,
      image: this.state.imageupload,
      meg: this.state.meg,
      uid: this.state.editkey,
      time: this.state.edittime,
      sender: this.props.location.state.name
    });
    // console.log(this.state.key);
    this.refs.message.value = "";
    this.setState({ editkey: null })
    this.setState({ key: -1 });
    this.setState({ flag: "append" });
    this.setState({ imageupload: 'false' })
    this.setState({ edittime: null })
    this.setState({msgstatus:1})
    this.combinemessage()
  }

  showmain() {
    // console.log("array",this.state.combinedmsg);
    
    let array = this.state.combinedmsg;
  
    let flag = true;
    let todayFlag=true;
    let datetodisp="";

    array.sort(function (a, b) {
     

      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    return (
      <div className="newedit">

        {array.map((data, index) => {
          let data1=data;
          let onlydate = data1.time.slice(0, 10)
          var today = new Date();
          var date = today.getFullYear() + '-' + ("0" +
            (today.getMonth() + 1)).slice(-2) + '-' +
            ("0" + today.getDate()).slice(-2);
          if (onlydate == date) {
            if(todayFlag){
              flag=true;
            }
            
            datetodisp = 'Today'

          }
          else {
            if(onlydate!=datetodisp&&datetodisp!==""){
              flag=true;
              datetodisp=onlydate;
            }
            datetodisp = onlydate
          }
          return (
          <div>
            <div>  <span style={{ marginLeft: '50%' }}>{flag ? datetodisp : ''}</span></div>
            {flag = false,datetodisp==="Today"?todayFlag=false:todayFlag=true}
            <div className={data1.sender == this.props.location.state.name ? "msg" : "recimsgdata"}>
          {/* {data1.sender!=this.props.location.state.name?} */}
  {this.props.location.state.channelmsg? <span className={data1.sender != this.props.location.state.name ? "user-name" : "sender"}>{data1.sender}</span>:""}
           {data1.msgstatus==1?<h4 className={data1.sender == this.props.location.state.name ? "dataimg" : "recimsg"}>{data1.message}</h4>:
           <h4 className={data1.sender == this.props.location.state.name ? "dataimg" : "recimsg"}>*This Message Was deleted*</h4>}
           <div className="time-div">   <span className={data1.sender == this.props.location.state.name ?"time-msg":"time-reci"}>{data1.time.slice(10)}</span></div>
              <img src={menu} className="menuoption" onClick={() => this.handlemenu(index,data1.uid)} />
              
              <div className={(this.state.menuflag === index&&data1.msgstatus==1?"showmenu" : "display")}>
                <ul className="editdelete">
                  <li onClick={() => this.editmessage(data1.message, data1.uid, index, data1.time)}>Edit</li>
                  <li onClick={() => this.deletemessage(data1.message, data1.uid, index, data1.time)}>Delete</li>

                </ul></div>
            </div>
          </div>
          );
        })}
      </div>
    );
  }

  handlemenu = (index,uid) => {
    if (index === this.state.menuflag) {
      this.setState({ menuflag: -1 })
    
    }
    else {
      this.setState({ menuflag: index })

    }
  } // componentDidUpdate() {
    //   this.scrollToBottom();
  
    // }
  editmessage = (a, uid, key, time) => {
    this.setState({ key: key });
    this.setState({ sender: this.props.location.state.name })
    this.setState({ editkey: uid })
    this.setState({ edittime: time })
    this.refs.message.value = a;
    this.setState({ flag: "edit" });
    this.setState({ menuflag: -1 })

  };
  deletemessage = async (msg, uid, index, timeof) => {
    this.setState({showdelete:!this.state.showdelete})
    this.setState({menuflag:-1})
    // if (confirm("Are you sure you want to delete this message")) {
      var del = this.state.deletedindex;
      del.push(uid)
      this.setState({ deletedindex: del })
      //  this.setState({key:ind});
      this.setState({ flag: "delete" });
      this.setState({ meg: msg })
      this.setState({ editkey: uid })
      this.setState({ edittime: timeof })
      this.setState({ key: index })
      this.setState({ sender: this.props.location.state.name })
      this.setState({msgstatus:0})


  };
  deletemsg=async()=>
  {
    console.log('asd')
    var deletedtext = this.state.sendmsgarr;
      deletedtext.map((ele, ind) => {
        let parsed=ele
        // console.log(parsed.uid)
        if (parsed.uid === this.state.editkey) {
          // console.log(parsed.uid,this.state.uid)
          deletedtext[ind] = { image: false, message: this.state.meg, sender: this.props.location.state.name, time: this.state.edittime, uid:this.state.uid,msgstatus:this.state.msgstatus}
  
        }
      })
      this.setState({ menuflag: -1 })
    await this.setState({ sendmsgarr: deletedtext })
  await this.emitprivatemessage();
  this.setState({showdelete:!this.state.showdelete})
    
    }
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }
  showattachmodel = () => {
    this.setState({ attach: !this.state.attach })
    this.setState({ imageupload: true })

  }
hidemsg=()=>
{
  this.setState({showdelete:!this.state.showdelete})
  this.setState({msgstatus:1})
}
onKeyPress=(e)=>{
  if(e.which === 13) {
    this.showmessage();
  }
}
openTextoptions=()=>
{
  this.setState({textoptions:!this.state.textoptions})

}
handleColor=async(e)=>
{
 await this.setState({bgcolor:e.target.value})
  await this.setState({showsave:true})
  // this.emitcolor();
}
emitcolor=()=>
{
  console.log("inside");
  
  this.state.sock.emit("bgcolor",
  {
    bgcolor:this.state.bgcolor,
    sender:this.props.location.state.name,
    reciever:this.props.location.state.to
  });
  // this.emitmessage();
  this.setState({showsave:false})
  this.setState({textoptions:!this.state.textoptions})
}
addmembertochannel=()=>{
  this.setState({members:false})
 this.setState({showaddoption:!this.state.showaddoption})
  this.setState({textoptions:!this.state.textoptions})

}
viewmembersinchannel=()=>{  
  console.log("down");
  this.setState({members:true})
  this.setState({showaddoption:!this.state.showaddoption})
  this.setState({textoptions:!this.state.textoptions})

}
  render() {
    var name = "Message " + this.props.location.state.to;
      let send = this.state.combinedmsg != null ? this.showmain() : <div></div>;
      // console.log(this.state.showaddoption);
return (
      
      <div className="message">
         <div className={this.state.textoptions?"showoption":"display"}>
            <ul className="list-colors">
              <li >
                
                <label For="favcolor" className="label-color"> ChatColor <img src={colorwheel} className="colorwheel"/></label>
                <input type="color" id="favcolor" name="favcolor"  onChange={this.handleColor} className="color-box"></input>
                <li onClick={this.emitcolor} className={this.state.showsave?"show-save":"display"}>save</li>
                </li>
                  <li>
                    {this.state.admin||this.state.creator?<h4 className="admin-channel" onClick={this.addmembertochannel}>AddnewMember</h4>:""}

                  </li>
                  <li >
                    {this.state.admin||this.state.creator?
                    <label className='label-color' onClick={this.viewmembersinchannel} > 
                    Members
                    </label>:''}
                  </li>
              </ul>
          </div>
        <div className="to-name">
          {" "}
          <h1 style={{ margin: "0px" }}>{this.props.location.state.to}
          <div className='top-menu'><img src={menu} onClick={this.openTextoptions}/>
           </div>
        </h1>{" "}
          
        </div>
          <div className="msgbox" style={{backgroundColor:this.state.bgcolor==undefined?"white":this.state.bgcolor} }>
          <div className="msgdata">
            {send}
            <div
              ref={el => {
                this.el = el;
              }}
            />
          </div>
          <div className="textmsgbox">
          
             <input
              type="text"
              className="textboxpos"
              placeholder={name}
              ref="message"
              onChange={this.handlesave}
              onKeyPress={this.onKeyPress}
              
            />
            <button className="sendbutton" onClick={this.showmessage}>
              Send
            </button>
            
            
            <img src={attach} onClick={this.showattachmodel} className='attachicon' />
           <div>{this.state.attach ? <Attachmodel click={this.showattachmodel} image={this.imageupload} /> : ''}</div>
            <div>{this.state.showdelete?<Deletemodel delete={this.deletemsg} no={this.hidemsg}/>:''}</div>
            
            <div>{this.state.showaddoption?<Addmembers username={this.props.location.state.name} channel={this.state.channelid} displaybox={this.state.members?this.viewmembersinchannel:this.addmembertochannel} dual={this.state.members} creator={this.state.creator}/>:''}</div>

          </div>
        </div>
      </div>
    );
  }
}

export default Messagemodal;
