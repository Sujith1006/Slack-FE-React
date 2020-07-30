import React, { Component } from 'react';
import Nav from '../Pages/Nav/Nav'
import Slacknav from '../Pages/slacknav/Slacknav'
import {BrowserRouter as  Router,Route} from 'react-router-dom'
import Modalcontainer from '../Pages/slacknav/modalbox/Modalcontainer';
import Messagemodal from '../Pages/slacknav/messagebox/Messagemodal';

class Home extends Component {
    render() {
        return (
            <div >
                <Router>
                <Route exact path='/' component={Nav}/>
                <Route  path='/slack' component={Slacknav}/>
                <Route  path='/slackmodal' component={Modalcontainer}></Route>
                 {/* <Redirect from="*" to='/'></Redirect> */}
                <Route  path='/slack/slackmessage' component={Messagemodal}></Route>
                </Router>
                
            </div>
        );
    }
}

export default Home;