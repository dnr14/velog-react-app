import logger from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { insertTransientStorageReducer } from './insertTransientStorage';

const enhancer =
  NODE_ENV === 'production'
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

const rootReducer = combineReducers({
  insertTransientStorage: insertTransientStorageReducer,
});

export const store = createStore(rootReducer, enhancer);
