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
  name: 'Burger Kingdom',
  specialty: 'Nicest place for burgers',
  photoUrl:
    'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
  rating: 4.2,
  categories: ['burgers', 'comfort food'],
};

export const Default: Story = {
  args: baseArgs,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
  },
};

export const New: Story = { args: { ...baseArgs, isNew: true } };
export const Closed: Story = { args: { ...baseArgs, isClosed: true } };
export const Loading: Story = { args: { ...baseArgs, isLoading: true } };
