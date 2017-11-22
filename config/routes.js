export default [
  { name: 'posts', path: '/posts', children: [
    { name: 'show', path: '/:post', children: [
      { name: 'subscribe', path: '/subscribe' }
    ]}
  ]},
  { name: 'channels', path: '/channels', forwardTo: 'posts', children: [
    { name: 'show', path: '/:channel' }
  ]},
  { name: 'users', path: '/users', children: [
    { name: 'sign_in', path: '/sign_in' },
    { name: 'forgot_password', path: '/forgot_password' },
    { name: 'registration', path: '/registration' }
  ]}
];
