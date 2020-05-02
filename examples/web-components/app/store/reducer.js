import {
    ADD_ITEM,
    TOGGLE_ITEM,
    REMOVE_ITEM,
    REMOVE_ALL_COMPLETED
} from './actions.js';

const initialState = {
    items: []
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
    case ADD_ITEM:
        return Object.assign({}, state, {
            items: [
                ...state.items,
                {
                  description: action.description,
                  completed: false
                }
              ]
        });
    case TOGGLE_ITEM:
        return Object.assign({}, state, {
            item: state.items.map((item, index) => {
            if (index === action.index) {
                return Object.assign({}, item, {
                    completed: !item.completed
                })
            }
            return item
            })
        });
    case REMOVE_ITEM:
        return Object.assign({}, state, {
            items : [
                ...state.items.filter((item, index) => item.index != index)
            ]
        });
    case REMOVE_ALL_COMPLETED:
        return Object.assign({}, state, {
            items : [
                ...state.items.filter(item => !item.completed)
            ]
        });
    default:
        return state;
    }
};

 export default reducer;