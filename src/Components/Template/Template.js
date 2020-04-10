import React, {Component, useEffect, useState} from "react";
import "./Template.css"
import {useDispatch, useSelector} from "react-redux";



class Template extends Component{
    new_arr = [];
    constructor() {
        super();
        this.state = {};
    }


    componentWillReceiveProps(props) {
        const { refresh, id } = this.props;
        if (props.refresh !== refresh) {
            fetch('https://pokeapi.co/api/v2/pokemon/' + props.id)
                .then(response => response.json())
                .then(data=> {
                    const foto = data.sprites.front_default;
                    const poke_name = data.name;
                    const types1 = data.types;
                    const poke_id = props.id;
                    this.new_arr =[];
                    this.new_arr.push(types1.map(x=>{
                            // console.log(x.type.name);
                            return(
                                <div className="col-6">
                                    <img src={require("../Wheel/res/" + x.type.name + "_ns.svg") }   alt = {x.type.name}/>
                                </div>
                            );
                        }
                    ));
                    this.setState({poke_foto: foto,poke_name:poke_name,types:this.new_arr,poke_id:poke_id});
                    this.new_arr = [];
                });
        }
    }


    componentDidMount() {

        const sleep = ms => {
            return new Promise(resolve => setTimeout(resolve, ms))
        };

        const get_foto = async (i) =>{
            fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                .then(response => response.json())
                .then(data=> {
                    const foto = data.sprites.front_default;
                    const poke_name = data.name;
                    const types1 = data.types;
                    const poke_id = i;
                    this.new_arr.push(types1.map(x=>{
                            // console.log(x.type.name);
                            return(
                                <div className="col-6">

                                  <img src={
                                      require("../Wheel/res/" + x.type.name + "_ns.svg") }   alt = {x.type.name}/>
                                    {/*{x.type.name}*/}

                                </div>
                            );
                        }
                    ));
                    this.setState({poke_foto: foto,poke_name:poke_name,types:this.new_arr,poke_id:poke_id});

                });
            this.new_arr =[];
            return sleep(20).then(v => v);
        };
        const id = this.state.id === undefined ? this.props.id : this.state.id;
        get_foto(this.props.id);
        // console.log(this.props.id);

    };

    render() {
        return(
                // <div>
                <div className="container justify-content-center">
                    <div className="row justify-content-center" style={{justyfiContent:"center"}}>

                        <div className="row">
                            <img src={this.state.poke_foto} key= {this.state.poke_id} alt={"kek"}/>


                        </div>
                    </div>

                    <div className="row">
                        {this.state.types}
                    </div>

                    <div className="row justify-content-center" style={{marginBottom:"2vh",opacity:"75%",backgroundColor:"white ",textDecorationColor:"black"}}>
                        <p style={{opacity:"1",color:"black",fontWeight:"bold"}}>{this.state.poke_name}</p>
                    </div>
                    {/*<p>{this.state.types}</p>*/}
                    {/*<button className={'btn btn-primary'}>+</button>*/}
                </div>

        )
    }

}

export default Template;