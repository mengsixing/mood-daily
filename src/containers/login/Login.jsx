import React from 'react';
import axios from 'axios';
import { List, InputItem, Button, NavBar,Toast } from 'antd-mobile';
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }
    componentDidMount() {
        console.log(this.props.history);
    }
    changeUsername(data) {
        this.setState({
            username: data
        });
    }
    changePassword(data) {
        this.setState({
            password: data
        });
    }
    submitLogin(data) {
        var _this=this;
        axios.get('/login',{params:{...this.state}}).then(function(response){
            console.log(response.data);
            if(response.data.message){
                Toast.success('登录成功！',1,function(){
                    localStorage.setItem('userId',response.data.id);
                    _this.props.history.push('/');
                })
            }else{
                Toast.fail('登录失败！',1)
            }
        });
    }
    render() {
        return (
            <div>
                <NavBar mode="dark">心情日记</NavBar>
                <List renderHeader={() => '用户登录'}>
                    <InputItem
                        placeholder="用户名"
                        onChange={this.changeUsername.bind(this)}
                    >用户名</InputItem>
                    <InputItem
                        placeholder="密码"
                        type="password"
                        onChange={this.changePassword.bind(this)}
                    >密码</InputItem>
                    <List.Item>
                        <div style={{ textAlign: 'right' }}> 没有账号？<Link to="/register">注册</Link> </div>
                    </List.Item>
                    <List.Item>
                        <div>
                            <Button type="primary" onClick={this.submitLogin.bind(this)}>登录</Button>
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}


export default Login;