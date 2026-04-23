import type { Meta, StoryObj } from '@storybook/react-vite'

import { Sidebar } from './Sidebar'
import { Body } from '../typography'
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
    title: 'Your order',
    onClose: () => {},
    children: (
      <div style={{ padding: '1rem' }}>
        <Body>Sidebar content goes here.</Body>
      </div>
    ),
    footer: (
      <Button large>Checkout</Button>
    ),
  },
}

export const WithoutFooter: Story = {
  args: {
    isOpen: true,
    title: 'Menu',
    onClose: () => {},
    children: (
      <div style={{ padding: '1rem' }}>
        <Body>Navigation items would go here.</Body>
      </div>
    ),
  },
}
