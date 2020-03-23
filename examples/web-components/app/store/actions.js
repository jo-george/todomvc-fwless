export const ADD_ITEM = 'ADD_ITEM';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const REMOVE_ALL_COMPLETED = 'REMOVE_ALL_COMPLETED';

export const addItem = (description) => {
    return {
        type: ADD_ITEM,
        description: description
    };
};

export function toggleItem(index) {
    return {
        type: TOGGLE_ITEM,
        index 
    };
  };

export const removeAllCompleted = () => {
    return {
        type: REMOVE_ALL_COMPLETED
    };
};