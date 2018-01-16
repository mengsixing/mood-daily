import React, { Component } from 'react';
import { Slider, WingBlank, WhiteSpace, Button, Toast, NavBar, Modal, TextareaItem } from 'antd-mobile';
import axios from 'axios';
import './Home.css'
class App extends Component {
  constructor() {
    super();
    this.state = {
      healthScore: 60,
      studyScore: 60,
      relationshipScore: 60,
      familyScore: 60,
      societyScorce: 60,
      modalDes: '',
      healthDes: '',
      studyDes: '',
      relationshipDes: '',
      familyDes: '',
      societyDes: ''
    };
  }

  componentWillMount() {
    //获取今天的数据
    var userId = localStorage.getItem('userId');
    var _this = this;
    axios.get('/getTodayData', { params: { userId } }).then(function (response) {
      if (response.data.length > 0) {
        _this.setState({
          healthScore: Number.parseInt(response.data[0].healthScore, 10),
          studyScore: Number.parseInt(response.data[0].studyScore, 10),
          familyScore: Number.parseInt(response.data[0].familyScore, 10),
          relationshipScore: Number.parseInt(response.data[0].relationshipScore, 10),
          societyScorce: Number.parseInt(response.data[0].societyScorce, 10),
          datetime: response.data[0].datetime
        });
      }
    });
  }
  changeLog(logType, noop) {
    switch (logType) {
      default:
      case 'health':
        this.setState({
          healthScore: noop
        });
        break;
      case 'study':
        this.setState({
          studyScore: noop
        });
        break;
      case 'relationship':
        this.setState({
          relationshipScore: noop
        });
        break;
      case 'family':
        this.setState({
          familyScore: noop
        });
        break;
      case 'society':
        this.setState({
          societyScorce: noop
        });
        break;
    }
  }

  submitDaily() {
    var userId = localStorage.getItem('userId');
    axios.get('/submitTodayData', { params: { ...this.state, userId } }).then(function (response) {
      Toast.success('提交成功！', 1)
    });
  }
  changeModalDesc(value) {
    this.setState({
      modalDes: value
    });
  }
  showModal(desType) {
    var _this = this;
    setTimeout(function () {
      console.log(_this.refs);
    }, 500);
    Modal.alert('添加描述', <TextareaItem
      rows={5}
      placeholder="我的想法是..."
      onChange={this.changeModalDesc.bind(this)}
      count={100}
    />,
      [
        { text: '取消' },
        {
          text: '添加',
          onPress: value => new Promise((resolve) => {
            var userId = localStorage.getItem('userId');
            var param = { [desType]: _this.state.modalDes, userId };
            axios.get('/submitTodayDescribe', { params: param }).then(function (response) {
              Toast.info('记录成功', 1);
              resolve();
              _this.setState({
                [desType]: _this.state.modalDes
              });
            });
          }),
        },
      ], 'default', null, ['想说点啥...'])
  }
  render() {
    return (
      <div>
        <NavBar mode="dark">心情日记</NavBar>
        <WingBlank size="lg">
          <p className="sub-title">
            身体状态:{this.state.healthScore}
            <span style={{ float: 'right', color: '#108ee9' }} onClick={this.showModal.bind(this, 'healthDes')}>more</span>
          </p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.healthScore}
            onChange={this.changeLog.bind(this, 'health')}
          />
          {this.state.healthDes.length > 0 ? <p className="slider-desc" >描述：{this.state.healthDes}</p> : ''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">学习收获:{this.state.studyScore}<span style={{ float: 'right', color: '#108ee9' }} onClick={this.showModal.bind(this, 'studyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.studyScore}
            onChange={this.changeLog.bind(this, 'study')}
          />
          {this.state.studyDes.length > 0 ? <p className="slider-desc" >描述：{this.state.studyDes}</p> : ''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">人际关系:{this.state.relationshipScore}<span style={{ float: 'right', color: '#108ee9' }} onClick={this.showModal.bind(this, 'relationshipDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.relationshipScore}
            onChange={this.changeLog.bind(this, 'relationship')}
          />
          {this.state.relationshipDes.length > 0 ? <p className="slider-desc" >描述：{this.state.relationshipDes}</p> : ''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">家庭关系:{this.state.familyScore}<span style={{ float: 'right', color: '#108ee9' }} onClick={this.showModal.bind(this, 'familyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.familyScore}
            onChange={this.changeLog.bind(this, 'family')}
          />
          {this.state.familyDes.length > 0 ? <p className="slider-desc" >描述：{this.state.familyDes}</p> : ''}
        </WingBlank>
        <WingBlank size="lg">
          <p className="sub-title">社会压力:{this.state.societyScorce}<span style={{ float: 'right', color: '#108ee9' }} onClick={this.showModal.bind(this, 'societyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.societyScorce}
            onChange={this.changeLog.bind(this, 'society')}
          />
          {this.state.societyDes.length > 0 ? <p className="slider-desc" >描述：{this.state.societyDes}</p> : ''}
        </WingBlank>
        <WhiteSpace /><WhiteSpace /><WhiteSpace /><WhiteSpace />
        <WingBlank size="lg">
          <Button type="primary" onClick={this.submitDaily.bind(this)}>提交</Button>
        </WingBlank>
      </div>
    );
  }
}
export default App;
