export default [
  { name: 'posts', path: '/posts', children: [
    { name: 'show', path: '/:postId' },
    { name: 'search', path: '/search/:keyword' }
  ]},
  { name: 'channels', path: '/channels', forwardTo: 'posts', children: [
    { name: 'show', path: '/:channelId', children: [
      { name: 'search', path: '/search/:keyword' }
    ]},
  ]},
  { name: 'users', path: '/users', children: [
    { name: 'sign_in', path: '/sign_in' },
    { name: 'forgot_password', path: '/forgot_password' },
    { name: 'registration', path: '/registration' }
  ]}
];
