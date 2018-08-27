import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

// component
import Login from './login/Login'

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to This Page</h1>
                </header>
                <Login/>
            </div>
        );
    }
}

export default App;
