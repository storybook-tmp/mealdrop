import type { Meta, StoryObj } from '@storybook/react-vite'

import { Footer } from './Footer'

const meta = {
  title: 'AI Generated/Complex/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', marginLeft: '-1rem' }}>
        <Story />
      </div>
    ),
  ],
}
