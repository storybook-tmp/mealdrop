import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Burger Palace',
    specialty: 'Gourmet burgers and fries',
    photoUrl:
      'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
    rating: 4.5,
    categories: ['burgers', 'comfort-food'],
    isNew: false,
    isClosed: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Palace')).toBeVisible();
    await expect(canvas.getByText(/4\.5/)).toBeVisible();
  },
};

export const New: Story = {
  args: {
    ...Default.args,
    isNew: true,
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    isClosed: true,
  },
};

export const Loading: Story = {
  args: {
    name: '',
    specialty: '',
    photoUrl: '',
    isLoading: true,
  },
};
