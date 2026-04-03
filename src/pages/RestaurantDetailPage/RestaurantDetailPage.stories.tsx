import type { Meta, StoryObj } from '@storybook/react-vite';
import { RestaurantDetailPage } from './RestaurantDetailPage';

const meta = {
  component: RestaurantDetailPage,
  parameters: {
    routePath: '/restaurants/:id',
    routeEntry: '/restaurants/1',
  },
} satisfies Meta<typeof RestaurantDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <RestaurantDetailPage />,
};
