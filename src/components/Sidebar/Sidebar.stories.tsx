import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Button } from '../Button'
import { Body } from '../typography'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'AI Generated/Complex/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    isOpen: true,
    title: 'Your order',
    onClose: fn(),
  },
  render: (args) => (
    <Sidebar
      {...args}
      footer={
        <Button large onClick={fn()}>
          Continue
        </Button>
      }
    >
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Body>Cheeseburger x1</Body>
        <Body>Fries x2</Body>
        <Body>Vanilla ice cream x1</Body>
      </div>
    </Sidebar>
  ),
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {}

export const Closed: Story = {
  args: {
    isOpen: false,
  },
}
