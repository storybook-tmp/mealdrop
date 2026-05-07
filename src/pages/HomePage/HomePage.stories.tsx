import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { HomePage } from './HomePage'

const meta = {
  component: HomePage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    app: {
      route: '/',
    },
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /hungry.*find your next meal/i })).toBeVisible()
    await expect(await canvas.findByRole('heading', { name: /burger kingdom/i })).toBeVisible()
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible()
  },
}
