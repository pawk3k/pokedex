import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch, useSelector} from "react-redux";


export default function PaginationControlled() {
    const dispatch = useDispatch();

    const page_num = useSelector(state=>state.page_num);
    const page_count = useSelector(state=>state.page_count);
    const [,setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        const kek = () => dispatch({type:"PAGE",payload:value});
        kek();
    };

    return (
        <div>
            <Pagination count={page_count === 0? 10: page_count} page={page_num} onChange={handleChange}/>
        </div>
    );
}