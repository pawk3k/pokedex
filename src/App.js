import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
} from "react-router-dom";

import { createStore } from 'redux';
import {Provider} from "react-redux";
import Main from "./Components/SwitchMain/Main";
const initialState = {
    // new_shop_arr:arr,//new_shop_arr
    visibility_m: "hide", //visibility of menu
    display_arr:[],
    type_f:-1, //filter by type
    visibility_b:false,
    page_num:1,
    page_count:1,
    refresh_s:false
};


function reducer(state=initialState,action) {
    switch(action.type) {
        case 'SET_DISPLAY_ARR':
            let page_count = Math.ceil(action.payload.length/20);
            return {
              ...state,
                page_count: page_count,
              display_arr: action.payload
            };
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            };

        case 'PAGE':
            return {
                ...state,
                page_num: action.payload,
                refresh_s: !state.refresh_s

            };
        case "VISIBILITY":
            return {
              ...state,
              visibility_b: !state.visibility_b
            };
        case "FILTER_B":
            return {
                ...state,
                type_f: action.payload
            };
        default:
            return state;
    }
}

const store = createStore(reducer);



function App() {
    useEffect(()=>{
        console.log("APP mounted")
    });
    return (
    <div className="App">
            <Provider store={store}>
                <Router>
                    <Main/>
                </Router>

            </Provider>
    </div>
  );
}


export default App;
