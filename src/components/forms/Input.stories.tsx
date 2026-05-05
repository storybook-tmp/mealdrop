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
    label: 'First name',
    id: 'firstName',
    placeholder: 'John',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('First name')).toBeVisible()
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    id: 'email',
    error: 'Please enter a valid email',
    defaultValue: 'invalid',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Please enter a valid email')).toBeVisible()
  },
}

export const WithValue: Story = {
  args: {
    label: 'Phone',
    id: 'phone',
    type: 'tel',
    defaultValue: '+31 612345678',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Phone')
    await expect(input).toBeVisible()
    await userEvent.clear(input)
    await userEvent.type(input, '+31 687654321')
    await expect(input).toHaveValue('+31 687654321')
  },
}
