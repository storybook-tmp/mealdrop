import type { Meta, StoryObj } from '@storybook/react-vite';
import { Category } from './Category';

const meta = {
  component: Category,
  tags: ['ai-generated'],
  args: {
    title: 'Burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
  },
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Squared: Story = {};

export const Rounded: Story = {
  args: { round: true },
};
