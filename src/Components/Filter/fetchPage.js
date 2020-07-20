const fetch = require("node-fetch")
const fetchPage = async () =>{
    return  fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0').then(resp => resp.json());
}
module.exports = fetchPage;