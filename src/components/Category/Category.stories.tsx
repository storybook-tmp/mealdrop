import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from 'react-router-dom';
import { expect } from 'storybook/test';

import { categories } from '../../stub/categories';

import { Category } from './Category';

const [pizzaCategory, burgersCategory] = categories;

const meta = {
  component: Category,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Category>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SquareCard: Story = {
  args: {
    ...pizzaCategory,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <Link to={`/categories/${pizzaCategory.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible();
    await expect(canvas.getByRole('link', { name: /pizza/i })).toHaveAttribute(
      'href',
      `/categories/${pizzaCategory.id}`
    );
  },
};

export const RoundedCarouselCard: Story = {
  args: {
    ...burgersCategory,
    round: true,
  },
  render: (args) => (
    <div style={{ width: '180px' }}>
      <Link to={`/categories/${burgersCategory.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/burgers/i)).toBeVisible();
    await expect(canvas.getByRole('link', { name: /burgers/i })).toHaveAttribute(
      'href',
      `/categories/${burgersCategory.id}`
    );
  },
};

export const DarkModeRoundedCard: Story = {
  args: {
    ...pizzaCategory,
    round: true,
  },
  parameters: {
    darkMode: true,
  },
  render: (args) => (
    <div style={{ width: '180px' }}>
      <Link to={`/categories/${pizzaCategory.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText(/pizza/i)).toBeVisible();
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode');
  },
};
