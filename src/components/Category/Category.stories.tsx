import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from 'react-router-dom'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const meta = {
  component: Category,
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const GridCard: Story = {
  args: {
    ...categories[0],
  },
  render: (args) => (
    <div style={{ margin: '3rem auto', maxWidth: '320px' }}>
      <Link to={`/categories/${args.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/categories/pizza')
    await expect(canvas.getByText(/pizza/i)).toBeVisible()
    await expect(canvas.getByAltText(/restaurant category/i)).toBeVisible()
  },
}

export const RoundCard: Story = {
  args: {
    ...categories[4],
    round: true,
  },
  render: (args) => (
    <div style={{ margin: '3rem auto', maxWidth: '180px' }}>
      <Link to={`/categories/${args.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/categories/sushi')
    await expect(canvas.getByText(/sushi/i)).toBeVisible()
    await expect(canvas.getByTestId('Sushi')).toBeVisible()
  },
}

export const DarkModeRoundCard: Story = {
  args: {
    ...categories[5],
    round: true,
  },
  parameters: {
    mealdrop: {
      darkMode: true,
    },
  },
  render: (args) => (
    <div style={{ margin: '3rem auto', maxWidth: '180px' }}>
      <Link to={`/categories/${args.id}`}>
        <Category {...args} />
      </Link>
    </div>
  ),
  play: async ({ canvas }) => {
    const categoryCard = canvas.getByTestId('Asian')

    await expect(categoryCard).toBeVisible()
    await expect(window.getComputedStyle(categoryCard).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
  },
}
