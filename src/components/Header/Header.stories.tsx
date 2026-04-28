import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { HeaderComponent } from './Header'

const meta = {
  component: HeaderComponent,
  tags: ['ai-generated'],
} satisfies Meta<typeof HeaderComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('header')).toBeVisible()
    await expect(canvas.getByRole('button', { name: /food cart/i })).toBeVisible()
  },
}

export const LogoOnly: Story = {
  args: { logoOnly: true },
}

export const WithCartTotal: Story = {
  args: { totalPrice: 12.5 },
}
