import React, {Component} from 'react';

const withAuth = (WrappedComponent) => {

    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                onLogin: false
            }
        }

        componentWillMount() {
            if (localStorage.access_token !== '' && localStorage.access_token !== undefined) {
                this.setState({
                    onLogin: true
                });
            }
        }

        render() {
            const onLogin = this.state.onLogin;
            return (
                <WrappedComponent {...this.props} onLogin={onLogin}/>
            )
        }
    }
}

export default withAuth;