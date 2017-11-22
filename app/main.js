import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { RouterProvider } from 'react-router5'

import Application from './layouts/application'
import createRouter from 'config/router'

import { api } from 'fronto-api'
import * as setting from './setting'
import * as stores from './stores'

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
  setting,
  endpoints,
  user: new stores.Users(endpoints.studio),
}

const app = 
  <RouterProvider router={router}>
    <Application {...resources} />
  </RouterProvider>


router.start(() => 
  render(app, document.getElementById('app'))
)
