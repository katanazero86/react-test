import * as types from '../actions/ActionTypes';


// store
const initialState = {
    id : 'admin:skilltest@playwings.co.kr',
    password : '1q2w3e4r5t',
    grant_type : 'password'
};

export default function login (state = initialState, action) {

    switch (action.type){
        case types.LOGIN :
            return {
                ...state,
            }
        case types.CHANGE_ID :
            return {
                ...state,
                id : document.getElementById('user').value
            }
        case types.CHANGE_PASSWORD :
            return {
                ...state,
                password : document.getElementById('pwd').value
            }
        default :
            return state;
    }

}