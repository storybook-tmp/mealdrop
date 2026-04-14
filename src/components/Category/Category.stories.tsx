import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';

import { categories } from '../../stub/categories';

import { Category } from './Category';

const [pizzaCategory, burgersCategory, dessertsCategory] = categories;

const meta = {
  component: Category,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Category>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Square: Story = {
  args: pizzaCategory,
  render: (args) => (
    <div style={{ maxWidth: '320px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(/pizza/i)).toBeVisible();
    await expect(canvas.getByText(/pizza/i)).toBeVisible();
    await expect(canvas.getByAltText(/restaurant category/i)).toBeVisible();
  },
};

export const Rounded: Story = {
  args: {
    ...burgersCategory,
    round: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '200px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(/burgers/i)).toBeVisible();
    await expect(canvas.getByText(/burgers/i)).toBeVisible();
  },
};

export const AnotherCategory: Story = {
  args: {
    ...dessertsCategory,
    round: true,
  },
  render: (args) => (
    <div style={{ maxWidth: '200px' }}>
      <Category {...args} />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(/desserts/i)).toBeVisible();
    await expect(canvas.getByText(/desserts/i)).toBeVisible();
  },
};
