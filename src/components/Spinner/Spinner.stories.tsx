import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './Spinner'

const meta = {
  component: Spinner,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <div style={{ height: 200, position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
