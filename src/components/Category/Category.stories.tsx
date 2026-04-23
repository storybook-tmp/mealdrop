import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const meta = {
  component: Category,
  args: categories[0],
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const SquareCard: Story = {
  render: () => (
    <Link to={`/categories/${categories[0].id}`}>
      <Category {...categories[0]} />
    </Link>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', `/categories/${categories[0].id}`)
    await expect(canvas.getByText(categories[0].title)).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
}

export const RoundedCard: Story = {
  render: () => (
    <Link to={`/categories/${categories[1].id}`}>
      <Category round {...categories[1]} />
    </Link>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', `/categories/${categories[1].id}`)
    await expect(canvas.getByText(categories[1].title)).toBeVisible()
    await expect(canvas.getByAltText('restaurant category')).toBeVisible()
  },
}

export const CategoryGrid: Story = {
  render: () => (
    <Grid>
      {categories.slice(0, 4).map((category) => (
        <Link key={category.id} to={`/categories/${category.id}`}>
          <Category {...category} />
        </Link>
      ))}
    </Grid>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('link')).toHaveLength(4)
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByText('Comfort food')).toBeVisible()
  },
}
