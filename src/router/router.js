import React from 'react'
import Index from '../containers/index/Index.jsx'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Login from '../containers/login/Login.jsx'
import Register from '../containers/register/Register.jsx'


class MyRouter extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <Route path="/" exact component={Index}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
      </div>
      </Router>
    )
  }
}


export default MyRouter