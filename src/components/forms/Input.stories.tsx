import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'

const meta = {
  title: 'AI Generated/Medium/Input',
  component: Input,
  args: {
    id: 'email',
    label: 'Email address',
    placeholder: 'name@example.com',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '24rem', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address.',
    defaultValue: 'not-an-email',
  },
}
