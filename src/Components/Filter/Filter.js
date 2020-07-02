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
// function fetchData() {
//     let inner_arr = [];
//     fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0').then(response => response.json()).then(function(data) {
//         // this.inner_arr = data.results;
//         //
//         //             this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
//         //             let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
//         //             let end_id = data.count/20;
//         //             let first20 = this.props.display_arr.slice(start_id,end_id);
//         //             this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
//         let i = 0;
//         const promises = {};
//         data.results.map(x => { promises[i++] = fetch(x.url)});
//         return data.results;
//     }).then(async data => {
//         await Promise.all(data.map((e, index, array) => {
//             return fetch(e.url)
//                 .then(response => response.json())
//                 .then(data => {
//                     array[index] = {...e, ...data};
//                     console.log("update");
//                 })
//         }));
//         console.log("new", data);
//         return data;
//     }).then(data => {
//         inner_arr =data;
//         // this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
//         // let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
//         // let end_id = 9;
//         // let first20 = this.props.display_arr.slice(start_id,end_id);
//         // this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
//
//     });
// }
// module.exports = fetchData;

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


    // fetchData() {
    //     fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0').then(response => response.json()).then(function(data) {
    //         // this.inner_arr = data.results;
    //         //
    //         //             this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
    //         //             let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
    //         //             let end_id = data.count/20;
    //         //             let first20 = this.props.display_arr.slice(start_id,end_id);
    //         //             this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
    //         let i = 0;
    //         const promises = {};
    //         data.results.map(x => { promises[i++] = fetch(x.url)});
    //         return data.results;
    //     }).then(async data => {
    //         await Promise.all(data.map((e, index, array) => {
    //             return fetch(e.url)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     array[index] = {...e, ...data};
    //                     console.log("update");
    //                 })
    //         }));
    //         console.log("new", data);
    //         return data;
    //     }).then(data => {
    //         this.inner_arr =data;
    //         // this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
    //         // let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
    //         // let end_id = 9;
    //         // let first20 = this.props.display_arr.slice(start_id,end_id);
    //         // this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
    //
    //     });
    // };


    componentDidUpdate(prevProps) {

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
            new_arr2 = tem_arr.slice(start_id,end_id);

            this.setState({...this.state, page_num:this.props.page_num,filtered_pokemons:new_arr2,refresh_p:!this.state.refresh_p});
        }

    }
    componentDidMount() {
        this.setState({...this.state,isLoading:true});

        this.inner_arr  = [];
        console.log(fetchData());
        // let promises=[];
        //
        // const get_name =  (i) =>{
        //
        //   promises.push(fetch('https://pokeapi.co/api/v2/pokemon/' + i)
        //         .then(response => response.json())
        //         .then(data=> {
        //             const poke_name = data.name;
        //             const poke_id = data.id;
        //             const types = data.types;
        //             this.inner_arr.push({types:types,poke_name:poke_name,poke_id:poke_id});
        //             this.setState({...this.state, pokemnos:this.inner_arr});
        //
        //         }));
        // };
        // const await_name = async (num) =>{
        //     for (let i = 1; i < num; i++) {
        //         get_name(i);
        //     }
        // };
        //
        // if(this.props.display_arr.length>0){
        //     let first20 = this.props.display_arr.slice(0,20);
        //     this.setState({...this.state,filtered_pokemons:first20,pokemnos:this.props.display_arr});
        // }else {
        //    await_name(100).catch(x=>console.log(x));
        //
        //    //Waits for all pokemon names and types and ids to be fetched
        //     Promise.all(promises).then(x =>
        //         {
        //             this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
        //             let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
        //             let end_id = this.props.page_num*20;
        //             let first20 = this.props.display_arr.slice(start_id,end_id);
        //             this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
        //         }
        //
        //     );
        // }


        this.inner_arr =[];

    };

    render() {
        return(
            <div className="container-fluid" style={{backgroundImage:require("../Wheel/res/normal_ns.svg"),objectFit:"cover",width:"100%",height:"100%",backgroundColor:"#D5EDD4"}}>

                {/* Text Field which filters state arr to match the input data */}
                <TextField  defaultValue={this.state.search} id="outlined-basic" label="Search" variant="outlined" onChange={(e) =>
                {
                    const  new_poke = this.state.pokemnos.filter(x=>
                        x.poke_name.toLowerCase().startsWith(e.target.value)
                    );
                    this.props.dispatch({type:"SET_DISPLAY_ARR",payload:new_poke});

                    const new_poke2 = new_poke.slice(0,20);
                    this.setState({...this.state, search: e.target.value,filtered_pokemons:new_poke2,refresh_p:!this.state.refresh_p});
                    this.props.dispatch({type:"PAGE",payload:1});
                }}/>


                    <Grid container spacing={2}>
                        {/* If data in process of fetching -> display spinner otherwise display pocemon page*/}
                        {!this.state.isLoading ?  this.inner_arr.map((x,id)=>{
                            return(
                                    <Grid key={id}  item xs={6} lg={4}>
                                        <Paper className={this.props.styles} style={{        padding: "2vw",
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
