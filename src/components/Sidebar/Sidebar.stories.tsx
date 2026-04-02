import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from '../Button'
import { Body } from '../typography'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: fn(),
    children: (
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Body>Crunchy salmon roll</Body>
        <Body>Spicy tuna hand roll</Body>
      </div>
    ),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const WithFooter: Story = {
  args: {
    footer: (
      <Button large onClick={fn()}>
        Continue to checkout
      </Button>
    ),
  },
}
