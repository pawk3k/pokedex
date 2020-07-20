const fetch = require("node-fetch");
async function fetchData() {
    let inner_arr = [];
    return  fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0').then(response => response.json()).then(function(data) {
        let i = 0;
        return data.results;
    }).then(async data => {
        await Promise.all(data.map((e, index, array) => {
            return fetch(e.url)
                .then(response => response.json())
                .then(data => {
                    array[index] = {...e, ...data};
                })
        }));
        return data;
    }).then(x => x);
}
module.exports = fetchData;