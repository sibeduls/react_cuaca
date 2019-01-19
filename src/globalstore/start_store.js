import { createStore, combineReducers, 
  applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducers from './data_pemakai.js';
import APPReducers from './data_app.js';

const rootReducers = combineReducers(
  {pemakai: userReducers,
  tentang_app: APPReducers,
  }
);

export default createStore(rootReducers,
  applyMiddleware(thunk));
