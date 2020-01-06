import React, { Component } from 'react';
import Nav from '../Pages/Nav/Nav'
import {BrowserRouter as  Router,Route,Switch} from 'react-router-dom'


class Home extends Component {
    render() {
        return (
            <div className='main'>
                <Router>
<Route path='/' component={Nav}/>
                    </Router>
                
            </div>
        );
    }
}

export default Home;