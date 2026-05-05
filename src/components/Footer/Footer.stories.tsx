import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Footer } from './Footer'

const meta = {
  component: Footer,
  tags: ['ai-generated'],
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Footer />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/discover us/i)).toBeVisible()
    await expect(canvas.getByText(/home/i)).toBeVisible()
    await expect(canvas.getByText(/check our apps/i)).toBeVisible()
  },
}
