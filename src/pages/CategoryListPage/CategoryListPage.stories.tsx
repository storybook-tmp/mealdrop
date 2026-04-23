import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { CategoryListPage } from './CategoryListPage';

const meta = {
  component: CategoryListPage,
} satisfies Meta<typeof CategoryListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    const description = canvas.getByText(/feeling like having pizza/i);
    await expect(description).toBeVisible();
  },
};
