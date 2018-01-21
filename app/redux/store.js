import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  //todo delete extra
  return createStore(
      rootReducer,
      initialState + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      // applyMiddleware(reduxInvariant())
  );
}