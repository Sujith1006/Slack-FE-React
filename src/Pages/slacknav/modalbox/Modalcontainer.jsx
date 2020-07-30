import React, { Component } from "react";
import "./modalcontainer.css";
import Inputbox from "./Inputbox";
import { withRouter } from "react-router-dom";

class modalcontainer extends Component {
  constructor(props){
    super(props);
    this.state={disp:'block'}
  };
  display=()=>
  {
    this.props.history.push({pathname:'/slack',state:{name:this.props.location.state.name}});
  }
  componentDidMount(){
    console.log(this.props);
  }
  
  render() {
    return (
      <div>
        <div className="modal1" style={{display:this.state.disp}}>
          <div className="modal-content-msg">
            <span className="close-msg" onClick={this.display}>
              &times;
            </span>
            <Inputbox name={this.props.location.state.name}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(modalcontainer);
