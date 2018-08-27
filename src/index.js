import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import registerServiceWorker from './registerServiceWorker';

// components
import Login from './components/login/Login';
import Deal from './components/deal/Deal';


const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/deal" component={Deal}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
