import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
      rootReducer,
      initialState
      // applyMiddleware(reduxInvariant())
  );
}