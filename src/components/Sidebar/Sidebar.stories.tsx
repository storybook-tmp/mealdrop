import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar } from './Sidebar'
import { Button } from '../Button'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Your Cart',
    onClose: () => {},
    children: (
      <div style={{ padding: '1rem' }}>
        <p>Burger x2</p>
        <p>Fries x1</p>
      </div>
    ),
    footer: <Button large>Proceed to checkout</Button>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Your Cart',
    onClose: () => {},
    children: (
      <div style={{ padding: '1rem' }}>
        <p>Burger x2</p>
      </div>
    ),
  },
}
