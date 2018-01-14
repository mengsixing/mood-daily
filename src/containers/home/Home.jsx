import React, { Component } from 'react';
import { Slider, WingBlank, WhiteSpace, Button, Toast, NavBar ,Modal,TextareaItem} from 'antd-mobile';
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
      modalDes:'',
      healthDes:'',
      studyDes:'',
      relationshipDes:'',
      familyDes:'',
      societyDes:''
    };
    //获取今天的数据
    var userId = localStorage.getItem('userId');
    var _this = this;
    axios.get('/getTodayData', { params: { userId } }).then(function (response) {
      if(response.data.length>0){
        _this.setState({
          ...response.data[0]
        });
      }
    });
  }

  logHealth(noop) {
    this.setState({
      healthScore: noop
    });
  }
  logStudy(noop) {
    this.setState({
      studyScore: noop
    });
  }
  logRelationship(noop) {
    this.setState({
      relationshipScore: noop
    });
  }
  logFamily(noop) {
    this.setState({
      familyScore: noop
    });
  }
  logSociety(noop) {
    this.setState({
      societyScorce: noop
    });
  }

  submitDaily() {
    var userId = localStorage.getItem('userId');
    axios.get('/submitTodayData', { params: { ...this.state, userId } }).then(function (response) {
      Toast.success('提交成功！', 1)
    });
  }
  changeModalDesc(value){
    this.setState({
      modalDes:value
    });
  }
  showModal(desType){
    var _this=this;
    setTimeout(function(){
      console.log( _this.refs);
    },500);
    Modal.alert('添加描述',  <TextareaItem
    ref="modalTextarea"
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
            var param={[desType]:_this.state.modalDes,userId};
            axios.get('/submitTodayDescribe', { params: param }).then(function (response) {
              Toast.info('记录成功', 1);
              resolve();
              _this.setState({
                [desType]:_this.state.modalDes
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
            <span style={{float:'right',color:'#108ee9'}} onClick={this.showModal.bind(this,'healthDes')}>more</span> 
          </p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.healthScore}
            onChange={this.logHealth.bind(this)}
          />
          {this.state.healthDes.length>0?<p className="slider-desc" >描述：{this.state.healthDes}</p>:''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">学习收获:{this.state.studyScore}<span style={{float:'right',color:'#108ee9'}} onClick={this.showModal.bind(this,'studyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.studyScore}
            onChange={this.logStudy.bind(this)}
          />
          {this.state.studyDes.length>0?<p className="slider-desc" >描述：{this.state.studyDes}</p>:''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">人际关系:{this.state.relationshipScore}<span style={{float:'right',color:'#108ee9'}} onClick={this.showModal.bind(this,'relationshipDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.relationshipScore}
            onChange={this.logRelationship.bind(this)}
          />
          {this.state.relationshipDes.length>0?<p className="slider-desc" >描述：{this.state.relationshipDes}</p>:''}
        </WingBlank>

        <WingBlank size="lg">
          <p className="sub-title">家庭关系:{this.state.familyScore}<span style={{float:'right',color:'#108ee9'}} onClick={this.showModal.bind(this,'familyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.familyScore}
            onChange={this.logFamily.bind(this)}
          />
          {this.state.familyDes.length>0?<p className="slider-desc" >描述：{this.state.familyDes}</p>:''}
        </WingBlank>
        <WingBlank size="lg">
          <p className="sub-title">社会压力:{this.state.societyScorce}<span style={{float:'right',color:'#108ee9'}} onClick={this.showModal.bind(this,'societyDes')}>more</span></p>
          <Slider
            style={{ marginLeft: 30, marginRight: 30 }}
            value={this.state.societyScorce}
            onChange={this.logSociety.bind(this)}
          />
          {this.state.societyDes.length>0?<p className="slider-desc" >描述：{this.state.societyDes}</p>:''}
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
