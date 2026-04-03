import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryListPage } from './CategoryListPage';

const meta = {
  component: CategoryListPage,
} satisfies Meta<typeof CategoryListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CategoryListPage />,
};
