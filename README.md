#	Endpoint (class)

	* Endpoint (method = 'GET', url = '#', data = {}, headers = [], ...args)

#	loader (core fetch wrapper)

	* loader 
		* .get (options = {})
		* .post (options = {})
		* .put (options = {})
		* .do (options = {})

#	api (generic api caller)

	* call: (endpoint = null, type = 'json') 


#	sample usage
  	>> my-api-file.js
			getResources(endpoint = { method: 'get', url: 'api/get/user/123', data: { x: 'y' } }) {
				return loader.do(endpoint).then(santize.json);
			}