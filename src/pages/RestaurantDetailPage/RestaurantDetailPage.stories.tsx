import type { Meta, StoryObj } from '@storybook/react-vite';
import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/1'],
      routePath: '/restaurants/:id',
    },
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DifferentRestaurant: Story = {
  parameters: {
    reactRouter: {
      initialEntries: ['/restaurants/5'],
      routePath: '/restaurants/:id',
    },
  },
};
