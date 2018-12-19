import { Endpoint, loader, api, sanitize } from '../dist';



// create an endpoint
const endpoint = new Endpoint('get', 'https://reqres.in/api/users?page=2', null, { 'cache-control': 5000 }, { credentials:'omit' });
console.log(endpoint);

// call the root loader and sanitize the repsonse data
loader.do(endpoint).then(sanitize.json).then(data => console.log(data));

// you can also call the wrapper function for loader as a shorthand
//api.call(endpoint).then(data => console.log(data));