import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
  //todo delete extra
  return createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      // applyMiddleware(reduxInvariant())
  );
}