import { Switch, Route } from 'react-router-dom';

import React from "react";
import PokemonInfo from "../Template/PokemonInfo";
import FilterWrapper from "../Filter/Filter_Wrapper";
const Main = () => {
    return (
        <Switch>
            <Route exact path='/Pokemon/:id' component={PokemonInfo}/>
            <Route exact path='/' component={FilterWrapper}/>
        </Switch>
    );
};

export default Main;