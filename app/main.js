import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { useStrict } from 'mobx'
import { RouterProvider } from 'react-router5'

import { Application, 
         store as layout  } from './layouts'
import createRouter from 'config/router'

import { api } from 'fronto-api'
import * as stores from './stores'

useStrict(true)

const router = createRouter({ listener: true, logger: true })

const endpoints = {
  studio: api({
    endpoint: '/',
    header: (h) => {
      const token = localStorage.getItem('token');
      h.append('Authorization', `Bearer ${token}`);
    }
  }),
}

const resources = {
  layout,
  endpoints,
  user: new stores.Users(endpoints.studio),
  subscription: new stores.Subscriptions(endpoints.studio)
}

const app =
  <RouterProvider router={router}>
    <Application {...resources} />
  </RouterProvider>


router.start(() => 
  render(app, document.getElementById('app'))
)
