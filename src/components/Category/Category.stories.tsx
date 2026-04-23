import type { Meta, StoryObj } from '@storybook/react-vite'

import { Category } from './Category'

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Squared: Story = {
  args: {
    title: 'Italian',
    photoUrl: 'https://picsum.photos/300/300',
  },
}

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl: 'https://picsum.photos/300/300',
    round: true,
  },
}
