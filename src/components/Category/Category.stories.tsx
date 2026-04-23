import { Link } from 'react-router-dom'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'
import { Category } from './Category'

const meta = {
  component: Category,
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

const [pizzaCategory, burgersCategory, dessertsCategory] = categories

export const Default: Story = {
  args: pizzaCategory,
  render: () => (
    <div style={{ maxWidth: '420px' }}>
      <Link to={`/categories/${pizzaCategory.id}`}>
        <Category {...pizzaCategory} />
      </Link>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await userEvent.click(canvas.getByRole('link'))
    await expect(window.location.pathname).toBe(`/categories/${pizzaCategory.id}`)
  },
}

export const Rounded: Story = {
  args: {
    ...burgersCategory,
    round: true,
  },
  render: () => (
    <div style={{ maxWidth: '200px' }}>
      <Link to={`/categories/${burgersCategory.id}`}>
        <Category round {...burgersCategory} />
      </Link>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Burgers')).toBeVisible()
    await expect(canvas.getByRole('img', { name: 'restaurant category' })).toBeVisible()
    await userEvent.click(canvas.getByRole('link'))
    await expect(window.location.pathname).toBe(`/categories/${burgersCategory.id}`)
  },
}

export const GridPreview: Story = {
  args: pizzaCategory,
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {[pizzaCategory, burgersCategory, dessertsCategory].map((category) => (
        <Link key={category.id} to={`/categories/${category.id}`}>
          <Category {...category} />
        </Link>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
    await expect(canvas.getByTestId('Desserts')).toBeVisible()
  },
}
