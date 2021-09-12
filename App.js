import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './containers/Main';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from "react-redux";
import dishesReducer from "./store/dishesReducer";
import ordersReducer from "./store/ordersReducer";
import cartReducer from "./store/cartReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  dishesReducer: dishesReducer,
  ordersReducer: ordersReducer,
  cartReducer: cartReducer

});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default function App() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>

  );
}





