import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { SuccessPage } from './SuccessPage'

const meta = {
  component: SuccessPage,
  tags: ['ai-generated'],
} satisfies Meta<typeof SuccessPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Order confirmed!')).toBeVisible()
    await expect(canvas.getByText('13:23 today')).toBeVisible()
  },
}
