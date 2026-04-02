import type { Meta, StoryObj } from '@storybook/react-vite'

import { Category } from './Category'

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Category>

export default meta
type Story = StoryObj<typeof meta>

export const Squared: Story = {
  args: {
    title: 'Pizza',
    photoUrl: 'https://placehold.co/300x300/E5F8BC/202020?text=Pizza',
  },
}

export const Rounded: Story = {
  args: {
    title: 'Burgers',
    photoUrl: 'https://placehold.co/200x200/B1DDE4/202020?text=Burgers',
    round: true,
  },
}
