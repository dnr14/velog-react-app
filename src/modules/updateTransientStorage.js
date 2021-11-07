export const UPDATE_TRANSIENT_STORAGE_ADD = 'UPDATE_TRANSIENT_STORAGE_ADD';
export const UPDATE_TRANSIENT_STORAGE_REMOVE =
  'UPDATE_TRANSIENT_STORAGE_REMOVE';

const init = {};

export const updateTransientStorageAddAction = (id, data) => ({
  id,
  payload: data,
  type: UPDATE_TRANSIENT_STORAGE_ADD,
});

export const updateTransientStorageRemoveAction = id => ({
  type: UPDATE_TRANSIENT_STORAGE_REMOVE,
  id,
});

export const updateTransientStorageReducer = (state = init, action) => {
  switch (action.type) {
    case UPDATE_TRANSIENT_STORAGE_ADD:
      return {
        ...state,
        [`${action.id}`]: action.payload,
      };
    case UPDATE_TRANSIENT_STORAGE_REMOVE:
      return Object.entries(state).reduce((arr, cur) => {
        if (cur[0] !== action.id) {
          return {
            ...arr,
            [`${cur[0]}`]: cur[1],
          };
        }
        return arr;
      }, {});
    default:
      return state;
  }
};
