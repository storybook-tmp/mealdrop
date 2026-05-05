import type { Meta, StoryObj } from '@storybook/react-vite';
import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {
  args: {
    title: 'Pizza',
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
  },
};

export const Rounded: Story = {
  args: {
    title: 'Sushi',
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    round: true,
  },
};
