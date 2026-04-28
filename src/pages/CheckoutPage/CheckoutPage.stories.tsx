import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { CheckoutPage } from './CheckoutPage'

const meta = preview.meta({
  component: CheckoutPage,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
  },
})

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible()
    await expect(canvas.getByText('Your cart is empty.')).toBeVisible()
  },
})

export const FilledForm = meta.story({
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible()

    const emailInput = canvas.getByLabelText('Email')
    await userEvent.type(emailInput, 'test@example.com')
    await expect(emailInput).toHaveValue('test@example.com')
  },
})
