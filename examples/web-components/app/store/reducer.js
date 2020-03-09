import {
    ADD_ITEM,
    REMOVE_ALL_COMPLETED
} from './actions.js';

const initialState = {
    items: []
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
    case ADD_ITEM:
        return Object.assign({}, state, {
            todos: [
                ...state.todos,
                {
                  description: action.description,
                  completed: false
                }
              ]
        });
    case REMOVE_ALL_COMPLETED:
        return Object.assign({}, state, {
        });
    default:
        return state;
    }
};

 export default reducer;