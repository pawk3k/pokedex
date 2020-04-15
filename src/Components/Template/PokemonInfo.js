import React, { useEffect, useState} from "react";
import "./Template.css"
import Button from "@material-ui/core/Button";
import {
    Link,
    useParams
} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
const PokemonInfo = () =>{
    let { id } = useParams();
    const [show, toggleShow] = React.useState(false);
    const [userID, ] = React.useState(0);
    let types_arr = [];
    let ability_arr = [];
    let stat_arr = [];
    let moves_arr = [];
    let [pokeInfo,set] = useState({pokeFoto:null,poke_name:"",types:[],abilities:[],stats:[],moves:[]});
    let poke_name;
    let types1;
    let poke_abilities;
    let poke_stats ;
    let poke_moves;
    useEffect(() =>{
            const sleep = ms => {
                return new Promise(resolve => setTimeout(resolve, ms))
            };
            const get_foto = (i) =>{
                fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                    .then(response => response.json())
                    .then(data=> {
                         const foto = data.sprites.front_default;
                         poke_name = data.name;
                         types1 = data.types;
                         poke_abilities = data.abilities;
                         poke_stats = data.stats;
                         poke_moves = data.moves;
                         const poke_items  = data.held_items;
                        types_arr.push(types1.map(x=>{
                                return(
                                    <div className="col-6">
                                        <img src={
                                            require("../Wheel/res/" + x.type.name + "_ns.svg") }   alt = {x.type.name}/>
                                    </div>
                                );
                            }
                        ));
                        ability_arr.push(poke_abilities.map(x=>{
                                // console.log(x.type.name);
                                return(
                                    <div style={{padding:"0vh 4vh", color:"#fca"}}>
                                        {x.ability.name}
                                    </div>
                                );
                            }
                        ));
                        stat_arr.push(poke_stats.map(x=>{
                                // console.log(x.type.name);
                                return(
                                    <div className="box flex-row justify-content-end">
                                        <div style={{backgroundColor:"#ABC"}}>{x.stat.name + ": "}</div>
                                        <div style={{backgroundColor:"#CBA"}}>{x.base_stat}</div>
                                    </div>
                                );
                            }
                        ));

                        moves_arr.push(poke_moves.map((x,id)=>{
                                return(
                                    <div className="row" style={{backgroundColor: id%2===0 ? "#CBA" : "#CBE"}}>
                                        {x.move.name}
                                    </div>
                                );
                            }
                        ));
                        set({poke_foto: foto,poke_name:poke_name,types:types_arr,abilities:ability_arr,stats:stat_arr,moves:moves_arr});
                        return poke_items;
                    });

                return sleep(1000).then(v => v);

            };
            get_foto(id);

    },[userID]);



    return(


            <div className="jumbotron vertical-center">
                <div className="d-flex" style={{alingItems:"flex-start",position:"sticky",top:"10px",zIndex:"1"}}>
                    <div style={{position:"sticky",top:"10px",zIndex:"1"}}>
                        <Link to={"/"}><IconButton color="primary" aria-label="add to shopping cart">
                            <ArrowBackIosRoundedIcon />
                        </IconButton></Link>

                    </div>

                <div className="container" style={{backgroundColor:"#999",alignItems:"center",justifyContent:"flex-end"}}>
                    <div style={{color:"black",backgroundColor:"#CBA",opacity:"60",margin:"2vh 2vh 2vh 2vh"}}>{pokeInfo.poke_name}</div>
                    <div className="row justify-content-center" style={{justyfiContent:"center"}}>
                        {/**/}
                        <div  style={{padding:"4vh 4vh 4vh 4vh",alignSelf:"center"}}>
                            <img src={pokeInfo.poke_foto} key= {id}  alt={"kek"}/>
                        </div>
                        <div className="box flex-column justify-content-between align-items-between">
                            {pokeInfo.stats}
                        </div>
                    </div>


                    <div className="d-flex justify-content-between flex-column">
                        <div className="d-flex flex-row">
                            Types:
                            {pokeInfo.types}
                        </div>
                        <div className="d-flex flex-row">
                                Abilities:{pokeInfo.abilities}
                        </div>
                    </div>

                    <Button onClick={()=>toggleShow(!show)} style={{backgroundColor:"#ABC" ,width:"100%"}}>
                        Moves:
                    </Button>
                    {
                        show && (           <div className="container" style={{backgroundColor:"#CBA"}}>
                            {pokeInfo.moves}
                        </div>)
                    }

                </div>
            </div>
        </div>

        )
    };


export default PokemonInfo;