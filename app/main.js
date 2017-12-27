import React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { RouterProvider } from 'react-router5'

import { Application, 
         store as layout  } from './layouts'
import createRouter from 'config/router'

import { api } from 'fronto-api'
import { Users, 
         Subscriptions, 
         Settings } from './stores'

useStrict(true)

const router = createRouter({ 
  listener: true, logger: true 
})

const endpoints = {
  studio: api({
    endpoint: '/',
    header: (h) => {
      const token = localStorage.getItem('token')
      if (token) {
        h.append('Authorization', `Bearer ${token}`)
      }
    }
  }),
}

const resources = {
  layout,
  endpoints,
  user: new Users(endpoints.studio),
  subscription: new Subscriptions(endpoints.studio),
  setting: new Settings(endpoints.studio)
}

const app =
  <RouterProvider router={router}>
    <Application {...resources} />
  </RouterProvider>


router.start(() => 
  render(app, document.getElementById('app'))
)
