import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Filter from "./Filter";
import PropTypes from 'prop-types';
import Wheel from "../Wheel/Wheel";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";


const propTypes = {
    onChangePage: PropTypes.func.isRequired,
};


const FilterWrapper = props =>{

    const [show, toggleShow] = React.useState(false);
    // its like dipatch
    const dispatch = useDispatch();
    //Use Selector is like map state to props
    const page_num = useSelector(state => state.page_num);
    const refresh = useSelector(state => state.refresh_s);
    const filter_type = useSelector(state => state.type_f);
    // set(visibility);
    const arr=[1,2,3];
    return (
        <div style={{width:"100vw",height:"100vh"}}>


            {/*<Wheel/>*/}
            <IconButton color="primary" aria-label="add to shopping cart" onClick={() => toggleShow(!show)}>
                <FilterListIcon />
            </IconButton>
            {show && <Wheel/> }

            <Filter page_num={page_num} filter_type={filter_type} refresh_s={refresh}/>
        </div>
    )
};
export default FilterWrapper;
