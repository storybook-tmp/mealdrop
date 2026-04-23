import type { Meta, StoryObj } from '@storybook/react-vite'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: () => {},
    children: 'Sidebar content goes here',
  },
}

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Shopping cart',
    onClose: () => {},
    children: 'Cart items here',
    footer: <button>Checkout</button>,
  },
}
