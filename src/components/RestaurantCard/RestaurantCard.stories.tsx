import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  name: 'Burger Palace',
  specialty: 'Juicy burgers and crispy fries',
  photoUrl:
    'https://images.pexels.com/photos/2233351/pexels-photo-2233351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=550',
  rating: 4.5,
  categories: ['burgers', 'comfort-food'],
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvas }) => {
    // Verify the rating text is rendered with the correct review logic
    await expect(canvas.getByText(/★ 4\.5 Very good/)).toBeVisible();
  },
};

export const New: Story = {
  args: { ...baseArgs, isNew: true },
};

export const Closed: Story = {
  args: { ...baseArgs, isClosed: true },
};

export const Loading: Story = {
  args: { ...baseArgs, isLoading: true },
};
