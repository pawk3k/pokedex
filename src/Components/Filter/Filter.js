import React, { Component } from "react";
import Template from "../Template/Template";
import { connect } from 'react-redux';
import arr from "../Template/output";
import "./styles.css"
import Grid from "@material-ui/core/Grid";
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputField from "./InputField";
import TextField from "@material-ui/core/TextField";
const styles = theme => ({
    paper: {
        padding: "2vw",
        textAlign: "center",
        color: "#000000",
        whiteSpace: "nowrap",
        background: "#A0DB9E",
        marginTop: "2vh",
        marginBottom: "2vh"
    }
});

// const styles = {
//     paper: {
//         padding: "2vw",
//         textAlign: "center",
//         color: "#000000",
//         whiteSpace: "nowrap",
//         background: "#A0DB9E",
//         marginTop: "2vh",
//         marginBottom: "2vh"
//     }
// };

class Filter extends Component {
    state = {
        search:"",
        pokemnos: [],
        filtered_pokemons:[],
        poke_templates:[],
        page_num:1,
        types:[],
        refresh_p:false
    };
    new_arr = [];
    backpace = 0;
    //


    componentDidUpdate(prevProps) {

        const isBigEnough =(value) => {
            let return_v = false;
            // if(value.poke_id <10){
            //     return_v = true;
            // }
            const types_m = value.types;
            for(let item of types_m) {
                console.log(item.type.name + " " + this.props.filter_type);

                if(item.type.name === this.props.filter_type){
                    return_v = true
                }
            }
            return return_v;
        };

        //Typical usage, don't forget to compare the props
        if(this.props.filter_type!==prevProps.filter_type){
            let tem_arr = this.state.pokemnos;
            console.log(this.state.pokemnos);
            const  new_poke = this.state.pokemnos.filter(isBigEnough);
            this.setState({...this.state, page_num:this.props.page_num,filtered_pokemons:new_poke,refresh_p:!this.state.refresh_p});


        }
        if (this.props.page_num !== prevProps.page_num) {
            let {page_num} = this.props;
            let tem_arr = this.state.pokemnos;
            let new_arr2 =[];

            let start_id =   (page_num === 1 ) ? 1 : (page_num-1)*12;
            let end_id = page_num*12;
            new_arr2 = tem_arr.slice(start_id,end_id);

            this.setState({...this.state, page_num:this.props.page_num,filtered_pokemons:new_arr2,refresh_p:!this.state.refresh_p});
            console.log(this.props.page_num);
        }

    }


    componentDidMount() {

        const sleep = ms => {
            return new Promise(resolve => setTimeout(resolve, ms))
        };
        this.new_arr  = [];
        this.filterd_arr= [];

        const get_name = async (i) =>{
            fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                .then(response => response.json())
                .then(data=> {
                    const poke_name = data.name;
                    const poke_id = data.id;
                    const types = data.types;
                    this.new_arr.push({types:types,poke_name:poke_name,poke_id:poke_id,poke_ele:<Template id={poke_id}/>});
                    this.setState({...this.state, pokemnos:this.new_arr});

                });
            return sleep(20).then(v => v);
        };
        const get_name2 = async (i) =>{
            fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                .then(response => response.json())
                .then(data=> {
                    const poke_name = data.name;
                    const poke_id = data.id;
                    this.filterd_arr.push({poke_name:poke_name,poke_id:poke_id,poke_ele:<Template id={poke_id}/>});
                    this.setState({...this.state,filtered_pokemons:this.filterd_arr});

                });
            return sleep(20).then(v => v);
        };


        const await_name = async (num) =>{
            const pnm = this.state.page_num;
            for (let i = 1; i < num; i++) {
                await get_name(i).catch(x=> console.log(x));
            }

        };
        const await_name2 = async (num) =>{
            const pnm = this.state.page_num;
            for (let i = 1; i < num; i++) {
                await get_name2(i).catch(x=> console.log(x));
            }

        };

        await_name2(12).catch(x=>console.log());

        await_name(120).catch(x=>console.log(x));
        //
        this.new_arr =[];

    };
    onchange = e => {
            const  new_poke = this.state.pokemnos.filter(x=>
                x.poke_name.startsWith(e.target.value)
            );
            this.setState({...this.state, search: e.target.value,filtered_pokemons:new_poke,refresh_p:!this.state.refresh_p});
        // console.log(e.target.value);
        // this.forceUpdate()
    };

    render() {
        return(
            <div className="container-fluid">

                {/*<input label="kek" onChange={this.onchange}/>*/}
                <TextField  defaultValue={this.state.search} id="outlined-basic" label="Search" variant="outlined" onChange={(e) =>
                {
                    const  new_poke = this.state.pokemnos.filter(x=>
                        x.poke_name.startsWith(e.target.value)
                    );
                    this.setState({...this.state, search: e.target.value,filtered_pokemons:new_poke,refresh_p:!this.state.refresh_p});
                }}/>

                {/*<InputField handleChange={(event,data) => this.onchange(event,data)}/>*/}

                    <Grid container spacing={2}>
                        {this.state.filtered_pokemons.map(x=>{
                            const kek = 0;
                            return(
                                // <div className="col">
                                    <Grid item xs={3}>
                                        <Paper className={this.props.styles} style={{        padding: "2vw",
                                            textAlign: "center",
                                            color: "#000000",
                                            whiteSpace: "nowrap",
                                            background: "#A0DB9E",
                                            marginTop: "2vh",
                                            marginBottom: "2vh"}}>
                                            <Template  id={x.poke_id} refresh={this.state.refresh_p}/>
                                        </Paper>
                                    </Grid>
                                // </div>

                            )
                        })}

                    </Grid>


                {/*{this.state.poke_templates.map(x=>x)}*/}
            </div>

        );
    }
}

export default  Filter;
// export default withStyles(styles)(Filter);
//
// export default Filter;
