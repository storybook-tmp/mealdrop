import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { RestaurantCard } from './RestaurantCard';

const meta = {
  component: RestaurantCard,
  args: {
    name: 'Burger Kingdom',
    specialty: 'Nicest place for burgers',
    photoUrl:
      'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
  },
} satisfies Meta<typeof RestaurantCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRestaurant = {
  name: 'Burger Kingdom',
  specialty: 'Nicest place for burgers',
  photoUrl:
    'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=20',
  rating: 4.2,
  categories: ['burgers', 'comfort food'],
};

export const Default: Story = {
  render: () => <RestaurantCard {...mockRestaurant} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText(/nicest place for burgers/i)).toBeVisible();
    await expect(canvas.getByText(/very good/i)).toBeVisible();
    await expect(canvas.getAllByText(/burgers/i).length).toBeGreaterThan(0);
  },
};

export const Closed: Story = {
  render: () => <RestaurantCard {...mockRestaurant} isClosed />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText(/this restaurant is closed/i)).toBeVisible();
  },
};

export const IsNew: Story = {
  render: () => <RestaurantCard {...mockRestaurant} isNew />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burger Kingdom')).toBeVisible();
    await expect(canvas.getByText('new')).toBeVisible();
  },
};

export const Loading: Story = {
  render: () => <RestaurantCard {...mockRestaurant} isLoading />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('loading')).toBeInTheDocument();
  },
};
