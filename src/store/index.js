import { createStore, applyMiddleware, compose } from "redux"; //compose
import thunk from "redux-thunk";

import uiReducer from "../reducers/index.js";
// import authReducer from '../reducers/authReducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//? combine reducers
// const rootReducers = combineReducers({
//     uiReducer,
//     authReducer
// });

export const store = createStore(
    uiReducer, 
    composeEnhancers(applyMiddleware(thunk))
)


