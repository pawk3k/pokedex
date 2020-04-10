import React,{Component} from "react";
import Template from "./Template";
import {useDispatch, useSelector} from "react-redux";

const  TemplatesContainer = (props) =>{
    const display_arr = useSelector(state => state.display_arr);

    const full = display_arr.map((x,index)=>
    {
        return (
            <div className="col">
                    <Template/>
            </div>

        );
    });
    let new_arr = [];
    var i,j,temparray,chunk = 3;
    for (i=0,j=full.length; i<j-4; i+=chunk) {
        temparray = full.slice(i,i+chunk);
        new_arr.push(
            <tr key={i}>
                {
                    temparray.map( x =>{
                        return x;
                    } )
                }
            </tr>
        )
    }

        return (
            <div>
                {new_arr};
            </div>
        )
};




export default TemplatesContainer;