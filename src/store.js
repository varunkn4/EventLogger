import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import { reducers } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

export const history = createHistory({ queryKey: false });
const middlewares = [];

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);


sagaMiddleware.run(rootSaga);
export default store;