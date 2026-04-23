import type { Meta, StoryObj } from '@storybook/react-vite';
import { Category } from './Category';

const meta = {
  component: Category,
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Round: Story = {
  args: {
    title: 'Pizza',
    photoUrl:
      'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    round: true,
  },
};

export const Square: Story = {
  args: {
    title: 'Burgers',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  },
};

export const Sushi: Story = {
  args: {
    title: 'Sushi',
    photoUrl:
      'https://images.pexels.com/photos/9210/food-japanese-food-photography-sushi.jpg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    round: true,
  },
};
