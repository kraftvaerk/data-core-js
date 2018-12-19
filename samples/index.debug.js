import { Endpoint, loader, api, sanitize } from '../src';



const endpoint = new Endpoint('get', 'https://reqres.in/api/users?page=2', null, { credentials:'omit' }, { headers: [{ 'Content-type': 'no-cache' }] });
console.log(endpoint);
api.call(endpoint).then(data => console.log(data));
loader.do(endpoint).then(sanitize.json).then(data => console.log(data));