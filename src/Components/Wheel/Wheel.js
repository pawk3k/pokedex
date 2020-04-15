import React, {Component} from "react";
import { connect } from 'react-redux'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


class Wheel extends Component{
    state = {arr:[]};
    componentDidMount() {

        const sleep = ms => {
            return new Promise(resolve => setTimeout(resolve, ms))
        };

        const get_type = async (i) =>{
            fetch('https://pokeapi.co/api/v2/type/' + i)
                .then(response => response.json())
                .then(data=> {
                    const type_poke = data.name;
                    const new_arr = [...this.state.arr,type_poke];
                    this.setState({arr:new_arr});

                });
            return sleep(20).then(v => v);
        };
        const await_type = async () =>{
            for (let i = 1; i < 19; i++) {
                await get_type(i).catch(x=> console.log(x));

            }
        };
        await_type();
    };

    render() {
        let graphImage = null;

        return(
            <div>
                <Grid container spacing={2}>

                {this.state.arr.map((x,num)=>{

                    try{
                           graphImage = require('./res/' + x + '_ns.svg');
                    }catch (e) {
                        console.log("niema")
                    }

                    return(
                           <Grid key={num} item xs={6} lg={3}>
                               <Button style={{width:"100%",height:'100%'}}>
                                   <div key={num} className="container justify-content-center" style={{backgroundColor:"#ABC",padding:"4vh 4vh 4vh 4vh",borderRadius:"20px"}} onClick={()=>{
                                       this.props.dispatch({type:'FILTER_B',payload:x})

                                   }}>
                                       <div className="row justify-content-center ">
                                           <p key={x}>{x}</p>
                                       </div>
                                       <div className="row justify-content-center">
                                           <img src={graphImage} alt={x}/>

                                       </div>
                                   </div>

                               </Button>

                           </Grid>
                   );
                })}
                </Grid>
            </div>
        )
    }

}

export default connect()(Wheel);