import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import MaterialGrid from "./Components/Filter/MaterialGrid";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import TemplatesContainer from "./Components/Template/TemplatesContainer";
import arr from "./Components/Template/output";
import { createStore } from 'redux';
import {Provider, useSelector} from "react-redux";
import PaginationControlled from "./Components/Pagination/Pagination";
import FilterWrapper from "./Components/Filter/Filter_Wrapper";
const initialState = {
    // new_shop_arr:arr,//new_shop_arr
    count: 0,// for counter
    quantity:0, // number of items in buscket
    display_arr : arr, // arr that is displayed in shop
    visibility_m: "hide", //visibility of menu
    basket_arr:[],
    type_f:-1, //filter by type
    visibility_b:false,
    page_num:1,
    refresh_s:false
};

function reducer(state=initialState,action) {
    switch(action.type) {
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
            console.log(action.payload);
            return {
                ...state,
                page_num: action.payload,
                refresh_s: !state.refresh_s

            };
        case "VISIBILITY":
            console.log("Visi")
            return {
              ...state,
              visibility_b: !state.visibility_b
            };
        case "FILTER_B":
            console.log(action.payload);
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

    let kek =[1,2,3];
    return (
    <div className="App">

        <Provider store={store}>

            <PaginationControlled/>

            <FilterWrapper/>

            <PaginationControlled/>

            <div className="container">


            </div>
            {/*<Wheel/>*/}
            {/*<PokeImg/>*/}
            {/*{new_arr}*/}
            {/*<TemplatesContainer/>*/}
        </Provider>
    </div>
  );
}


export default App;
