export const TRANSIENT_STORAGE_ADD = 'TRANSIENT_STORAGE_ADD';
export const TRANSIENT_STORAGE_REMOVE = 'TRANSIENT_STORAGE_REMOVE';

const init = {
  data: {
    title: '',
    body: '',
    tags: [],
  },
};

export const insertTransientStorageAddAction = data => ({
  payload: data,
  type: TRANSIENT_STORAGE_ADD,
});

export const insertTransientStorageRemoveAction = () => ({
  type: TRANSIENT_STORAGE_REMOVE,
});

export const insertTransientStorageReducer = (state = init, action) => {
  switch (action.type) {
    case TRANSIENT_STORAGE_ADD:
      return {
        ...state,
        data: action.payload,
      };
    case TRANSIENT_STORAGE_REMOVE:
      return init;
    default:
      return state;
  }
};
