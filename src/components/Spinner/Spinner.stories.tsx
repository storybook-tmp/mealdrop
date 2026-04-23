import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './Spinner'

const meta = {
  title: 'AI Generated/Simple/Spinner',
  component: Spinner,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '18rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ minHeight: '18rem', background: '#202020' }}>
        <Story />
      </div>
    ),
  ],
}
