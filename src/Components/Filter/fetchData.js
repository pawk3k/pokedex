const fetch = require("node-fetch");
function fetchData() {
    let inner_arr = [];
    return  fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0').then(response => response.json()).then(function(data) {
        // this.inner_arr = data.results;
        //
        //             this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
        //             let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
        //             let end_id = data.count/20;
        //             let first20 = this.props.display_arr.slice(start_id,end_id);
        //             this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
        let i = 0;
        const promises = {};
        data.results.map(x => { promises[i++] = fetch(x.url)});
        return data.results;
    }).then(async data => {
        await Promise.all(data.map((e, index, array) => {
            return fetch(e.url)
                .then(response => response.json())
                .then(data => {
                    array[index] = {...e, ...data};
                    // console.log("update");
                })
        }));
        // console.log("new", data);
        return data;
    }).then(x => x);
    //     .then(data => {
    //     // this.props.dispatch({type:"SET_DISPLAY_ARR",payload:this.inner_arr});
    //     // let start_id =   (this.props.page_num === 1 ) ? 1 : (this.props.page_num-1)*20;
    //     // let end_id = 9;
    //     // let first20 = this.props.display_arr.slice(start_id,end_id);
    //     // this.setState({...this.state,filtered_pokemons:first20,isLoading:false});
    // });
}
module.exports = fetchData;