import React, {Component} from "react";
import "./Template.css"

class Template extends Component{
    types_arr = [];
    constructor() {
        super();
        this.state = {};
    }


    componentWillReceiveProps(props) {
        const { refresh} = this.props;
        if (props.refresh !== refresh) {
            fetch('https://pokeapi.co/api/v2/pokemon/' + props.id)
                .then(response => response.json())
                .then(data=> {
                    const foto = data.sprites.front_default;
                    const poke_name = data.name;
                    const types1 = data.types;
                    const poke_id = props.id;
                    this.types_arr =[];
                    this.types_arr.push(types1.map((x,id)=>{
                            return(
                                <div  key={id} className="col-6">
                                    <img src={require("../Wheel/res/" + x.type.name + "_ns.svg") }   alt = {x.type.name}/>
                                </div>
                            );
                        }
                    ));
                    this.setState({poke_foto: foto,poke_name:poke_name,types:this.types_arr,poke_id:poke_id});
                    this.types_arr = [];
                });
        }
    }


    componentDidMount() {

        const get_foto = async (i) =>{
            fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                .then(response => response.json())
                .then(data=> {
                    const foto = data.sprites.front_default;
                    const poke_name = data.name;
                    const types1 = data.types;
                    const poke_id = i;
                    this.types_arr.push(types1.map((x,id)=>{
                            return(
                                <div className="col-6" key={id}>

                                  <img src={
                                      require("../Wheel/res/" + x.type.name + "_ns.svg") }   alt = {x.type.name}/>

                                </div>
                            );
                        }
                    ));
                    this.setState({poke_foto: foto,poke_name:poke_name,types:this.types_arr,poke_id:poke_id});

                });
            this.types_arr =[];
        };
        get_foto(this.props.id).catch(x=>console.log(x));
    };

    render() {
        return(
                // <div>
                <div className="container justify-content-center">
                    <div className="row justify-content-center" style={{justyfiContent:"center"}}>

                        <div className="row">
                            <img src={this.state.poke_foto} key= {this.state.poke_id} alt={this.state.poke_name + " not available"}/>


                        </div>
                    </div>

                    <div className="row">
                        {this.state.types}
                    </div>

                    <div className="row justify-content-center" style={{marginBottom:"2vh",backgroundColor:"#D5EDD4",textDecorationColor:"black"}}>
                        <p style={{opacity:"1",color:"black",fontWeight:"bold",textTransform:"capitalize"}}>{this.state.poke_name}</p>
                    </div>
                </div>

        )
    }

}

export default Template;