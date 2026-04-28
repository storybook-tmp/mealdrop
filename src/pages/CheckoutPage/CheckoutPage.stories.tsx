import preview from '#.storybook/preview'
import { expect } from 'storybook/test'

import { CheckoutPage } from './CheckoutPage'

const meta = preview.meta({
  component: CheckoutPage,
  tags: ['ai-generated'],
})

export const Default = meta.story({
  render: () => <CheckoutPage />,
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Checkout')).toBeVisible()
  },
})
