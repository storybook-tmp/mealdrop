import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { CategoryListPage } from './CategoryListPage';

const meta = {
  component: CategoryListPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CategoryListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/on the menu/i)).toBeVisible();
    await expect(canvas.getByText('Pizza')).toBeVisible();
    await expect(canvas.getByText('Sushi')).toBeVisible();
  },
};

export const WithBanner: Story = {
  render: () => <CategoryListPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'Categories' })).toBeVisible();
    await expect(canvas.getByText(/satisfy your cravings/i)).toBeVisible();
  },
};
