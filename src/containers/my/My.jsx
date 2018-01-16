import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import axios from 'axios';



var initOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['身体状况', '学习收获', '人际关系', '家庭关系', '社会压力']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '身体状况',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '学习收获',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '人际关系',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '家庭关系',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            name: '社会压力',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ]
}


class App extends PureComponent {
    constructor() {
        super();
        this.getChartData();
        this.state = {
            option: initOption
        }
    }

    getChartData() {
        var _this = this;
        var userId = localStorage.getItem('userId');
        axios.get('/getAllData', { params: { userId } }).then(function (response) {
            var rdata = response.data;
            var healthArray = [];
            var studyArray = [];
            var relationshipArray = [];
            var familyArray = [];
            var societyArray = [];
            var dateArray = [];
            for (let item of rdata) {
                healthArray.push(item.healthScore);
                studyArray.push(item.studyScore);
                relationshipArray.push(item.relationshipScore);
                familyArray.push(item.familyScore);
                societyArray.push(item.societyScorce);
                dateArray.push(item.datetime);
            }
            for (var i = 0; i < 5; i++) {
                initOption.series[0].data = healthArray;
                initOption.series[1].data = studyArray;
                initOption.series[2].data = relationshipArray;
                initOption.series[3].data = familyArray;
                initOption.series[4].data = societyArray;
            }
            initOption.xAxis.data = dateArray;
            _this.setState({
                option: initOption
            });
        });
    }
    clickCharts(params) {
        console.log(params);
        //获取当前角色的当天数据
        var userId = localStorage.getItem('userId');
        var _this = this;
        var date = params.name;
        axios.get('/getAnydayData', { params: { userId, date } }).then(function (response) {
            if (response.data.length > 0) {
                _this.setState({
                    ...response.data[0]
                });
            }
        });
    }
    render() {
        let onEvents = {
            'mousemove': this.clickCharts.bind(this)
        }
        return (
            <div className="am-slider-example">
                <NavBar mode="dark">心情统计</NavBar>
                <WhiteSpace></WhiteSpace>
                <ReactEcharts ref='echartsInstance'
                    option={this.state.option}
                    onEvents={onEvents} />
                <WingBlank>
                    {this.state.healthDes ? <p className="slider-desc" >身体状态描述：{this.state.healthDes}</p> : ''}
                    {this.state.studyDes ? <p className="slider-desc" >学习收获描述：{this.state.studyDes}</p> : ''}
                    {this.state.relationshipDes ? <p className="slider-desc" >人际关系描述：{this.state.relationshipDes}</p> : ''}
                    {this.state.familyDes ? <p className="slider-desc" >家庭关系描述：{this.state.familyDes}</p> : ''}
                    {this.state.societyDes ? <p className="slider-desc" >社会压力描述：{this.state.societyDes}</p> : ''}
                </WingBlank>

            </div>
        );
    }
}
export default App;
