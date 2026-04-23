import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

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
        <Body type="span" fontWeight="medium">
          Cheeseburger
        </Body>
        <Body>Nice grilled burger with cheese</Body>
      </div>
    ),
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFooter: Story = {
  args: {
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Body type="span">Total</Body>
        <Body type="span">$12.75</Body>
      </div>
    ),
  },
}
