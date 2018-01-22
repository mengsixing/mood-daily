import React from 'react'
import { TabBar, Toast } from 'antd-mobile'
import Home from '../home/Home.jsx'
import My from '../my/My.jsx'
import dailyselect from './daily-select.svg'
import daily from './daily.svg'
import Immutable from 'immutable'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Immutable.fromJS({
        selectedTab: 'home',
        hidden: false,
        fullScreen: true,
      })
    };

  }
  shouldComponentUpdate(nextProps, nextStates) {
    if (Immutable.is(this.state, nextStates) && Immutable.is(this.props, nextProps)) {
      return false;
    } else {
      return true;
    }
  }
  componentWillMount() {
    var _this = this;
    //判断是否登录
    if (!localStorage.getItem('userId')) {
      Toast.fail('请先登录', 2, function () {
        _this.props.history.push('/login');
      })
    }
  }
  render() {
    return (
      <div style={this.state.data.get('fullScreen') ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
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
              <img src={daily} alt="" style={{ width: '22px', height: '22px' }} ></img>
            }
            selectedIcon={
              <img src={dailyselect} alt="" style={{ width: '22px', height: '22px' }} ></img>
            }
            selected={this.state.data.get('selectedTab') === 'home'}
            onPress={() => {
              this.setState({
                data: this.state.data.update('selectedTab', () => 'home'),
              });
            }}
            data-seed="logId"
          >
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
              <Home></Home>
            </div>
          </TabBar.Item>

          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
              }}
              />
            }
            title="我的"
            key="my"
            selected={this.state.data.get('selectedTab') === 'my'}
            onPress={() => {
              var _this = this;
              this.setState({
                data: _this.state.data.update('selectedTab', function (item) {
                  return 'my'
                })
              });
            }}
          >
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
              <My></My>
            </div>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


export default Index