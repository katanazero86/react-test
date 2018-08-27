import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Login.css';

// state manage
import {connect} from 'react-redux';
import * as actions from '../../actions';

// axios
import axios from 'axios';

const propTypes = {
    id: PropTypes.string,
    password: PropTypes.string,
    grant_type: PropTypes.string
};

class Login extends Component {

    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
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
            console.log('인증 토큰!!')
            console.log(response)
        }).catch((ex) => {
            console.log('실패!')
            console.log(ex)
        });
    }

    render() {
        return (
            <div className="login-box">
                <div className="form-group">
                    <label htmlFor="user">ID:</label>
                    <input type="text" className="form-control" id="user" value={this.props.id}
                           onChange={this.props.handleChangeId}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" value={this.props.password}
                           onChange={this.props.handleChangePassword}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.userLogin}>LOGIN</button>
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
        grant_type : state.login.grant_type
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
export default Login;