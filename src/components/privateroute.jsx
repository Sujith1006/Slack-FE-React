import React from 'react';
import { Route, Redirect } from "react-router-dom";

import FakeAuth from './auth';

const PrivateRoute=({component: Component,...rest})=>{
    return (
        <Route {...rest} render={
            (props)=>{
                console.log(FakeAuth.getAuth())
                if(FakeAuth.getAuth()=="true")
                {
                    return <Component {...props}/>
                }
                else
                return <Redirect to={
                    {
                        pathname:"/",
                        state:{
                            from:props.location,
                        }
                    }
                }/>
            }
        }/>
    )
}
export default PrivateRoute;