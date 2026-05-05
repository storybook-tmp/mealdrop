import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { StepIndicator } from './StepIndicator'

const meta = {
  component: StepIndicator,
  tags: ['ai-generated'],
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {
  args: {
    title: 'Contact details',
    currentStep: 1,
    amountOfSteps: 2,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Step 1 of 2')).toBeVisible()
  },
}

export const SecondStep: Story = {
  args: {
    title: 'Delivery details',
    currentStep: 2,
    amountOfSteps: 2,
  },
}
