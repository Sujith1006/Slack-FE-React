import React, { Component } from "react";
import "./dropdowncoding.css";
import { withRouter } from "react-router-dom";

class dropdowncoding extends Component {
  logout()
  {
    localStorage.setItem('loginstatus',false)
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="downdrop">
        <div className="content">
        
          <ul className="listof">
            <h1>
             
              <li className="spacing">{this.props.name}</li>
            </h1>
            <li className="spacing"> Set a status</li>
            <li className="spacing">Profile&account</li>
            <li className="spacing">Preferences</li>
            <li className="spacing">Set Yourself to away</li>
            <li className="spacing">Help & Feedback</li>
          </ul>
          <div className="cm">
            <img
              src="https://avatars.slack-edge.com/2016-04-15/34913412566_1ad6cd8a9c5c030780ce_44.png"
              style={{ height: "34px", marginLeft: "23px", marginTop: "10px" }}
              className="cmicon"
            />
            <p
              style={{ fontSize: "12px", fontWeight: "600", marginTop: "13px" }}
            >
              Codingmart<p style={{ fontSize: "10px" }}>Codingmart.slack.com</p>
            </p>
          </div>
          <div className="offer">
            {" "}
            <p>Get 60% plan off a paid plan,for a limited time</p>
            <p>See upgrade options</p>
          </div>
          <div className="people">
            <ul className="list">
              <li className="spacing">Invite People</li>
              <li className="spacing">Analytics</li>
              <li className="spacing">Customize slack</li>
              <li className="spacing" onClick={this.logout.bind(this)}>Sign out of Codingmart</li>
            </ul>
          </div>
          <p className='another'>Sign into another workplace</p>
          <p className='another'>Open the slack app</p>

        </div>
      </div>
    );
  }
}

export default withRouter(dropdowncoding);
