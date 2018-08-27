import React, { Component } from 'react';
import withAuth from "../../hoc/withAuth";

class Deal extends Component{
    render () {
        return (
            <div> 로그인 성공!! 인증 된 사용자! </div>
        )
    }
}

export default withAuth(Deal);