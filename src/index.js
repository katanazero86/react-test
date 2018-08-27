import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducers from './reducers';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import registerServiceWorker from './registerServiceWorker';

// components
import App from './components/App';
import Deal from './components/deal/Deal';


const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/" exact component={App}/>
                <Route path="/deal" component={Deal}/>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
