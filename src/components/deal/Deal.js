import React, {Component} from 'react';
import withAuth from "../../hoc/withAuth";
import PropTypes from "prop-types";


const propTypes = {
    onLogin: PropTypes.bool.isRequired
};

class Deal extends Component {

    constructor(props) {
        super(props)
        if (this.props.onLogin !== true) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div> 로그인 성공!! 인증 된 사용자! </div>
        )
    }
}

Deal.propTypes = propTypes;

export default withAuth(Deal);