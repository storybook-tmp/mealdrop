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
    await expect(canvas.getByRole('heading', { name: /categories/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /what’s on the menu\?/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /pizza/i })).toHaveAttribute(
      'href',
      '/categories/pizza'
    );
    await expect(canvas.getByRole('link', { name: /asian/i })).toHaveAttribute(
      'href',
      '/categories/asian'
    );
  },
};
