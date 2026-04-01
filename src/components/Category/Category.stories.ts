import type { Meta, StoryObj } from '@storybook/react-vite';
import { Category } from './Category';

const meta = {
  title: 'AI Generated/Medium/Category',
  component: Category,
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rounded: Story = {
  args: {
    title: 'Pizza',
    photoUrl: 'https://via.placeholder.com/150',
    round: true,
  },
};

export const Squared: Story = {
  args: {
    title: 'Burgers',
    photoUrl: 'https://via.placeholder.com/300',
    round: false,
  },
};
