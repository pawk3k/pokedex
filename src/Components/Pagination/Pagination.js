import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Filter from "../Filter/Filter";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationControlled() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        const kek = () => dispatch({type:"PAGE",payload:value});
        kek();
    };

    return (
        <div className="container">
            <Pagination count={10} page={page} onChange={handleChange}/>

        </div>
    );
}