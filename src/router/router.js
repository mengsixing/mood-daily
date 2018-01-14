import React from 'react'
import { TabBar } from 'antd-mobile'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'



import Home from '../containers/home/Home.jsx'
import My from '../containers/my/My.jsx'
import Login from '../containers/login/Login.jsx'
import Register from '../containers/register/Register.jsx'

import dailyselect from './daily-select.svg'
import daily from './daily.svg'

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: true,
    };
    //判断是否登录
      if(!localStorage.getItem('userId')){
        this.props.history.push('/login');
      }
  }

  renderContent(pageText) {
    var routerComponent=<Home></Home>;
    switch(this.state.selectedTab){
      case 'my':routerComponent=<My></My>; break;
      default : break;
    }
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
          {routerComponent}
      </div>
    );
  }

  render() {
    return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="日记"
            key="home"
            icon={
              <img src={daily} alt="" style={{width:'22px',height:'22px'}} ></img>
            }
            selectedIcon={
              <img src={dailyselect} alt="" style={{width:'22px',height:'22px'}} ></img>
            }
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              console.log(this);
              this.setState({
                selectedTab: 'home',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('home')}
          </TabBar.Item>
          
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
          >
            {this.renderContent('my')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


class MyRouter extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <Route path="/" exact component={TabBarExample}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
      </div>
      </Router>
      
    )
  }
}







export default MyRouter