import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { Body } from '../typography'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: () => undefined,
    footer: <Button large>Checkout</Button>,
  },
  render: (args) => (
    <Sidebar {...args}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Body fontWeight="medium">Spicy tuna roll</Body>
        <Body>2 items in your basket and one promo applied.</Body>
      </div>
    </Sidebar>
  ),
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const OpenWithFooter: Story = {}

export const OpenWithoutFooter: Story = {
  args: {
    footer: undefined,
    title: 'Menu',
  },
}
