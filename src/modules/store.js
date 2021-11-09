import logger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { insertTransientStorageReducer } from './insertTransientStorage';
import { updateTransientStorageReducer } from './updateTransientStorage';

const enhancer =
  NODE_ENV === 'production'
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

const rootReducer = combineReducers({
  insertTransientStorage: insertTransientStorageReducer,
  updateTransientStorage: updateTransientStorageReducer,
});

export const store = createStore(rootReducer, enhancer);
