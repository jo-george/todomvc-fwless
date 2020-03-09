export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ALL_COMPLETED = 'REMOVE_ALL_COMPLETED';

export const addItem = (description) => {
    return {
        type: ADD_ITEM,
        itemDescription: description
    };
};

export const removeAllCompleted = () => {
    return {
        type: REMOVE_ALL_COMPLETED
    };
};