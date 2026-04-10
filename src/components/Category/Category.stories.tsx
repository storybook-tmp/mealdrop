import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from 'react-router-dom';
import { expect } from 'storybook/test';

import { categories } from '../../stub/categories';

import { Category } from './Category';

const meta = {
  args: {
    ...categories[0],
  },
  component: Category,
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridCard: Story = {
  render: () => (
    <div className="container" style={{ maxWidth: 420, paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Link to={`/categories/${categories[0].id}`}>
        <Category {...categories[0]} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible();
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible();
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/categories/pizza');
  },
};

export const RoundCard: Story = {
  render: () => (
    <div className="container" style={{ maxWidth: 220, paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Link to={`/categories/${categories[1].id}`}>
        <Category round {...categories[1]} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Burgers')).toBeVisible();
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible();
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/categories/burgers');
  },
};

export const CategoryGrid: Story = {
  render: () => (
    <div
      className="container"
      style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      {categories.slice(0, 3).map((category) => (
        <Link key={category.id} to={`/categories/${category.id}`}>
          <Category {...category} />
        </Link>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Pizza')).toBeVisible();
    await expect(canvas.getByText('Burgers')).toBeVisible();
    await expect(canvas.getByText('Desserts')).toBeVisible();
    await expect(canvas.getAllByRole('img', { name: /restaurant category/i })).toHaveLength(3);
  },
};
