import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  title: 'AI Generated/Medium/Button',
  component: Button,
  args: {
    children: 'Checkout',
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const ClearWithIcon: Story = {
  args: {
    children: 'Back',
    clear: true,
    icon: 'arrow-left',
  },
}
