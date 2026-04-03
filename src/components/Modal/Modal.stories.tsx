import { fn } from 'storybook/test'

import preview from '../../../.storybook/preview'

import { Modal } from './Modal'

const modalContent = (
  <div style={{ padding: '2rem' }}>
    <h2 style={{ margin: 0 }}>Complete your order</h2>
    <p style={{ marginBottom: 0 }}>
      Double-check your items, confirm the total, and continue when you are ready.
    </p>
  </div>
)

const meta = preview.meta({
  title: 'AI Generated/Complex/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: modalContent,
    onClose: fn(),
  },
})

export const Open = meta.story({
  args: {
    isOpen: true,
  },
})

export const Closed = meta.story({
  args: {
    isOpen: false,
  },
})
