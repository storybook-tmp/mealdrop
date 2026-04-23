import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import { Input } from './Input'

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
  args: {
    id: 'delivery-address',
    label: 'delivery address',
    placeholder: '123 Main Street',
    onChange: fn(),
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithError: Story = {
  args: {
    defaultValue: '12',
    error: 'Please enter a complete address.',
  },
}
