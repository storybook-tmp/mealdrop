import React from 'react'
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
    children: React.createElement('p', null, 'No items in cart yet.'),
  },
}

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Your Cart',
    onClose: () => {},
    children: React.createElement('p', null, 'Pizza Margherita x1'),
    footer: React.createElement(Button, null, 'Checkout'),
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Your Cart',
    onClose: () => {},
    children: React.createElement('p', null, 'No items in cart yet.'),
  },
}
