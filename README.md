#	Endpoint (class)

	* Endpoint (method = 'GET', url = '#', data = {}, headers = [], ...args)

#	loader (core fetch wrapper)

	* loader 
		* .get (options = {})
		* .post (options = {})
		* .put (options = {})
		* .do (options = {})
  
* sanitize
	- response parser (extracts the actual data from the server response)
  
* mime
   - utility object containing various mime types (more to come)

#	api (generic api caller)

	* call: (endpoint = null, data = {}, type = 'json')


#	sample usage
  	
	getResources(endpoint = { method: 'get', url: 'api/get/user/123', data: { x: 'y' } }) {
		return loader.do(endpoint).then(santize.json);
	}
