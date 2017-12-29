import { Connect }  from 'fronto-connect'

class Store extends Connect { 
  namespace = 'v1'
  resource = 'posts'

  findAll(parameters) { 
    this.setIsLoading(true)
    this.call({ parameters, type: 'get', query: true }, {
      200: (body) => this.setCollection(body.data)
    })
  }
}

export default Store