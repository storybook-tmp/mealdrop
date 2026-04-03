import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryDetailPage } from './CategoryDetailPage';

const meta = {
  component: CategoryDetailPage,
  parameters: {
    routePath: '/categories/:id',
    routeEntry: '/categories/burgers',
  },
} satisfies Meta<typeof CategoryDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CategoryDetailPage />,
};
