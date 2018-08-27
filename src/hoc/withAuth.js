import React, {Component} from 'react';

const withAuth = (Child) => {

    return class extends Component {

        render() {
            if (localStorage.access_token !== '' && localStorage.access_token !== undefined) {
                return (
                    <Child></Child>
                )
            } else {
                return (
                    <Child></Child>
                )
            }

        }
    }
}

export default withAuth;