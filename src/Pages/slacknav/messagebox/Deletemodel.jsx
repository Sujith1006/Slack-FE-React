import React, { Component } from 'react';
import './deletemodel.css'

class Deletemodel extends Component {
    render() {
        return (
            
            
        <div id="myModal" className="modal-attach-del">
          <div className="modal-attach-content-del">
              <a className='text'>Are you sure you want to delete this message?</a>
              <div>
              <button onClick={this.props.delete} className="yes-btn">Yes</button>
              <button className="no-btn" onClick={this.props.no} >No</button>
              </div>
          </div>
        
            </div>
        );
    }
}

export default Deletemodel;