import React from 'react'

import { Cancellation } from 'components/subscription'
import Upgrade from 'components/upgrade'

import t from './locale'

export default {
  inactive: {
    button: 'button.success',
    action: t('subscribe'),
    content: modal => <Upgrade modal={modal} />,
  },
  active: {
    button: 'button.danger',
    action: t('cancel'),
    content: modal => <Cancellation modal={modal} />,
  },
}
