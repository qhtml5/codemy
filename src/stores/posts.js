import { action, extendObservable } from 'mobx' 
import { Connect } from 'fronto-connect'

export default class extends Connect { 
  namespace = 'v1'
  resource  = 'posts'

  constructor(api, namespace = null) {
    super(api, namespace)

    extendObservable(this, { 
      currentPage: 0,
      totalPages: 1
    })
  }

  @action setTotalPages = pages =>
    this.totalPages = pages

  @action setCurrentPage = (page) =>
    this.currentPage = page

  replaceCollection = () => {
    this.clearCollection()
    this.setCurrentPage(0)
    this.setTotalPages(1)
  }

  paginate = (body, replace = true) => {
    if (replace) {
      this.setCollection(body.data)
      this.setCurrentPage(1)
    } else { 
      this.appendToCollection(body.data)
      this.setCurrentPage(this.currentPage + 1) 
    }

    this.setTotalPages(body.meta.total_pages)
  }

  findAll(parameters, options = { replace: true }) { 
    if (options.replace) this.replaceCollection()

    if (this.currentPage < this.totalPages) {
      this.setIsLoading(true)
      this.call({ parameters, type: 'get', query: true }, {
        200: (body) => this.paginate(body, options.replace)
      })
    }
  }

  findBy(parameters) {
    this.setIsLoading(true)
    this.clearSelected()
    this.call({ parameters, type: 'get' }, {
      200: (body) => this.setSelected(body.data)
    })
  }
}
