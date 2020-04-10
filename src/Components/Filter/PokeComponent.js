import React, {Component, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Template from "../Template/Template";


class PokeComponent extends Component{
    new_arr = [];
    state = {filtered_pokemons:this.props.pokemons};

    componentDidMount() {
        this.setState(this.props.filtered_pokemons);
    }

    render() {
        return(
            <div>

                {this.props.filtered_pokemons.map(x=>{
                    return(

                        <div>
                            {x.poke_name}
                            <Template  id={x.poke_id}/>
                        </div>

                    )
                })}
                {/*<p>{this.state.types}</p>*/}
                {/*<button className={'btn btn-primary'}>+</button>*/}
            </div>

        )
    }

}

export default PokeComponent;