const fetch = require("node-fetch");
const fetchData = require('./fetchData');

test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data.length).toBe(20);
});