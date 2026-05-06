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

export const WithValue: Story = {
  args: {
    label: 'Full name',
    id: 'name',
    value: 'John Doe',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Full name')).toHaveValue('John Doe')
  },
}

export const WithError: Story = {
  args: {
    label: 'Phone',
    id: 'phone',
    error: 'Phone number is required',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Phone number is required')).toBeVisible()
  },
}

export const FilledForm: Story = {
  args: {
    label: 'Email',
    id: 'email-fill',
    placeholder: 'Enter your email',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email')
    await userEvent.type(input, 'test@example.com')
    await expect(input).toHaveValue('test@example.com')
  },
}
