import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// state manage
import {connect} from 'react-redux';
import * as actions from '../../actions';

// axios
import axios from 'axios';

// hoc
import withAuth from '../../hoc/withAuth';

const propTypes = {
    id: PropTypes.string,
    password: PropTypes.string,
    grant_type: PropTypes.string,
    onLogin: PropTypes.bool.isRequired
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);

        if(this.props.onLogin === true){
            this.props.history.push('/deal');
        }
    }

    userLogin() {

        axios({
            url: 'http://cms-staging-api.playwings.co.kr:8080/oauth/token',
            method: 'post',
            responseType: 'json',
            responseEncoding: 'utf8',
            params: {
                grant_type: this.props.grant_type,
                username: this.props.id,
                password: this.props.password
            },
            headers: {
                Authorization: 'Basic Y2xpZW50d2ViOjEyMzQ1Ng==',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            console.log('성공!!');
            console.log(response);

            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            localStorage.setItem('token_type', response.data.token_type);
            this.props.history.push('/deal');

        }).catch((ex) => {
            console.log('실패!');
            console.log(ex);
        });
    }

    render() {
        return (
            <div className="login-app">
                <header className="login-app-header">
                    <h3>Welcome to This Page</h3>
                </header>
                <div className="login-box">
                    <div className="login-logo-box">
                        <img src={require('./login_logo.png')} className="login-logo" alt="logo" />
                        <p>USER LOGIN</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">ID:</label>
                        <input type="text" className="form-control" id="user" value={this.props.id}
                               onChange={this.props.handleChangeId} placeholder="ID"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" value={this.props.password}
                               onChange={this.props.handleChangePassword} placeholder="Password"/>
                    </div>
                    <button type="button" className="btn btn-dark" onClick={this.userLogin}>LOGIN</button>
                </div>
            </div>
        )
    }
}

// store 안의 state 값을 props 로 연결
const mapStateToProps = (state) => {
    console.log(state);
    return {
        id: state.login.id,
        password: state.login.password,
        grant_type: state.login.grant_type
    };
};

/*
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만들은 후, 이를 props 로 연결해줍니다.
*/
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: () => {
            dispatch(actions.login())
        },
        handleChangeId: () => {
            dispatch(actions.changeId())
        },
        handleChangePassword: () => {
            dispatch(actions.changePassword())
        },
    }
}

Login.propTypes = propTypes;
Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default withAuth(Login);