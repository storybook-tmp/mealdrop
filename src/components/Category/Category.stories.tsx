import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import styled from 'styled-components'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const Grid = styled.div`
  max-width: 420px;
  padding: 1.5rem;
`

const meta = {
  component: Category,
  render: (args) => (
    <Grid>
      <Category {...args} />
    </Grid>
  ),
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const Square: Story = {
  args: {
    ...categories[0],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(categories[0].title)).toBeVisible()
    await expect(canvas.getByText(categories[0].title)).toBeVisible()
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible()
  },
}

export const Round: Story = {
  args: {
    ...categories[1],
    round: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(categories[1].title)).toBeVisible()
    await expect(canvas.getByText(categories[1].title)).toBeVisible()
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible()
  },
}

export const ComfortFood: Story = {
  args: {
    ...categories[3],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId(categories[3].title)).toBeVisible()
    await expect(canvas.getByText(categories[3].title)).toBeVisible()
    await expect(canvas.getByRole('img', { name: /restaurant category/i })).toBeVisible()
  },
}
