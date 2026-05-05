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
    placeholder: 'Enter your email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible()
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email-error',
    error: 'Please enter a valid email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Please enter a valid email')).toBeVisible()
  },
}

export const WithValue: Story = {
  args: {
    label: 'First name',
    id: 'first-name',
    defaultValue: 'John',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('First name')
    await expect(input).toHaveValue('John')
    await userEvent.clear(input)
    await userEvent.type(input, 'Jane')
    await expect(input).toHaveValue('Jane')
  },
}
