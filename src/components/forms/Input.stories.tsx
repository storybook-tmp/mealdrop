import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Email',
    id: 'email',
    placeholder: 'you@example.com',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email')
    await userEvent.type(input, 'test@test.com')
    await expect(input).toHaveValue('test@test.com')
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email-error',
    value: 'bad',
    error: 'Please enter a valid email',
  },
}
