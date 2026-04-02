import type { Meta, StoryObj } from '@storybook/react-vite';

import { Category } from './Category';

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
  args: {
    title: 'Sushi',
    photoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  },
} satisfies Meta<typeof Category>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SquareCard: Story = {};

export const RoundCard: Story = {
  args: {
    round: true,
    title: 'Dessert',
    photoUrl:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
  },
};
