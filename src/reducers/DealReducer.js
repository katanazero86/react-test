import * as types from '../actions/ActionTypes';


// store
const initialState = {
    currentPage : 1,
    dealInfo: {},
    dealList: [],
};

export default function deal (state = initialState, action) {

    switch (action.type){
        case types.GET_DEAL :
            return {
                ...state,
                dealInfo:action.value,
                dealList:action.value.content,
                currentPage:action.value.number + 1,
            }
        default :
            return state;
    }

}