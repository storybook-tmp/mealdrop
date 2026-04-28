import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Badge } from './Badge'

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'pizza',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/pizza/i)).toBeVisible()
  },
}

export const LongText: Story = {
  args: {
    text: 'comfort food',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/comfort food/i)).toBeVisible()
  },
}

export const MultipleCategories: Story = {
  args: {
    text: 'sushi',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Badge text="sushi" />
      <Badge text="asian" />
      <Badge text="burgers" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/sushi/i)).toBeVisible()
    await expect(canvas.getByText(/asian/i)).toBeVisible()
    await expect(canvas.getByText(/burgers/i)).toBeVisible()
  },
}
