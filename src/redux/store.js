import { createStore, applyMiddleware } from "redux";
//处理redux的异步任务的中间件
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
