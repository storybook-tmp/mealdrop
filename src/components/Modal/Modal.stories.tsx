import { config } from '../../../.storybook/preview'

import { Modal } from './Modal'

const meta = config.meta({
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  args: {
    isOpen: true,
    onClose: () => {},
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Limited time offer</h2>
        <p>Add a dessert to unlock free delivery on this order.</p>
      </div>
    ),
  },
})

export const Open = meta.story()

export const Closed = meta.story({
  args: {
    isOpen: false,
  },
})
