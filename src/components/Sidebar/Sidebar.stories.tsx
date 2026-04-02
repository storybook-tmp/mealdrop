import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Shopping Cart',
    onClose: () => {},
    children: <div>Cart items go here</div>,
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Shopping Cart',
    onClose: () => {},
    children: <div>Cart items go here</div>,
  },
}

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Filters',
    onClose: () => {},
    footer: <div style={{ padding: '1rem', borderTop: '1px solid #ccc' }}>Apply Filters</div>,
    children: (
      <div style={{ padding: '1rem' }}>
        <label>
          <input type="checkbox" /> Price: Low to High
        </label>
        <label>
          <input type="checkbox" /> Rating: High to Low
        </label>
      </div>
    ),
  },
}
