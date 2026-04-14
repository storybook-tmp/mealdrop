import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { categories } from '../../stub/categories'

import { Category } from './Category'

const meta = {
  component: Category,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Category>

export default meta

type Story = StoryObj<typeof meta>

export const SquareCard: Story = {
  args: categories[0],
  render: (args) => <Category {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Pizza')).toBeVisible()
    await expect(canvas.getByText('Pizza')).toBeVisible()
    await expect(canvas.getByAltText(/restaurant category/i)).toBeVisible()
  },
}

export const RoundCard: Story = {
  args: {
    ...categories[1],
    round: true,
  },
  render: (args) => <Category {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('Burgers')).toBeVisible()
    await expect(canvas.getByText('Burgers')).toBeVisible()
    await expect(canvas.getByAltText(/restaurant category/i)).toBeVisible()
  },
}

export const RoundCardDarkMode: Story = {
  parameters: {
    app: {
      darkMode: true,
    },
  },
  args: {
    ...categories[4],
    round: true,
  },
  render: (args) => <Category {...args} />,
  play: async ({ canvasElement, canvas }) => {
    await expect(canvas.getByTestId('Sushi')).toBeVisible()
    await expect(canvas.getByText('Sushi')).toBeVisible()
    await expect(canvasElement.ownerDocument.body).toHaveClass('dark-mode')
  },
}
