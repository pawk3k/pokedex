import React, { Component } from "react";
import Template from "../Template/Template";
import { connect } from 'react-redux';
import "./styles.css"
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import fetchData from "./fetchData";
import fetchPage from "./fetchPage";

class Filter extends Component {
    state = {
        search:"",
        isLoading:false,
        pokemnos: [],
        filtered_pokemons:[],
        poke_templates:[],
        page_num:1,
        types:[],
        refresh_p:false,
        pages_count:0
    };
    inner_arr = [];





    async componentDidUpdate(prevProps) {

        const typeMatch =(value) => {
            let return_v = false;
            const types_m = value.types;
            for(let item of types_m) {
                if(item.type.name === this.props.filter_type){
                    return_v = true
                }
            }
            return return_v;
        };
        if(this.props.filter_type!==prevProps.filter_type){
            const  new_poke = this.state.pokemnos.filter(typeMatch);
            const first_page = new_poke.slice(0,20);
            this.props.dispatch({type:"PAGE",payload:1});
            this.props.dispatch({type:"SET_DISPLAY_ARR",payload:new_poke});
            this.setState({...this.state, page_num:1,filtered_pokemons:first_page,refresh_p:!this.state.refresh_p});

        }
        else if (this.props.page_num !== prevProps.page_num) {
            let {page_num} = this.props;
            // let tem_arr = this.state.pokemnos;
            let tem_arr = this.props.display_arr;
            let new_arr2 =[];

            let start_id =   (page_num === 1 ) ? 1 : (page_num-1)*20;
            let end_id = page_num*20;
            // new_arr2 = tem_arr.slice(start_id,end_id);

            const pagePokemons = await fetchData(20* page_num)
            this.inner_arr = pagePokemons;
            this.setState({...this.state, page_num:this.props.page_num,filtered_pokemons:new_arr2,refresh_p:!this.state.refresh_p});
        }

    }
    async componentDidMount() {
        this.setState({...this.state,isLoading:true});
        this.inner_arr  = [];
        let data = await fetchData(20);
        let page = await fetchPage();
        console.log(page.next);
        console.log();
        this.inner_arr = data;
        this.setState({...this.state,isLoading:false});
    };

    render() {
        return(
            <div className="container-fluid" style={{backgroundImage:require("../Wheel/res/normal_ns.svg"),objectFit:"cover",width:"100%",height:"100%",backgroundColor:"#D5EDD4"}}>



                    <Grid container spacing={2}>
                        {/* If data in process of fetching -> display spinner otherwise display pocemon page*/}
                        {!this.state.isLoading ?  this.inner_arr.map((x,id)=>{
                            return(
                                    <Grid key={id}  item xs={6} lg={4}>
                                        <Paper className={this.props.styles} style={{padding: "2vw",
                                            textAlign: "center",
                                            color: "#000000",
                                            whiteSpace: "nowrap",
                                            background: "#A0DB9E",
                                            marginTop: "2vh",
                                            marginBottom: "2vh"}}>
                                            <Link to={'/Pokemon/' + x.poke_id}>
                                                <Template  id={x.id} refresh={this.state.refresh_p}/>
                                            </Link>
                                        </Paper>
                                    </Grid>

                            )
                        }) :
                            <div className="container" style={{padding:"5vh 5vh 5vh 5vh"}}>
                                <CircularProgress/>
                            </div>
                        }

                    </Grid>
            </div>

        );
    }
}
export default  connect()(Filter);
