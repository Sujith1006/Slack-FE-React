import React, { Component } from "react";
import './attach-model.css'

class Attachmodel extends Component {
    constructor(props)
    {
        super(props);
        this.state={
          data:''
        }
      

    }
  sendimage=(e)=>
  {
    
         this.props.click()
         let formdata= new FormData();
         formdata.append('image',this.state.data)
         this.props.image((this.state.data))
        console.log(this.state.data)
  }
  handlechange=(e)=>
  {
    console.log(e.target.files);
    this.setState({data:e.target.files[0]})
  }

  render() {
    return (
      <div>
        <div id="myModal" className="modal-attach">
          <div className="modal-attach-content">
              <input type='file' name='Add Image' onChange={this.handlechange}/>
              <button onClick={this.sendimage}>Upload</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Attachmodel;
