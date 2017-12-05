const readable = {
  find() { this.findBy() },
  findBy(parameters) {
    this.setIsLoading(true)
    this.clearSelected()
    this.call({ parameters, type: 'get' }, {
      200: (body) => this.setSelected(body.data)
    })
  },
  findAll(parameters) {
    this.setIsLoading(true)
    this.clearCollection()
    this.call({ parameters, type: 'get' }, {
      200: (body) => this.setCollection(body.data)
    })
  },
}

const writable = {
  update(parameters, body, callback) {
    this.setIsLoading(true)
    this.call({ parameters, body, type: 'patch' }, callback)
  },
  create(parameters, body, callback) { 
    this.setIsLoading(true)
    this.call({ parameters, body, type: 'post' }, callback)
  },
  delete(parameters) { 
    this.setIsLoading(true)
    this.call({ parameters, type: 'delete' }, {
      200: (body) => this.removeFromCollection(body.data)
    })
  }
}

const queryable = {
  findAll(parameters) {
    this.setIsLoading(true)
    this.clearCollection()
    this.call({ parameters, type: 'get', query: true }, {
      200: (body) => this.setCollection(body.data)
    })
  }
}

const paginatable = { 
  replaceCollection(changePage) {
    this.clearCollection()
    if (!changePage) {
      this.setCurrentPage(0)
      this.setTotalPages(1)
    }
  },

  paginate(body, replace = true) {
    if (replace) {
      this.setCollection(body.data)
      this.setCurrentPage(1)
    } else { 
      this.appendToCollection(body.data)
      this.setCurrentPage(this.currentPage + 1) 
    }

    if (body.meta.total_pages !== this.totalPages)
      this.setTotalPages(body.meta.total_pages)
  },

  findAll(parameters, options = { replace: true, changePage: false }) { 
    if (options.replace) this.replaceCollection(options.changePage)

    if (this.currentPage < this.totalPages) {
      this.setIsLoading(true)
      this.call({ parameters, type: 'get', query: true }, {
        200: (body) => this.paginate(body, options.replace)
      })
    }
  }
}

export default { readable, writable, queryable, paginatable }
