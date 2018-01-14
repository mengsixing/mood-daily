import React from 'react';
import axios from 'axios'
import { List, InputItem, Button, NavBar,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            repassword: ''
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
    changeRePassword(data) {
        this.setState({
            repassword: data
        });
    }
    submitRegister(){
        var _this=this;
        this.props.form.validateFields((error, value) => {
            if(value.password!==value.repassword){
                Toast.fail('两次输入密码不一致！',1)
                return;
            }
            axios.get('/register',{params:{username:this.state.username,password:this.state.password}}).then(function(response){
                console.log(response.data);
                if(response.data.issuccess){
                    Toast.success('注册成功！',1,function(){
                        _this.props.history.push('/login');
                    })
                }else{
                    Toast.fail(response.data.message,1)
                }
            });
          });
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar mode="dark">心情日记</NavBar>
                <List renderHeader={() => '用户注册'}>
                    <InputItem
                        placeholder="用户名"
                        {...getFieldProps('username')}
                    >用户名</InputItem>
                    <InputItem
                        placeholder="密码"
                        {...getFieldProps('password')}
                        type="password"
                    >密码</InputItem>
                    <InputItem
                        placeholder="确认密码"
                        {...getFieldProps('repassword')}
                        type="password"
                    >确认密码</InputItem>
                    <List.Item>
                        <div>
                            <Button type="primary" onClick={this.submitRegister.bind(this)}>注册</Button>
                        </div>
                    </List.Item>
                </List>
            </div>
        )
    }
}


const RegisterWrapper = createForm()(Register);


export default RegisterWrapper;