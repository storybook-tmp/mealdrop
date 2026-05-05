import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Spinner } from './Spinner'

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg')
    await expect(svg).toBeInTheDocument()
    const text = canvasElement.querySelector('svg text')
    await expect(text?.textContent).toBe('Looking for some food...')
  },
}
