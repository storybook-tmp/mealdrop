import styled from 'styled-components'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from 'react-router-dom'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'
import { Category } from './Category'

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
`

const meta = {
  component: Category,
  args: categories[0],
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const RoundedCategory: Story = {
  render: () => (
    <Link to={`/categories/${categories[0].id}`}>
      <Category round {...categories[0]} />
    </Link>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /pizza/i })).toHaveAttribute(
      'href',
      '/categories/pizza'
    )
    await expect(canvas.getByAltText(/restaurant category/i)).toBeVisible()
  },
}

export const SquareCategory: Story = {
  render: () => (
    <Link to={`/categories/${categories[1].id}`}>
      <Category {...categories[1]} />
    </Link>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /burgers/i })).toHaveAttribute(
      'href',
      '/categories/burgers'
    )
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
  },
}

export const CategoryGroup: Story = {
  render: () => (
    <Grid>
      {categories.slice(0, 2).map((category) => (
        <Link key={category.id} to={`/categories/${category.id}`}>
          <Category {...category} />
        </Link>
      ))}
    </Grid>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /pizza/i })).toBeVisible()
    await expect(canvas.getByRole('link', { name: /burgers/i })).toBeVisible()
  },
}
