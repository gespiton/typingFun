import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
  //todo delete extra
  return createStore(
    rootReducer,
    initialState, window.__REDUX_DEVTOOLS_EXTENSION_
    // applyMiddleware(reduxInvariant())
  );
}