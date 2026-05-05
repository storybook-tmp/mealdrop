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
    placeholder: 'Enter your email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText(/email/i)).toBeVisible()
  },
}

export const WithValue: Story = {
  args: {
    label: 'Full name',
    value: 'John Doe',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByDisplayValue('John Doe')).toBeVisible()
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/please enter a valid email/i)).toBeVisible()
  },
}

export const TypeInteraction: Story = {
  args: {
    label: 'City',
    placeholder: 'Enter your city',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText(/city/i)
    await userEvent.type(input, 'New York')
    await expect(input).toHaveValue('New York')
  },
}
