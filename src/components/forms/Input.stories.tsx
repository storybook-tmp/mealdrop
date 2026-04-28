import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { Input } from './Input'

const meta = preview.meta({
  component: Input,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  args: {
    label: 'Email',
    id: 'email',
    placeholder: 'Enter your email',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible()
  },
})

export const WithError = meta.story({
  args: {
    label: 'Email',
    id: 'email-error',
    error: 'Email is required',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Email is required')).toBeVisible()
  },
})

export const Filled = meta.story({
  args: {
    label: 'Full name',
    id: 'name',
    placeholder: 'Enter your name',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Full name')
    await userEvent.type(input, 'John Doe')
    await expect(input).toHaveValue('John Doe')
  },
})
