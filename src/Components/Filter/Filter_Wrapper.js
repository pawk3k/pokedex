import React from 'react';
import { useSelector} from "react-redux";
import Filter from "./Filter";
import Wheel from "../Wheel/Wheel";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import PaginationControlled from "../Pagination/Pagination";

const FilterWrapper = props =>{

    const [show, toggleShow] = React.useState(false);
    const page_num = useSelector(state => state.page_num);
    const refresh = useSelector(state => state.refresh_s);
    const filter_type = useSelector(state => state.type_f);
    const full_arr = useSelector(state => state.full_arr);
    const display_arr = useSelector(state => state.display_arr);
    return (
        <div key={1} style={{width:"100vw",height:"100vh",backgroundColor:"#D5EDD4"}}>

            <div className="container">
                <PaginationControlled/>

            </div>
            <div className="container">
                <div className="col">Filter</div>
                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => toggleShow(!show)}>
                    <FilterListIcon />
                </IconButton>
            </div>

            {show && <Wheel/> }
            {<Filter full_arr={full_arr} key={1} page_num={page_num} filter_type={filter_type} refresh_s={refresh} display_arr={display_arr}/> }
        </div>
    )
};
export default FilterWrapper;
