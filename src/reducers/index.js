import { combineReducers } from 'redux';
import login from './LoginReducer';
import deal from './DealReducer'

const reducers = combineReducers({
    login, deal
});

export default reducers;