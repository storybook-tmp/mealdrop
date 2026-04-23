import type { Meta, StoryObj } from '@storybook/react';
import { Category } from './Category';

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImageUrl = 'https://via.placeholder.com/300x300?text=Pizza';

export const Squared: Story = {
  args: {
    title: 'Pizza',
    photoUrl: sampleImageUrl,
    round: false,
  },
};

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl: sampleImageUrl,
    round: true,
  },
};
