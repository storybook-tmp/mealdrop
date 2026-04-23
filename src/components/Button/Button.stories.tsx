import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import styled from 'styled-components'

import { toCurrency } from '../../helpers'

import { Button } from './Button'

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
`

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const CheckoutPrimary: Story = {
  render: () => (
    <Row>
      <Button>Next</Button>
    </Row>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Next' })

    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(button).toBeEnabled()
  },
}

export const HeaderNavigation: Story = {
  render: () => (
    <Row>
      <Button clear>Home</Button>
      <Button clear>All restaurants</Button>
    </Row>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const homeButton = canvas.getByRole('button', { name: 'Home' })
    const restaurantsButton = canvas.getByRole('button', { name: 'All restaurants' })

    await expect(homeButton).toBeVisible()
    await expect(restaurantsButton).toBeVisible()
    await userEvent.click(restaurantsButton)
    await expect(restaurantsButton).toBeEnabled()
  },
}

export const CartSummary: Story = {
  render: () => (
    <Row>
      <Button aria-label="food cart" icon="cart">
        <span>Order</span>
        <span>{toCurrency(12.5)}</span>
      </Button>
    </Row>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'food cart' })

    await expect(button).toBeVisible()
    await expect(canvas.getByText('Order')).toBeVisible()
    await expect(canvas.getByText(toCurrency(12.5))).toBeVisible()
  },
}
