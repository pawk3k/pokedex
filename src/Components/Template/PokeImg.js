import React,{useState,useEffect} from "react";
import "./Template.css"
import {useDispatch, useSelector} from "react-redux";
import Template from "./Template";
const  PokeImg = (props) =>{
    let img_src = [];
    let new_arr = [];
    const [my_s,Set] = useState([]);
    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };
    const new_arr2 = [];
    const my_func1 = async() => {
        for (let i = 1; i < 100; i++) {
            new_arr.push(


                <div className={i%2===0 ? "row" : ""}>
                    <Template id={i}/>
                    {/*<Template id={i}/>*/}
                    {/*<Template id={i}/>*/}
                </div>
            )
        }
        var i,j,temparray,chunk = 2;
        for (i=0,j=new_arr.length; i<j; i+=chunk) {
            temparray = new_arr.slice(i,i+chunk);
            new_arr2.push(
                <div key={i} className="row">
                    {
                        temparray.map( x =>{
                            return x;
                        } )
                    }
                </div>
            )
        }
        return sleep(15);
    };
    my_func1().catch(x => console.log(x));
    console.log(new_arr2);
    return (

        <div className="container" style={{alignItems:"center",alignSelf:"center"}}>
            {/*{new_arr}*/}
            {new_arr2}
        </div>
    )
};

export default PokeImg;