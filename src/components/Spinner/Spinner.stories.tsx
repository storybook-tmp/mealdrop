import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './Spinner'

const meta = {
  title: 'AI Generated/Simple/Spinner',
  component: Spinner,
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

export const Default: Story = {}

export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '400px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
}
