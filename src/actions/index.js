import * as types from './ActionTypes';

export function login() {
    return {
        type: types.LOGIN
    };
}

export function changeId() {
    return {
        type: types.CHANGE_ID
    }
}

export function changePassword() {
    return {
        type: types.CHANGE_PASSWORD
    }
}

export function getDeal(response) {
    return {
        type: types.GET_DEAL,
        value: response,
    }
}