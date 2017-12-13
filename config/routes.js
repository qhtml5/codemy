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
  { name: 'settings', path: '/settings', forwardTo: 'settings.profile', children: [
    { name: 'profile', path: '/profile' },
    { name: 'subscription', path: '/subscription' },
    { name: 'cards', path: '/cards' },
    { name: 'password', path: '/password' }
  ]},
  { name: 'users', path: '/users', children: [
    { name: 'sign_in', path: '/sign_in' },
    { name: 'forgot_password', path: '/forgot_password' },
    { name: 'reset_password', path: '/reset_password/:token' },
    { name: 'confirm', path: '/confirm/:token' },
    { name: 'registration', path: '/registration' }
  ]}
];
